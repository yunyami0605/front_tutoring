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
import { useAccessTokenStore } from '../../features/auth/_stores/accessToken.store';
import type { PostLoginResponse } from '../../features/auth/_types/response';

function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const initError = {
    email: '',
    password: '',
    common: '', // 공통, 서버 에러
  };

  const [error, setError] = useState(initError);
  const naviagate = useNavigate();
  const { setToken } = useAccessTokenStore();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = form;

    // react-hook-form @hookform/resolvers 로 대체해도 됨
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const _error = result.error.issues;

      if (_error.length !== 0) {
        const { message, path } = _error[0];
        setError((prev) => ({ ...prev, [path[0]]: message }));
      } else {
        setError((prev) => ({ ...prev, common: '잘못된 접근입니다.' }));
      }

      return;
    }

    try {
      // api
      const res = await axios.post<PostLoginResponse>(
        'http://localhost:4000/auth/login',
        {
          email,
          password,
        }
      );

      // 1. at 토큰 저장

      // 2. 메인 페이지 이동
      if (res.status === 200) {
        setToken(res.data.access);
        naviagate('/home');
      }
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        setError(() => ({
          ...initError,
          common: error.response?.data.message ?? '',
        }));
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
            value={form.email}
            error={error.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="example@naver.com"
          />

          <LabeledInput
            label="비밀번호"
            name="password"
            type="password"
            value={form.password}
            error={error.common.length !== 0 ? error.common : error.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
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
