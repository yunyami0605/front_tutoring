import React, { type SetStateAction } from 'react';
import LabeledInput from '../../../shared/components/input/LabeledInput';
import ActiveButton from '../../../shared/components/button/ActiveButton';
import type { CreatePostForm } from '../_types/body';
import type { CreatePostValidError } from '../_types/data';

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  form: CreatePostForm;
  error: CreatePostValidError;
  setForm: React.Dispatch<SetStateAction<CreatePostForm>>;
  isModify?: boolean;
};
function PostForm({ onSubmit, form, error, setForm, isModify }: Props) {
  return (
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

      <ActiveButton type="submit">{isModify ? '수정' : '등록'}</ActiveButton>
    </form>
  );
}

export default PostForm;
