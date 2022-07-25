import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticleOne } from "../../store/blogsSlice";
import styles from "../Article-item/ArticleItem.module.scss";
import likes from "../Article-item/likes.svg";

import { format } from "date-fns";

const OneArticle = () => {
  const dispatch = useDispatch();
  const { title } = useParams();
  const oneArticle = useSelector((state) => state.blogs.oneArticle);
  console.log(oneArticle, "Это приходит в компоненте одной статьи");
  //   const date = format(
  //     new Date(oneArticle[0].article.createdAt),
  //     "MMMM dd, yyyy"
  //   );

  useEffect(() => {
    if (title) {
      dispatch(fetchArticleOne({ title }));
    }
  }, [dispatch, title]);

  return (
    <div>{oneArticle[0].body}</div>
    // <div className={styles.item}>
    //   <div className={styles.title}>
    //     <p>{oneArticle[0].article.title}</p>

    //     <img alt="like" src={likes}></img>
    //     <span>{oneArticle[0].article.favoritesCount}</span>
    //   </div>

    //   {oneArticle[0].article.tagList.length !== 0 ||
    //   oneArticle[0].article.tagList !== ""
    //     ? oneArticle[0].article.tagList.map((tag, index) => (
    //         <span key={index} className={styles.taglist}>
    //           {tag}
    //         </span>
    //       ))
    //     : null}
    //   <p className={styles.text}>{oneArticle[0].article.description} </p>

    //   <div className={styles.author}>
    //     <div>
    //       <p>{oneArticle[0].article.author.username}</p>
    //       <span>{date}</span>
    //     </div>

    //     <img
    //       className={styles.avatar}
    //       alt="avatar"
    //       src={oneArticle[0].article.author.image}
    //     ></img>
    //   </div>
    //   <div>{oneArticle[0].article.body}</div>
    // </div>
  );
};

export { OneArticle };
