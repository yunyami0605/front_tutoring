import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import PageLayout from '../../../shared/components/layout/PageLayout';
import { useAccessTokenStore } from '../../../features/auth/_stores/accessToken.store';
import { postSchema } from '../../../features/post/_schemas/post.schemas';
import { useNavigate, useParams } from 'react-router-dom';
import type { CreatePostForm } from '../../../features/post/_types/body';
import type {
  CreatePostValidError,
  PostItem,
} from '../../../features/post/_types/data';
import PostForm from '../../../features/post/_components/PostForm';

function PostUpdatePage() {
  const { accessToken } = useAccessTokenStore();
  const navigate = useNavigate();
  const params = useParams();

  const id = params.id;

  const initFormState = {
    title: '',
    content: '',
  };

  const initErrorState = {
    title: '',
    content: '',
    common: '',
  };

  const [form, setForm] = useState<CreatePostForm>(initFormState);
  const [error, setError] = useState<CreatePostValidError>(initErrorState);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 수정 스키마로 변경
    const valid = postSchema.partial().safeParse(form);

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
      const res = await axios.patch(`http://localhost:4000/post/${id}`, form, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status === 200) {
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
      }
    }
  };

  useEffect(() => {
    if (params.id) {
      axios
        .get<PostItem>(`http://localhost:4000/post/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          //
          if (response.status === 200) {
            setForm(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  console.log(form);

  return (
    <PageLayout showHeader showBack>
      <PostForm
        isModify={!!id}
        onSubmit={onSubmit}
        form={form}
        error={error}
        setForm={setForm}
      />
    </PageLayout>
  );
}

export default PostUpdatePage;
