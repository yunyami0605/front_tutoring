import dayjs from 'dayjs';
import { http, HttpResponse } from 'msw';

const randomImage = 'https://picsum.photos/200/300';

// db 데이터
const postDb = [
  {
    id: 1,
    title: 'title1',
    content: 'content1',
    date: '2025-09-02',
    image: randomImage,
  },
  {
    id: 2,
    title: 'title2',
    content: 'content2',
    date: '2025-09-02',
    image: randomImage,
  },
  {
    id: 3,
    title: 'title3',
    content: 'content3',
    date: '2025-09-02',
    image: randomImage,
  },
];

const url = 'http://localhost:4000/posts';

type createBody = {
  title: string;
  content: string;
  image: string;
};

export const postHandler = [
  // 게시글 목록 조회
  http.get(`${url}`, async ({ request }) => {
    const auth = request.headers.get('Authorization');

    if (auth) {
      const accessToken = auth?.split('Bearer ') as string[];

      console.log(accessToken);
      console.log(accessToken[1].length);

      if (accessToken[1] !== 'a') {
        // ac token
        return HttpResponse.json(postDb, { status: 200 });
      } else {
        return HttpResponse.json({ message: 'BAD REQUEST' }, { status: 401 });
      }
    } else {
      return HttpResponse.json({ message: '222' }, { status: 401 });
    }
  }),

  // 게시글 컨텐츠 조회
  http.get(`${url}/:id`, async ({ params }) => {
    const id = params.id;

    const _post = postDb.find((item) => item.id === Number(id));

    return HttpResponse.json(_post, { status: 200 });
  }),

  http.post(`${url}`, async ({ request }) => {
    const data = (await request.json()) as createBody;

    postDb.push({
      ...data,
      id: postDb.length + 1,
      date: dayjs().format('YYYY-MM-DD'),
      image: randomImage,
    });

    return HttpResponse.json(data, { status: 200 });
  }),
];
