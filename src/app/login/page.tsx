import { useState } from 'react';
import LabeledInput from '../../shared/components/input/LabeledInput';
import PageLayout from '../../shared/components/layout/PageLayout';
import ActiveButton from '../../shared/components/button/ActiveButton';
import styles from './LoginPage.module.css';
import clsx from 'clsx';
import TextButton from '../../shared/components/button/TextButton';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../../features/auth/_schemas/auth.schemas';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const naviagate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // react-hook-form @hookform/resolvers 로 대체해도 됨
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const _error = result.error.issues;

      if (_error.length !== 0) {
        setError(_error[0].message);
      } else {
        setError('잘못된 접근입니다.');
      }

      return;
    }

    try {
      // api
      const res = await axios.post('http://localhost:4000/auth/login', {
        email,
        password,
      });

      // 1. at 토큰 저장

      // 2. 메인 페이지 이동
      if (res.status === 200) {
        naviagate('/home');
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message ?? '');
      }
    }
  };

  return (
    <PageLayout showHeader title="로그인 페이지">
      <form className={clsx(styles.login_form)} onSubmit={onSubmit}>
        <section>
          <LabeledInput
            label="이메일"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@naver.com"
          />

          <LabeledInput
            label="비밀번호"
            name="password"
            type="password"
            value={password}
            error={error}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
        </section>

        <ActiveButton type="submit">로그인</ActiveButton>
      </form>

      <section className={styles.helper_buttons}>
        <TextButton>회원가입하기</TextButton>
      </section>
    </PageLayout>
  );
}

export default LoginPage;
