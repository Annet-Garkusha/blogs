import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Pagination } from 'antd';

import { fetchArticle } from '../../../store/blogsSlice';
import { ArticleItem } from '../../Article-item/ArticleItem';
import { Spinner } from '../../Spinner/Spinner';
import { Error } from '../../Error/Error';

import styles from './ArticleList.module.scss';

const ArticleList = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const articles = useSelector((state) => state.blogs.articles);
  const page = useSelector((state) => state.blogs.page);
  const isLoading = useSelector((state) => state.blogs.isLoading);
  const error = useSelector((state) => state.blogs.error);

  const onChangePage = (e) => {
    setPageNumber(e);
  };

  useEffect(() => {
    setTimeout(() => dispatch(fetchArticle({ pageNumber: pageNumber * 6 - 6 })), 400);
  }, [dispatch, pageNumber]);

  return (
    <>
      {error && !isLoading && <Error />}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.wrapper}>
          {articles.map((item) => (
            <ArticleItem key={item.createdAt} {...item} pageNumber={pageNumber} />
          ))}
          <Pagination
            showSizeChanger={false}
            total={page}
            style={{ display: 'flex', justifyContent: 'center' }}
            onChange={(e) => onChangePage(e)}
            current={pageNumber}
            pageSize={6}
          />
        </div>
      )}
    </>
  );
};

export { ArticleList };
