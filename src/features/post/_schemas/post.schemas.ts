import z from 'zod';
import { postConstant } from '../_constants/post.constant';

const _baseSchema = z.object({
  title: z
    .string()
    .min(2, postConstant.error.validation.wrongTitle)
    .max(80, postConstant.error.validation.wrongTitle),
  content: z
    .string()
    .min(2, postConstant.error.validation.wrongContent)
    .max(200, postConstant.error.validation.wrongContent),
});

// 게시글 스키마
export const postSchema = _baseSchema.pick({ title: true, content: true });

export type PostFormSchema = z.infer<typeof postSchema>;
