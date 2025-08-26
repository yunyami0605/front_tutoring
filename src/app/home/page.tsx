import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  /***
   * 뭔가 리다이랙트만 하고 따로 뭐 간단한 검사 로직만 넣을경우
   *
   */

  useEffect(() => {
    navigate('/post', { replace: true });
  }, [navigate]);

  return null;
}

export default HomePage;
