import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { PostItem } from '../../../features/post/_types/data';
import axios from 'axios';
import { useAccessTokenStore } from '../../../features/auth/_stores/accessToken.store';
import { FaRegHeart, FaRegComment, FaRegBookmark } from 'react-icons/fa';
import styles from './PostContentPage.module.css';

function PostContentPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PostItem>();
  const { accessToken } = useAccessTokenStore();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/post/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken} `,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      });
  }, []);

  return (
    <div className={styles.container}>
      {/* 상단 프로필 영역 */}
      <div className={styles.profile}>
        <img
          src="/images/image_tmp.jpg"
          alt="profile"
          className={styles.profileImage}
        />
        <strong>ldh_sky</strong>
      </div>

      {/* 게시글 이미지 */}
      <div>
        <img
          src="/images/image_tmp.jpg"
          alt="post"
          className={styles.postImage}
        />
      </div>

      {/* 버튼 영역 */}
      <div className={styles.actions}>
        <div className={styles.actionsLeft}>
          <FaRegHeart />
          <FaRegComment />
        </div>
        <div className={styles.actionsRight}>
          <FaRegBookmark />
        </div>
      </div>

      {/* 본문 영역 */}
      <div className={styles.content_wrapper}>
        <p className={styles.title}>{data?.title ?? ''}</p>

        <p className={styles.content}>{data?.content ?? ''}</p>
      </div>
    </div>
  );
}

export default PostContentPage;
