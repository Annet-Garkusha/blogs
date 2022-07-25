import styles from "./Header.module.scss";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Error } from "../Error/Error";
import { Spinner } from "../Spinner/Spinner";

const Header = () => {
  const isLoading = useSelector((state) => state.blogs.isLoading);
  const error = useSelector((state) => state.blogs.error);
  return (
    <>
      <div className={styles.header}>
        <Link to="/">
          <div className={styles.title}>Realworld Blog</div>
        </Link>
        <div className={styles.buttons}>
          <button>Sign In</button>

          <button>Sign Up</button>
        </div>
      </div>
      <Outlet />
      {isLoading && <Spinner />}
      {error && <Error />}
    </>
  );
};

export { Header };
