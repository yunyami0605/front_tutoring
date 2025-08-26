/**
 *@description auth constant
 */
export const postConstant = {
  error: {
    validation: {
      // schema 검증 에러
      wrongContent: '내용은 2글자 이상, 200글자 이하여야합니다.',
      wrongTitle: '제목은 2글자 이상, 80글자 이하여야합니다.',
    },
  },
} as const;
