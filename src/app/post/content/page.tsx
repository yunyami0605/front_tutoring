import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { PostItem } from '../../../features/post/_types/data';
import axios, { AxiosError } from 'axios';
import { useAccessTokenStore } from '../../../features/auth/_stores/accessToken.store';
import { FaRegHeart, FaRegComment, FaRegBookmark } from 'react-icons/fa';
import styles from './PostContentPage.module.css';
import { IoMdMore } from 'react-icons/io';
import Modal from '../../../shared/components/modal/Modal';

function PostContentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<PostItem>();
  const { accessToken } = useAccessTokenStore();
  const [isOpen, setIsOpen] = useState(false);

  const isAuthor = true;

  const onUpdateContent = () => {
    if (!id) {
      navigate(-1);
      return window.alert('잘못된 접근입니다.');
    }

    navigate(`/post/update/${id}`);
  };

  const onDeleteContent = () => {
    if (!id) {
      navigate(-1);
      return window.alert('잘못된 접근입니다.');
    }

    axios
      .delete(`http://localhost:4000/post/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          window.alert('삭제되었습니다.');
          navigate(-1);
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          const data = error.response?.data;
          window.alert(data.message);
        } else {
          window.alert('잘못된 접근입니다.');
        }
      });
  };

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
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        firstButtonText={isAuthor ? '수정' : '신고'}
        firstButtonClick={onUpdateContent}
        secondButtonText={isAuthor ? '삭제' : '차단'}
        secondButtonClick={onDeleteContent}
      />

      {/* 상단 프로필 영역 */}
      <section className={styles.top_helper_section}>
        <div className={styles.profile}>
          <img
            src="/images/image_tmp.jpg"
            alt="profile"
            className={styles.profileImage}
          />
          <strong>ldh_sky</strong>
        </div>

        <IoMdMore
          onClick={() => setIsOpen(true)}
          size={34}
          className={styles.more_button}
        />
      </section>

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
