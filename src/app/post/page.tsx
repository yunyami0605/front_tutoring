import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAccessTokenStore } from '../../features/auth/_stores/accessToken.store';
import type { GetPostsResponse } from '../../features/post/_types/response';
import type { PostItem as PostItemType } from '../../features/post/_types/data';
import PostItem from '../../features/post/_components/PostItem';
import { useNavigate } from 'react-router-dom';

function PostsPage() {
  const { accessToken } = useAccessTokenStore();
  const [posts, setPosts] = useState<PostItemType[]>([]);

  const navigate = useNavigate();

  const onNavigate = (id: string) => {
    navigate(`/post/${id}`);
  };

  useEffect(() => {
    axios
      .get<GetPostsResponse>('http://localhost:4000/post', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPosts(response.data);

        return response;
      });
  }, []);

  return (
    <div>
      {posts.map((item) => (
        <React.Fragment key={item.id}>
          <PostItem onClick={() => onNavigate(item.id)} {...item} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default PostsPage;
