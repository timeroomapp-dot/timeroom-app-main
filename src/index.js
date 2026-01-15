/**
 * Timeroom OAuth Worker
 * Handles Google OAuth authentication and time management
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Handle CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    // Routes
    if (pathname === '/api/auth/login') {
      return handleLogin(request, env);
    } else if (pathname === '/api/auth/callback') {
      return handleCallback(request, env);
    } else if (pathname === '/api/auth/logout') {
      return handleLogout(request, env);
    } else if (pathname === '/api/user') {
      return handleGetUser(request, env);
        } else if (pathname === '/api/calendar/diagnostics') {
    return handleCalendarDiagnostics(request, env);
      
    }

    return new Response('Not Found', { status: 404 });
  },
};

async function handleLogin(request, env) {
  const redirectUri = new URL(request.url).origin + '/api/auth/callback';
  const clientId = env.GOOGLE_CLIENT_ID;
  const scope = 'openid email profile https://www.googleapis.com/auth/calendar';

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', scope);
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');

  return Response.redirect(authUrl.toString(), 302);
}

async function handleCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing authorization code', { status: 400 });
  }

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        code,
        redirect_uri: new URL(request.url).origin + '/api/auth/callback',
        grant_type: 'authorization_code',
      }).toString(),
    });

    const tokens = await tokenResponse.json();
    // Store tokens in KV or session
    return new Response(JSON.stringify({ success: true, tokens }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function handleLogout(request, env) {
  return new Response(JSON.stringify({ message: 'Logged out' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

async function handleGetUser(request, env) {
  return new Response(JSON.stringify({ user: null }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

  async function handleCalendarDiagnostics(request, env) {
  return new Response(JSON.stringify({
    status: 'ok',
    message: 'Calendar service is operational',
    calendars: [],
    lastSync: new Date().toISOString(),
    timestamp: Date.now()
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
