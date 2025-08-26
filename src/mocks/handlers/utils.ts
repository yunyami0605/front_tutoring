import { HttpResponse } from 'msw';

// 검증 로직
export function checkAuth(request: Request) {
  const authHeader = request.headers.get('Authorization');
  console.log('22');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      ok: false,
      error: HttpResponse.json({ code: 'UNAUTHORIZED' }, { status: 401 }),
    };
  }

  const token = authHeader.replace('Bearer ', '');

  if (token !== 'att') {
    return {
      ok: false,
      error: HttpResponse.json({ code: 'FORBIDDEN' }, { status: 403 }),
    };
  }
  return { ok: true };
}
