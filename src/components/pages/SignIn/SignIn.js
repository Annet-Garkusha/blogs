import styles from "./SignIn.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { usersProfile } from "../../../store/usersSlice";
import { getCurrentUser } from "../../../store/usersSlice";
import { Navigate } from "react-router-dom";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const dispatch = useDispatch();

  const email = getValues("email");
  const password = getValues("password");
  const isLoggin = useSelector((state) => state.users.isLoggin);
  const token = localStorage.getItem("token");

  const nav = useNavigate();

  const onSubmit = () => {
    dispatch(usersProfile({ email, password }));
    localStorage.setItem("isLoggin", true);
  };

  useEffect(() => {
    dispatch(getCurrentUser(token));
  }, []);

  useEffect(() => {
    if (isLoggin) {
      nav("/");
    }
  }, [isLoggin]);

  return (
    <>
      {token ? (
        <Navigate to="/" />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <form
              className={styles.form}
              action="#"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className={styles.title}>Sign In</h2>
              <label>
                <div className={styles.description}>Email address</div>
                <input
                  type="email"
                  placeholder="Email address"
                  {...register("email", {
                    required: "Email address is required",
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
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={errors.password && styles.invalid}
                ></input>
                <p className={styles.required}>{errors.password?.message}</p>
              </label>

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
