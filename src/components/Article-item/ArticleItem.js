import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { likesAticle } from '../../store/articlesSlice';
import { fetchArticle } from '../../store/blogsSlice';
import { Like } from '../Article-item/like';

import avatar from './avatar.svg';
import styles from './ArticleItem.module.scss';

const ArticleItem = ({ title, tagList, description, author, createdAt, favoritesCount, slug, pageNumber }) => {
  const date = format(new Date(createdAt), 'MMMM dd, yyyy');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const isLoggin = localStorage.getItem('isLoggin');

  const handleLike = () => {
    if (isLoggin) {
      dispatch(likesAticle({ slug, token }));
      setTimeout(() => dispatch(fetchArticle({ pageNumber: pageNumber * 6 - 6 })), 300);
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.title}>
        <Link to={`/${slug}`}>
          <p>{title ? title : 'Some article title'}</p>
        </Link>
        <button className={styles.likes} onClick={() => handleLike()}>
          <Like className={styles.component} />
        </button>
        <span>{favoritesCount}</span>
      </div>

      {tagList.length !== 0 || tagList !== 'null'
        ? tagList
            .filter((tag) => tag)
            .map((tag, index) => (
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
