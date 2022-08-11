import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { postNewArticle, editArticle } from '../../../store/articlesSlice';
import { addTag, removeTag, clearTag, fetchArticleOne } from '../../../store/blogsSlice';

import styles from './NewArticle.module.scss';

const NewArticle = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const isEdit = window.location.pathname.includes('edit');

  const [text, setText] = useState('');

  const token = useSelector((state) => state.users.token);
  const tagList = useSelector((state) => state.blogs.tagList);
  const title = useSelector((state) => state.blogs.title);
  const description = useSelector((state) => state.blogs.description);
  const body = useSelector((state) => state.blogs.body);
  const slug = window.location.pathname.split('/')[2];

  const dispatch = useDispatch();
  const nav = useNavigate();

  const onSubmit = () => {
    const title = getValues('title');
    const description = getValues('description');
    const body = getValues('body');

    isEdit
      ? dispatch(editArticle({ title, description, body, tagList, slug, token }))
      : dispatch(postNewArticle({ title, description, body, tagList, token }));
    nav('/');
  };

  useEffect(() => {
    if (!isEdit) {
      setValue('title', '');
      setValue('description', '');
      setValue('body', '');
      dispatch(clearTag());
    }
  }, [isEdit]);

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchArticleOne({ title: slug }));
    }
  }, [isEdit]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} action="#">
          <h2 className={styles.title}>{isEdit ? 'Edit article' : 'Create new article'}</h2>

          <label>
            <div className={styles.description}>Title</div>
            <input
              type="text"
              defaultValue={isEdit ? title : null}
              placeholder="Title"
              {...register('title', {
                required: 'Title is required',
              })}
              className={errors.title && styles.invalid}
            ></input>
            <p className={styles.required}>{errors.title?.message}</p>
          </label>
          <label>
            <div className={styles.description}>Short description</div>
            <input
              type="text"
              defaultValue={isEdit ? description : null}
              placeholder="Short description"
              {...register('description', {
                required: 'Short description is required',
              })}
              className={errors.description && styles.invalid}
            ></input>
            <p className={styles.required}>{errors.description?.message}</p>
          </label>
          <label>
            <div className={styles.description}>Text</div>
            <textarea
              placeholder="Text"
              defaultValue={isEdit ? body : null}
              {...register('body', {
                required: 'Text is required',
              })}
              className={errors.body && styles.invalid}
            ></textarea>
            <p className={styles.required}>{errors.body?.message}</p>
          </label>
          <label>
            <div className={styles.description}>Tags</div>

            <div className={styles.tags}>
              <input type="text" placeholder="Tag" value={text} onChange={(e) => setText(e.target.value)}></input>

              <button
                className={styles.add}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addTag(text.trim()));

                  setText('');
                }}
              >
                Add tag
              </button>
            </div>
          </label>

          {tagList.map((tag) => (
            <div className={styles.tags} key={tag.id}>
              <input type="text" placeholder="Tag" defaultValue={tag.text}></input>
              <button
                className={styles.delete}
                onClick={(e) => {
                  e.preventDefault();

                  dispatch(removeTag(tag.id));
                }}
              >
                Delete
              </button>
            </div>
          ))}

          <div>
            <button className={styles.send}>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { NewArticle };
