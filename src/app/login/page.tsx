import { useState } from 'react';
import style from './LoginPage.module.css';
import LabeledInput from '../../shared/components/LabeledInput';
import { useAccessTokenStore } from '../../features/auth/_stores/accessToken.store';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../../libs/api';

/**
 *@description 로그인 페이지
 */
function LoginPage() {
  const navigate = useNavigate();
  const { setToken } = useAccessTokenStore();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  /**
   *@description 인풋 변화 이벤트
   */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   *@description 폼 전송 이벤트
   */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await apiCall({
        method: 'POST',
        data: form,
      });
      // const res = await axios.post('http://naver.com/auth/login', form);

      if (res.status === 200) {
        setToken(res.data.access);

        navigate('/post');
      }
    } catch (error) {
      //
      console.log('실패');
    } finally {
      console.log('추가');
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={onSubmit} className={style.form}>
        <LabeledInput
          id="email"
          name="email"
          type="email"
          placeholder="email"
          value={form.email}
          onChange={onChange}
        />

        <LabeledInput
          id="password"
          name="password"
          type="password"
          placeholder="password"
          value={form.password}
          onChange={onChange}
        />

        <button type="submit">전송</button>
      </form>
    </div>
  );
}

export default LoginPage;
