import React, { useEffect, useState } from 'react';
import PostItem from '../../features/post/_components/PostItem';
import { apiCall } from '../../libs/api';
import { useNavigate } from 'react-router-dom';

/**
 *@description 게시글 목록 페이지
 */
function PostsPage() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const getPosts = async () => {
    const res = await apiCall({
      url: '/posts',
    });
    // const res = await axios.get('http://localhost:4000/posts', {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
    console.log(res.data);

    if (res.status === 200) {
      setList(res.data);
    }
  };

  const onMoveRegister = () => {
    navigate('/post/register');
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <button onClick={onMoveRegister}>등록</button>

      {list.map(({ title, date, id }) => (
        <React.Fragment key={id}>
          <PostItem title={title} date={date} id={id} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default PostsPage;
