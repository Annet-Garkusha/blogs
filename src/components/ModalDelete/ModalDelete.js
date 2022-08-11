import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteArticle } from '../../store/articlesSlice';
import { fetchArticle } from '../../store/blogsSlice';

import styles from './ModalDelete.module.scss';
import icon from './icon.svg';

const ModalDelete = ({ setModalActive }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const slug = useSelector((state) => state.blogs.slug);
  const token = localStorage.getItem('token');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={icon} alt="Attention!"></img>
        <span>Are you sure to delete this article?</span>
        <div className={styles.buttons}>
          <button className={styles.no} onClick={() => setModalActive(null)}>
            No
          </button>
          <button
            className={styles.yes}
            onClick={() => {
              dispatch(deleteArticle({ slug, token }));
              nav('/');
              setTimeout(() => dispatch(fetchArticle({ pageNumber: 1 })), 200);
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export { ModalDelete };
