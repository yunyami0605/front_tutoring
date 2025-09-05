const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

//
dispatch(decrement);

// 액션함수
export const decrement = (diff) => ({
  type: DECREMENT,
  diff: diff,
});

console.log(increment);
console.log(increment2(3));

//값을 증가시키는 액션
const increment = (diff) => ({
  type: INCREMENT,
  diff: diff,
});

//값을 감소시키는 액션
const initialState = { number: 0 };

function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        number: state.number + action.diff,
      };
    case DECREMENT:
      return { number: state.number - action.diff };
    default:
      return state;
  }
}
