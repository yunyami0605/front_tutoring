import { useState } from 'react';
import LabeledInput from '../../../shared/components/LabeledInput';
import styles from './PostRegisterPage.module.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { apiCall } from '../../../libs/api';
import { useNavigate } from 'react-router-dom';

// 게시글 등록 페이지
function PostRegisterPage() {
  const navigate = useNavigate();

  const initState = {
    title: '',
    content: '',
    image: null as File | null,
  };

  const [form, setForm] = useState(initState);

  const onUpload = (file: FileList | null) => {
    if (!file) return;

    setForm((prev) => ({ ...prev, image: file[0] }));
  };

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    /*
     * method: POST
     * url : /images
     * body: file
     */
    console.log(e.target.files);

    /**
     * s3 ->
     */

    /**
     * 유저 이미지 업로드
     * 클라 -> 서버 presigned URL 요청
     * 서버 -> S3 presigned URL(PUT) 요청 / 응답
     * 서버 -> 클라 pre url 응답 + s3 key uuid
     * 클라 -> s3 pre url + PUT + file
     * s3 파일 저장
     * 클라 -> 서버 s3 key -> db
     *
     * 이미지나 포스트에 들어가는 이미지 조회
     * object key -> s3 요청 -> presigned URL (GET)
     * 서버 -> 클라
     *
     */
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.name }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await apiCall({
        method: 'POST',
        data: form,
        url: '/posts',
      });

      if (res.status === 200) {
        navigate(-1);
      }
    } catch (error) {
      // form 형식
    }

    // 게시글 등록 요청
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <LabeledInput
        id="title"
        name="title"
        placeholder="제목을 입력해주세요."
        value={form['title']}
        onChange={onChangeForm}
      />

      <LabeledInput
        id="content"
        name="content"
        placeholder="내용을 입력해주세요."
        value={form['content']}
        onChange={onChangeForm}
      />

      <div className={styles.image_field}>
        <p>이미지</p>

        <label htmlFor="images">
          <AiOutlinePlus size={22} color={'#5D7AFF'} />
        </label>
        <input
          type="file"
          accept="image/*"
          id="images"
          name="images"
          onChange={(e) => onUpload(e.target.files)}
        />
      </div>

      <button type="submit">등록</button>
    </form>
  );
}

export default PostRegisterPage;
