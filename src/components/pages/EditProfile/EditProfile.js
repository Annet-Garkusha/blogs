import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { usersEdit } from '../../../store/usersSlice';
import styles from '../SignIn/SignIn.module.scss';

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const dispatch = useDispatch();
  const nav = useNavigate();
  const username = useSelector((state) => state.users.username);
  const email = useSelector((state) => state.users.email);
  const token = localStorage.getItem('token');

  const onSubmit = () => {
    const username = getValues('username');
    const email = getValues('email');
    const image = getValues('image');
    const password = getValues('password');
    dispatch(usersEdit({ email, username, image, password, token }));
    nav('/');
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles.title}>Edit Profile</h2>
            <label>
              <div className={styles.description}>Username</div>
              <input
                defaultValue={username}
                type="text"
                {...register('username', {
                  minLength: {
                    value: 3,
                    message: 'Min length Username must be 4 characters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Max length Username must be 20 characters',
                  },
                })}
                className={errors.username && styles.invalid}
              ></input>
            </label>
            <label>
              <div className={styles.description}>Email address</div>
              <input defaultValue={email} type="email" {...register('email')}></input>
            </label>
            <label>
              <div className={styles.description}>New password</div>
              <input
                type="password"
                placeholder="New password"
                {...register('password', {
                  required: ' New password is required',
                  minLength: {
                    defaultValue: 6,
                    message: 'Your new password needs to be at least 6 characters.',
                  },
                  maxLength: {
                    defaultValue: 40,
                    message: 'your new password must be less than 40 characters',
                  },
                })}
                className={errors.password && styles.invalid}
              ></input>
              <p className={styles.required}>{errors.password?.message}</p>
            </label>
            <label>
              <div className={styles.description}>Avatar image (url)</div>
              <input type="url" placeholder="Avatar image" {...register('image')}></input>
            </label>
            <button className={styles.login}>Save</button>
          </form>
        </div>
      </div>
    </>
  );
};

export { EditProfile };
