import styles from "./SignIn.module.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => console.log(data, "data");
  return (
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
              {...register("password", { required: "Password is required" })}
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
  );
};

export { SignIn };
