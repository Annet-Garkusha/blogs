import Popover from '@mui/material/Popover';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

import likes from '../Article-item/likes.svg';
import { fetchArticleOne } from '../../store/blogsSlice';
import { likesAticle } from '../../store/articlesSlice';
import { Spinner } from '../Spinner/Spinner';
import { ModalDelete } from '../ModalDelete/ModalDelete';
import { Error } from '../Error/Error';

import styles from './OneArticle.module.scss';

const OneArticle = () => {
  const dispatch = useDispatch();

  const { title } = useParams();

  const [modalActive, setModalActive] = useState(null);
  const oneArticle = useSelector((state) => state.blogs.oneArticle);
  const usernameMy = useSelector((state) => state.users.username);
  const token = useSelector((state) => state.users.token);
  const username = useSelector((state) => state.blogs.username);
  const slug = useSelector((state) => state.blogs.slug);
  const isLoggin = localStorage.getItem('isLoggin');
  const isLoading = useSelector((state) => state.blogs.isLoading);
  const error = useSelector((state) => state.blogs.error);

  useEffect(() => {
    dispatch(fetchArticleOne({ title }));
  }, [dispatch, title]);

  if (!oneArticle) {
    return <Spinner />;
  }
  if (oneArticle) {
    const date = format(new Date(oneArticle[0] ? oneArticle[0].createdAt : null), 'MMMM dd, yyyy');

    const handleClickModal = (event) => {
      setModalActive(event.currentTarget);
    };

    const handleCloseModal = () => {
      setModalActive(null);
    };

    const open = Boolean(modalActive);

    const handleLike = () => {
      if (isLoggin) {
        dispatch(likesAticle({ slug, token }));
        setTimeout(() => dispatch(fetchArticleOne({ title })), 300);
      }
    };

    return (
      <>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Error />
        ) : (
          <div className={styles.items}>
            <div className={styles.title}>
              <p>{oneArticle[0]?.title}</p>

              {isLoggin ? (
                <button className={styles.likes} onClick={() => handleLike()}>
                  <img alt="like" src={likes}></img>
                </button>
              ) : (
                <div className={styles.likes}>
                  <img alt="like" src={likes}></img>
                </div>
              )}

              <span>{oneArticle[0]?.favoritesCount}</span>
            </div>

            {oneArticle[0]?.tagList.length !== 0 || oneArticle[0]?.tagList !== ''
              ? oneArticle[0]?.tagList
                  .filter((tag) => tag)
                  .map((tag, index) => (
                    <span key={index} className={styles.taglist}>
                      {tag}
                    </span>
                  ))
              : null}
            <div className={styles.text}>
              <div className={styles.description}>{oneArticle[0]?.description}</div>
              {usernameMy === username ? (
                <div className={styles.change}>
                  <button className={styles.delete} onClick={handleClickModal}>
                    Delete
                  </button>
                  <Popover
                    id=""
                    open={open}
                    anchorEl={modalActive}
                    onClose={handleCloseModal}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'center',
                      horizontal: 'left',
                    }}
                  >
                    <ModalDelete modalActive={modalActive} setModalActive={setModalActive} />
                  </Popover>

                  <Link to={`/articles/${slug}/edit`}>
                    <button className={styles.edit}>Edit</button>
                  </Link>
                </div>
              ) : null}{' '}
            </div>

            <div className={styles.author}>
              <div>
                <p>{oneArticle[0]?.author.username}</p>
                <span>{date}</span>
              </div>

              <img className={styles.avatar} alt="avatar" src={oneArticle[0]?.author.image}></img>
            </div>

            <ReactMarkdown className={styles.body}>{oneArticle[0]?.body}</ReactMarkdown>
          </div>
        )}
      </>
    );
  }
};

export { OneArticle };
