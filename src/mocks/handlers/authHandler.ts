import { http, HttpResponse } from 'msw';
import z from 'zod';

const loginBodySchema = z.object({
  email: z.email('INVALID FORM'),
  password: z.string().min(4, 'INVALID FORM').max(12, 'INVALID FORM'),
});

const users = [
  {
    email: 'test1@test.com',
    password: 'test1234',
    nickname: 'test1',
  },
];

export const authHandler = [
  http.post('http://localhost:4000/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    const invalidErrorResponse = HttpResponse.json(
      {
        code: 'BAD_REQUEST',
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      },
      { status: 400 }
    );

    const unauthorizedErrorResponse = HttpResponse.json(
      {
        code: 'UNAUTHORIZED',
        message: '일치하는 계정이 없습니다.',
      },
      { status: 401 }
    );

    // 유효성 검증
    const parse = loginBodySchema.safeParse(body);

    if (parse.success) {
      const exsistEmail = users.find((item) => body.email === item.email);
      const matchPassword = users.find(
        (item) => body.password === item.password
      );

      if (!exsistEmail) {
        return unauthorizedErrorResponse;
      }

      if (!matchPassword) {
        return invalidErrorResponse;
      }

      return HttpResponse.json({ access: 'att' }, { status: 200 });
    } else {
      console.log(parse.error.message);
      return invalidErrorResponse;
    }
  }),
];
