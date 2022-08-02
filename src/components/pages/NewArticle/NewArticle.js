import styles from "./NewArticle.module.scss";
import { useForm } from "react-hook-form";
import { postNewArticle } from "../../../store/articlesSlice";
import { useDispatch, useSelector } from "react-redux";

const NewArticle = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const title = getValues("title");
  const description = getValues("description");
  const body = getValues("body");
  const tag = getValues("tag");
  const token = useSelector((state) => state.users.token);

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(postNewArticle({ title, description, body, tag, token }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          action="#"
        >
          <h2 className={styles.title}>Create new article</h2>
          <label>
            <div className={styles.description}>Title</div>
            <input
              type="text"
              placeholder="Title"
              {...register("title", {
                required: "Title is required",
              })}
            ></input>
            <p className={styles.required}>{errors.username?.message}</p>
          </label>
          <label>
            <div className={styles.description}>Short description</div>
            <input
              type="text"
              placeholder="Short description"
              {...register("description", {
                required: "Short description is required",
              })}
            ></input>
            <p className={styles.required}>{errors.username?.message}</p>
          </label>
          <label>
            <div className={styles.description}>Text</div>
            <textarea
              placeholder="Text"
              {...register("body", {
                required: "Text is required",
              })}
            ></textarea>
            <p className={styles.required}>{errors.username?.message}</p>
          </label>
          <label>
            <div className={styles.description}>Tags</div>
            <div className={styles.tags}>
              <input type="text" placeholder="Tag" {...register("tag")}></input>
              <button className={styles.delete}>Delete</button>
              <button className={styles.add}>Add tag</button>
            </div>
          </label>

          <div>
            <button className={styles.send}>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { NewArticle };
