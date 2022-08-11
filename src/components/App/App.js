import 'antd/dist/antd.css';

import { Routes, Route } from 'react-router-dom';

import { ArticleList } from '../pages/Article-list/ArticleList';
import { Header } from '../Header/Header';
import { OneArticle } from '../One-article/OneArticle';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';
import { EditProfile } from '../pages/EditProfile/EditProfile';
import { NewArticle } from '../pages/NewArticle/NewArticle';

import styles from './App.module.scss';

function App() {
  return (
    <>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<ArticleList />} />
            <Route path="/:title" element={<OneArticle />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="profile" element={<EditProfile />} />
            <Route path="new-article" element={<NewArticle />} />
            <Route path="articles/:slug/edit" element={<NewArticle />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
