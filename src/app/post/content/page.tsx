import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAccessTokenStore } from '../../../features/auth/_stores/accessToken.store';

function PostContentPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<{ title: string }>();

  const { accessToken } = useAccessTokenStore();

  const getPosts = async () => {
    const res = await axios.get(`http://localhost:4000/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res.data);

    if (res.status === 200) {
      setData(res.data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      게시글 조회: {id}, {data?.title ?? ''}
    </div>
  );
}

export default PostContentPage;
