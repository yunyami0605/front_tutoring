import { http, HttpResponse } from 'msw';

const userDb = [
  {
    email: 'test1@test.com',
    password: 'test1234',
  },
];

export const authHandler = [
  http.post('http://localhost:4000', async ({ request }) => {
    const response = (await request.json()) as {
      email: string;
      password: string;
    };

    const user = userDb.find(
      (item) =>
        item.email === response.email && item.password === response.password
    );

    if (!user) return HttpResponse.json({ message: '없어!' }, { status: 401 });

    // const body = await request.json();
    return HttpResponse.json({ access: 'mock' }, { status: 200 });
  }),

  http.get('/user', () => {
    return HttpResponse.json({ name: '지은' }, { status: 200 });
  }),
];
