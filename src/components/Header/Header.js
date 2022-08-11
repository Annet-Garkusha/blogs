import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import avatar from '../Article-item/avatar.svg';
import { setUserLogout, getCurrentUser } from '../../store/usersSlice';

import styles from './Header.module.scss';

const Header = () => {
  const token = localStorage.getItem('token');
  const username = useSelector((state) => state.users.username);

  const image = useSelector((state) => state.users.image);

  const nav = useNavigate();

  const dispatch = useDispatch();

  const userLogout = () => {
    dispatch(setUserLogout());
    nav('/');
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getCurrentUser(token));
    }
  }, []);

  return (
    <>
      <div className={styles.header}>
        <Link to="/">
          <div className={styles.title}>Realworld Blog</div>
        </Link>

        {token ? (
          <div className={styles.userlogin}>
            <Link to="/new-article">
              <button>Create article</button>
            </Link>
            <Link to="/profile">
              {' '}
              <div className={styles.title}>{username}</div>
            </Link>
            <Link to="/profile">
              {' '}
              {image === 'null' ? (
                <img src={avatar} alt="avatar"></img>
              ) : (
                <img className={styles.avatar} src={image} alt="avatar"></img>
              )}
            </Link>
            <button onClick={userLogout}>Log Out</button>
          </div>
        ) : (
          <div className={styles.buttons}>
            <Link to="/sign-in">
              <button>Sign In</button>
            </Link>

            <Link to="/sign-up">
              <button>Sign Up</button>
            </Link>
          </div>
        )}
      </div>

      <Outlet />
    </>
  );
};

export { Header };
