import axios from 'axios';
import { useEffect } from 'react';

type Props = {
  value: string;
};

function Test({ value }: Props) {
  // 생명주기
  // mount : component
  // update : unmount -> mount
  // unmount !

  useEffect(() => {
    axios.get('/user').then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div id="test" style={{ color: '#fff' }}>
      test
    </div>
  );
}

export default Test;
