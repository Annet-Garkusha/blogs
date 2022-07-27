import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ArticleList } from "../pages/Article-list/ArticleList";
import { Header } from "../Header/Header";
import { Spinner } from "../Spinner/Spinner";
import { Error } from "../Error/Error";

import styles from "./App.module.scss";
import { OneArticle } from "../One-article/OneArticle";
import { SignIn } from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp/SignUp";

function App() {
  // const isLoading = useSelector((state) => state.blogs.isLoading);
  // const error = useSelector((state) => state.blogs.error);

  return (
    <>
      {/* {isLoading && <Spinner />}
      {error && <Error />} */}
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<ArticleList />} />
            <Route path="/:title" element={<OneArticle />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
