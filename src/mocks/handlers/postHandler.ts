import { http, HttpResponse } from 'msw';
import z from 'zod';
import { checkAuth } from './utils';
import dayjs from 'dayjs';

const posts = Array.from({ length: 4 }, (_, i) => ({
  id: String(i + 1),
  title: `test_title${i + 1}`,
  content: `test_content${i + 1}`,
  createdAt: '2025-08-26',
}));

type PostItem = (typeof posts)[number];

const postBodySchema = z.object({
  title: z
    .string()
    .min(2, '제목은 2글자 이상, 80글자 이하여야합니다.')
    .max(80, '제목은 2글자 이상, 80글자 이하여야합니다.'),
  content: z
    .string()
    .min(2, '내용은 2글자 이상, 200글자 이하여야합니다.')
    .max(200, '내용은 2글자 이상, 200글자 이하여야합니다.'),
});

const notFoundErrorResponse = HttpResponse.json(
  {
    code: 'NOT_FOUND',
    message: '게시글을 찾을 수 없습니다.',
  },
  { status: 404 }
);

const mutationResponseData = {
  success: true,
};

export const postHandler = [
  // 게시글 목록 조회
  http.get('http://localhost:4000/post', async ({ request }) => {
    const res = checkAuth(request);
    if (!res.ok) {
      return res.error;
    }

    return HttpResponse.json(posts, {
      status: 200,
    });
  }),

  // 게시글 조회
  http.get('http://localhost:4000/post/:id', async ({ request, params }) => {
    const res = checkAuth(request);
    if (!res.ok) {
      return res.error;
    }

    const id = params.id;

    const findPost = posts.find((item) => item.id === id);

    if (findPost) {
      return HttpResponse.json(findPost, {
        status: 200,
      });
    } else {
      return notFoundErrorResponse;
    }
  }),

  // 게시글 등록
  http.post('http://localhost:4000/post', async ({ request }) => {
    const res = checkAuth(request);
    if (!res.ok) {
      return res.error;
    }

    const data = (await request.json()) as PostItem;

    const result = postBodySchema.safeParse(data);

    if (!result.success) {
      if (result.error.issues.length !== 0) {
        const { message, path } = result.error.issues[0];

        return HttpResponse.json(
          { code: 'INVALID FORM', message, key: path },
          { status: 400 }
        );
      }
    }

    posts.push({
      ...data,
      id: (posts.length + 1).toString(),
      createdAt: dayjs().format('YYYY-MM-DD'),
    });

    return HttpResponse.json(mutationResponseData, { status: 201 });
  }),

  // 게시글 수정
  http.patch('http://localhost:4000/post/:id', async ({ request, params }) => {
    const id = params.id;
    const data = (await request.json()) as Partial<PostItem>;

    const result = postBodySchema.partial().safeParse(data);

    if (!result.success) {
      if (result.error.issues.length !== 0) {
        const { message, path } = result.error.issues[0];

        return HttpResponse.json(
          { code: 'INVALID FORM', message, key: path },
          { status: 201 }
        );
      }
    }

    const findPostIndex = posts.findIndex((item) => item.id === id);

    if (findPostIndex === -1) {
      return notFoundErrorResponse; // 404
    }

    // 기존 데이터에 새 값 덮어쓰기
    posts[findPostIndex] = {
      ...posts[findPostIndex],
      ...data,
    };

    return HttpResponse.json(mutationResponseData, { status: 200 });
  }),

  // 게시글 삭제
  http.delete('http://localhost:4000/post/:id', async ({ request, params }) => {
    const res = checkAuth(request);
    if (!res.ok) {
      return res.error;
    }

    const id = params.id;

    const findPostIndex = posts.findIndex((item) => item.id === id);

    if (findPostIndex === -1) {
      return notFoundErrorResponse;
    }

    posts.splice(findPostIndex, 1);

    return HttpResponse.json(mutationResponseData, { status: 200 });
  }),
];
