import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAccessTokenStore } from '../../features/auth/_stores/accessToken.store';
import type { GetPostsResponse } from '../../features/post/_types/response';
import type { PostItem as PostItemType } from '../../features/post/_types/data';
import PostItem from '../../features/post/_components/PostItem';
import { useNavigate } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import PageLayout from '../../shared/components/layout/PageLayout';
import styles from './PostsPage.module.css';
function PostsPage() {
  const { accessToken } = useAccessTokenStore();
  const [posts, setPosts] = useState<PostItemType[]>([]);

  const navigate = useNavigate();

  const onMoveContent = (id: string) => {
    navigate(`/post/${id}`);
  };

  const onMoveRegister = () => {
    navigate('/post/register');
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
    <PageLayout>
      {posts.map((item) => (
        <React.Fragment key={item.id}>
          <PostItem onClick={() => onMoveContent(item.id)} {...item} />
        </React.Fragment>
      ))}

      {/* 글쓰기 버튼 */}
      <button className={styles.writeButton} onClick={onMoveRegister}>
        <FaRegEdit className={styles.icon} />
        글쓰기
      </button>
    </PageLayout>
  );
}

export default PostsPage;
