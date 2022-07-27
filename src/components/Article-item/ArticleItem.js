import styles from "./ArticleItem.module.scss";
import likes from "./likes.svg";
import avatar from "./avatar.svg";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const ArticleItem = ({
  title,
  tagList,
  description,
  author,
  createdAt,
  favoritesCount,
  slug,
}) => {
  const date = format(new Date(createdAt), "MMMM dd, yyyy");

  return (
    <div className={styles.item}>
      <div className={styles.title}>
        <Link to={`/${slug}`}>
          <p>{title ? title : "Some article title"}</p>
        </Link>

        <img alt="like" src={likes}></img>
        <span>{favoritesCount}</span>
      </div>

      {tagList.length !== 0 || tagList !== ""
        ? tagList.map((tag, index) => (
            <span key={index} className={styles.taglist}>
              {tag}
            </span>
          ))
        : null}
      <p className={styles.text}>{description} </p>

      <div className={styles.author}>
        <div>
          <p>{author.username}</p>
          <span>{date}</span>
        </div>
        {author.image ? (
          <img className={styles.avatar} alt="avatar" src={author.image}></img>
        ) : (
          <img className={styles.avatar} alt="avatar" src={avatar}></img>
        )}
      </div>
    </div>
  );
};

export { ArticleItem };
