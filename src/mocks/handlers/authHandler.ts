import { http, HttpResponse } from 'msw';

export const authHandler = [
  http.post('/auth/login', async () => {
    // const body = await request.json();
    return HttpResponse.json({ access: 'mock' }, { status: 200 });
  }),
];
