import { useNavigate } from 'react-router-dom';
import styles from './PostItem.module.css';

type Props = {
  title: string;
  date: string;
  id: number;
};

/**
 *@description 게시글 항목
 */
function PostItem({ title, date, id }: Props) {
  const navigate = useNavigate();

  return (
    <button
      className={styles.post_item_wrapper}
      onClick={() => navigate(`/post/${id}`)}
    >
      {/* 제목 */}
      <p>{title}</p>

      {/* 날짜 */}
      <p>{date}</p>
    </button>
  );
}

export default PostItem;
