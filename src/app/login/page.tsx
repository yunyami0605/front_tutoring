import { useState } from 'react';
import LabeledInput from '../../shared/components/input/LabeledInput';
import PageLayout from '../../shared/components/layout/PageLayout';
import ActiveButton from '../../shared/components/button/ActiveButton';
import styles from './LoginPage.module.css';
import clsx from 'clsx';
import TextButton from '../../shared/components/button/TextButton';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <PageLayout showHeader title="로그인 페이지">
      <form className={clsx(styles.login_form)}>
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
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
        </section>

        <ActiveButton>로그인</ActiveButton>
      </form>

      <section className={styles.helper_buttons}>
        <TextButton>회원가입하기</TextButton>
      </section>
    </PageLayout>
  );
}

export default LoginPage;
