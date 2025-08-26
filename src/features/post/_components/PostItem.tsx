import styles from './PostItem.module.css';
import { FaRegHeart } from 'react-icons/fa';
import { IoChatbubbleOutline, IoBookOutline } from 'react-icons/io5';
import type { PostItem as PostItemType } from '../_types/data';

type Props = PostItemType & {
  onClick: (id: string) => void;
};

/**
 *@description 게시글
 */
function PostItem(props: Props) {
  return (
    <button
      className={styles.post_container_button}
      onClick={() => props.onClick(props.id)}
    >
      <section className={styles.post_wrapper}>
        <div className={styles.post_inner_wrapper}>
          <div className={styles.post_author_info_wrapper}>
            <div className={styles.post_author_info}>
              <div className={styles.dummy_profile_image}></div>
              <p className={styles.author_name_txt}>hit_tester</p>
            </div>

            <p className={styles.post_title}>{props.title}</p>
          </div>

          <div className={styles.subinfo_wrapper}>
            <div className={styles.count_wrapper}>
              <FaRegHeart size={10} />

              <p>120</p>
            </div>

            <div className={styles.count_wrapper}>
              <IoChatbubbleOutline size={10} />

              <p>120</p>
            </div>

            <div className={styles.count_wrapper}>
              <IoBookOutline size={10} />

              <p>120</p>
            </div>

            <div className={styles.count_wrapper}>
              <p>2시간 전</p>
            </div>
          </div>
        </div>

        <div className={styles.dummy_post_image}></div>
      </section>
    </button>
  );
}

export default PostItem;
