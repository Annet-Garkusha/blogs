import styles from "../SignIn/SignIn.module.scss";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { usersAutorization } from "../../../store/usersSlice";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const dispatch = useDispatch();
  const username = getValues("username");
  const email = getValues("email");
  const password = getValues("password");
  const onSubmit = (data) =>
    dispatch(usersAutorization({ username, email, password }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          action="#"
        >
          <h2 className={styles.title}>Create new account</h2>
          <label>
            <div className={styles.description}>Username</div>
            <input
              type="text"
              placeholder="some-username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Min length Username must be 4 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Max length Username must be 4 characters",
                },
              })}
              className={errors.username && styles.invalid}
            ></input>
            <p className={styles.required}>{errors.username?.message}</p>
          </label>
          <label>
            <div className={styles.description}>Email address</div>
            <input
              type="email"
              placeholder="Email address"
              {...register("email", { required: "Email address is required" })}
              className={errors.email && styles.invalid}
            ></input>
            <p className={styles.required}>{errors.email?.message}</p>
          </label>
          <label>
            <div className={styles.description}>Password</div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Your password needs to be at least 6 characters.",
                },
                maxLength: {
                  value: 40,
                  message: "your password must be less than 40 characters",
                },
              })}
              className={errors.password && styles.invalid}
            ></input>
            <p className={styles.required}>{errors.password?.message}</p>
          </label>
          <label>
            <div className={styles.description}>Repeat Password</div>
            <input
              type="password"
              placeholder="Password"
              {...register("repeatPassword", {
                required: "Repeat password is required",
                validate: (match) => {
                  const password = getValues("password");
                  return match === password || "Passwords must match";
                },
              })}
              className={errors.repeatPassword && styles.invalid}
            ></input>
            <p className={styles.required}>{errors.repeatPassword?.message}</p>
          </label>

          <hr></hr>
          <div className={styles.data}>
            <input
              type="checkbox"
              defaultChecked
              className={styles.checkbox}
            ></input>
            <span className={styles.description}>
              I agree to the processing of my personal information
            </span>
          </div>
          <div>
            <button className={styles.login}>Create</button>
          </div>
          <div className={styles.signin}>
            Don’t have an account? <Link to="/sign-in">Sign In.</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export { SignUp };
