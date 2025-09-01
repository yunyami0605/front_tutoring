import { useState } from 'react';
import style from './LoginPage.module.css';
import axios from 'axios';
import LabeledInput from '../../shared/components/LabeledInput';
import Test from './Test';

/**
 *@description 로그인 페이지
 */
function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [show, setShow] = useState(false);

  /**
   *@description 인풋 변화 이벤트
   */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    e.preventDefault();

    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  /**
   *@description 폼 전송 이벤트
   */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://naver.com/auth/login', form);

      if (res.status === 200) {
        console.log('성공');
      }
    } catch (error) {
      //
      console.log('실패');
    } finally {
      console.log('추가');
    }
  };

  // const onSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   axios
  //     .post('/login', form)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         console.log('성공');
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('실패');
  //     });
  // };
  /*
useEffect(callback, array)
*/

  // 생명주기
  // mount !
  // update !
  // unmount !
  // useEffect(() => {
  //   // document.addEventListener('mousedown', () => {
  //   //   console.log('mouse');
  //   // });

  //   console.log('mount');

  //   () => {
  //     console.log('unmount');
  //   };
  // }, []);

  return (
    <div className={style.container}>
      {show && <Test value={form.email} />}

      <button onClick={() => setShow((prev) => !prev)}>
        {show ? 'on' : 'off'}
      </button>

      <form onSubmit={onSubmit} className={style.form}>
        <LabeledInput
          id="email"
          name="email"
          type="email"
          placeholder="email"
          value={form.email}
          onChange={(e) => {
            onChange(e, 'email');
          }}
        />

        <LabeledInput
          id="password"
          name="password"
          type="password"
          placeholder="password"
          value={form.email}
          onChange={(e) => {
            onChange(e, 'password');
          }}
        />

        <button type="submit">전송</button>
      </form>
    </div>
  );
}

export default LoginPage;
