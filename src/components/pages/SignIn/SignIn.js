import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { usersProfile, getCurrentUser } from '../../../store/usersSlice';

import styles from './SignIn.module.scss';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const dispatch = useDispatch();

  const isLoggin = useSelector((state) => state.users.isLoggin);
  const errorMessage = useSelector((state) => state.users.errorMessage);
  const token = localStorage.getItem('token');

  const nav = useNavigate();

  const onSubmit = () => {
    const email = getValues('email');
    const password = getValues('password');
    dispatch(usersProfile({ email, password }));
  };

  useEffect(() => {
    if (isLoggin) dispatch(getCurrentUser(token));
  }, [isLoggin]);

  useEffect(() => {
    if (isLoggin) {
      nav('/');
    }
  }, [isLoggin]);

  return (
    <>
      {token ? (
        <Navigate to="/" />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <form className={styles.form} action="#" onSubmit={handleSubmit(onSubmit)}>
              <h2 className={styles.title}>Sign In</h2>
              <label>
                <div className={styles.description}>Email address</div>
                <input
                  type="email"
                  placeholder="Email address"
                  {...register('email', {
                    required: 'Email address is required',
                  })}
                  className={errors.email && styles.invalid}
                ></input>

                <p className={styles.required}>{errors.email?.message}</p>
              </label>
              <label>
                <div className={styles.description}>Password</div>
                <input
                  type="password"
                  placeholder="Password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className={errors.password && styles.invalid}
                ></input>
                <p className={styles.required}>{errors.password?.message}</p>
              </label>
              <div className={styles.required}>{errorMessage ? errorMessage : null}</div>

              <div>
                <button className={styles.login}>Login</button>
              </div>
              <div className={styles.signup}>
                Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export { SignIn };
