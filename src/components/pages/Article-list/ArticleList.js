import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ArticleItem } from "../../Article-item/ArticleItem";
import styles from "./ArticleList.module.scss";
import { fetchArticle } from "../../../store/blogsSlice";
import { Pagination } from "antd";

const ArticleList = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const articles = useSelector((state) => state.blogs.articles);
  const page = useSelector((state) => state.blogs.page);

  const onChangePage = (e) => {
    setPageNumber(e);
  };

  useEffect(() => {
    dispatch(fetchArticle({ pageNumber: pageNumber * 6 - 6 }));
  }, [dispatch, pageNumber]);

  return (
    <div className={styles.wrapper}>
      {articles.map((item) => (
        <ArticleItem key={item.createdAt} {...item} />
      ))}
      <Pagination
        showSizeChanger={false}
        total={page}
        style={{ display: "flex", justifyContent: "center" }}
        onChange={(e) => onChangePage(e)}
        current={pageNumber}
        pageSize={6}
      />
    </div>
  );
};

export { ArticleList };
