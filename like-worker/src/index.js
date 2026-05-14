const ALLOWED_ORIGINS = new Set([
  "https://eddie0521.github.io",
  "https://Eddie0521.github.io",
  "http://localhost:4321",
  "http://127.0.0.1:4321",
]);

const TARGET_ID_PATTERN = /^[a-z0-9][a-z0-9_-]{0,63}$/;
const VISITOR_ID_PATTERN = /^[A-Za-z0-9_-]{8,128}$/;

function corsHeaders(request) {
  const origin = request.headers.get("Origin") ?? "";
  const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://eddie0521.github.io";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function jsonResponse(request, body, init = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(request),
      ...init.headers,
    },
  });
}

function getTargetId(pathname) {
  const match = pathname.match(/^\/likes\/([^/]+)$/);
  const targetId = match?.[1] ?? "";

  return TARGET_ID_PATTERN.test(targetId) ? targetId : null;
}

function isValidVisitorId(visitorId) {
  return typeof visitorId === "string" && VISITOR_ID_PATTERN.test(visitorId);
}

async function ensureTarget(db, targetId) {
  await db.prepare("INSERT OR IGNORE INTO like_targets (target_id, count) VALUES (?, 0)").bind(targetId).run();
}

async function readLikeState(db, targetId, visitorId = "") {
  const target = await db.prepare("SELECT count FROM like_targets WHERE target_id = ?").bind(targetId).first();
  const count = Math.max(0, Number(target?.count ?? 0));
  let liked = false;

  if (isValidVisitorId(visitorId)) {
    const vote = await db
      .prepare("SELECT 1 AS liked FROM like_votes WHERE target_id = ? AND visitor_id = ?")
      .bind(targetId, visitorId)
      .first();
    liked = Boolean(vote);
  }

  return { targetId, count, liked };
}

async function setLikeState(db, targetId, visitorId, liked) {
  await ensureTarget(db, targetId);

  if (liked) {
    const result = await db
      .prepare("INSERT OR IGNORE INTO like_votes (target_id, visitor_id) VALUES (?, ?)")
      .bind(targetId, visitorId)
      .run();

    if (result.meta?.changes) {
      await db.prepare("UPDATE like_targets SET count = count + 1 WHERE target_id = ?").bind(targetId).run();
    }
  } else {
    const result = await db
      .prepare("DELETE FROM like_votes WHERE target_id = ? AND visitor_id = ?")
      .bind(targetId, visitorId)
      .run();

    if (result.meta?.changes) {
      await db.prepare("UPDATE like_targets SET count = MAX(0, count - 1) WHERE target_id = ?").bind(targetId).run();
    }
  }

  return readLikeState(db, targetId, visitorId);
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    const url = new URL(request.url);
    const targetId = getTargetId(url.pathname);

    if (!targetId) {
      return jsonResponse(request, { error: "Not found" }, { status: 404 });
    }

    if (request.method === "GET") {
      await ensureTarget(env.DB, targetId);
      return jsonResponse(request, await readLikeState(env.DB, targetId, url.searchParams.get("visitorId") ?? ""));
    }

    if (request.method === "POST") {
      const body = await request.json().catch(() => null);
      const visitorId = String(body?.visitorId ?? "").trim();

      if (!isValidVisitorId(visitorId)) {
        return jsonResponse(request, { error: "Invalid visitorId" }, { status: 400 });
      }

      return jsonResponse(request, await setLikeState(env.DB, targetId, visitorId, Boolean(body?.liked)));
    }

    return jsonResponse(request, { error: "Method not allowed" }, { status: 405 });
  },
};
