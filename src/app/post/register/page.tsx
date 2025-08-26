import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import PageLayout from '../../../shared/components/layout/PageLayout';
import LabeledInput from '../../../shared/components/input/LabeledInput';
import { useAccessTokenStore } from '../../../features/auth/_stores/accessToken.store';
import ActiveButton from '../../../shared/components/button/ActiveButton';
import { postSchema } from '../../../features/post/_schemas/post.schemas';
import { useNavigate } from 'react-router-dom';

function PostRegisterPage() {
  const { accessToken } = useAccessTokenStore();
  const navigate = useNavigate();

  const initFormState = {
    title: '',
    content: '',
  };

  const initErrorState = {
    title: '',
    content: '',
    common: '',
  };

  const [form, setForm] = useState(initFormState);
  const [error, setError] = useState(initErrorState);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const valid = postSchema.safeParse(form);

    if (!valid.success) {
      // 유효성 체크
      const validationError = valid.error.issues;

      if (validationError.length !== 0) {
        const { message, path } = validationError[0];

        setError({ ...initErrorState, [path[0]]: message });
      } else {
        setError({ ...initErrorState, common: '잘못된 접근입니다.' });
      }

      return;
    }

    try {
      const res = await axios.post('http://localhost:4000/post', form, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status === 201) {
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const data = error?.response?.data.key;

        if (data.length === 0) {
          setError(() => ({
            ...initErrorState,
            common: error.response?.data.message ?? '',
          }));
        } else {
          const _key = data[0];
          setError(() => ({
            ...initErrorState,
            [_key]: error.response?.data.message ?? '',
          }));
        }

        // TODO 부분 에러로 변경
      }
    }
  };

  return (
    <PageLayout showHeader showBack>
      <form onSubmit={onSubmit}>
        <section>
          <LabeledInput
            label={'제목'}
            name={'title'}
            value={form.title}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, title: e.target.value }));
            }}
            error={error.title}
          />

          <LabeledInput
            label={'내용'}
            name={'content'}
            value={form.content}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, content: e.target.value }));
            }}
            error={error.common.length !== 0 ? error.common : error.content}
          />
        </section>

        <ActiveButton type="submit">등록</ActiveButton>
      </form>
    </PageLayout>
  );
}

export default PostRegisterPage;
