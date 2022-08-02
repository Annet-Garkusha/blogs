import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticleOne } from "../../store/blogsSlice";
import styles from "./OneArticle.module.scss";
import ReactMarkdown from "react-markdown";

import likes from "../Article-item/likes.svg";

import { format } from "date-fns";
import { Spinner } from "../Spinner/Spinner";

const OneArticle = () => {
  const dispatch = useDispatch();
  const { title } = useParams();
  const oneArticle = useSelector((state) => state.blogs.oneArticle);

  useEffect(() => {
    dispatch(fetchArticleOne({ title }));
  }, [dispatch, title]);

  if (!oneArticle) {
    return <Spinner />;
  }
  if (oneArticle) {
    const date = format(
      new Date(oneArticle[0] ? oneArticle[0].createdAt : null),
      "MMMM dd, yyyy"
    );
    return (
      <>
        <div className={styles.items}>
          <div className={styles.title}>
            <p>{oneArticle[0]?.title}</p>

            <img alt="like" src={likes}></img>
            <span>{oneArticle[0]?.favoritesCount}</span>
          </div>

          {oneArticle[0]?.tagList.length !== 0 || oneArticle[0]?.tagList !== ""
            ? oneArticle[0]?.tagList.map((tag, index) => (
                <span key={index} className={styles.taglist}>
                  {tag}
                </span>
              ))
            : null}
          <p className={styles.text}>{oneArticle[0]?.description} </p>

          <div className={styles.author}>
            <div>
              <p>{oneArticle[0]?.author.username}</p>
              <span>{date}</span>
            </div>

            <img
              className={styles.avatar}
              alt="avatar"
              src={oneArticle[0]?.author.image}
            ></img>
          </div>

          <ReactMarkdown
            className={styles.body}
            children={oneArticle[0]?.body}
          ></ReactMarkdown>
        </div>
      </>
    );
  }
};

export { OneArticle };
