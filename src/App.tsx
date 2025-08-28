import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './app/login/page';
import HomePage from './app/home/page';
import PostContentPage from './app/post/content/page';
import PostRegisterPage from './app/post/register/page';
import PostsPage from './app/post/page';
import ParentPage from './ParentPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/post" element={<PostsPage />} />
        <Route path="/post/register" element={<PostRegisterPage />} />
        <Route path="/post/:id" element={<PostContentPage />} />
        <Route path="/parent" element={<ParentPage />} />
      </Routes>
    </div>
  );
}

export default App;
