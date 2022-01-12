import React from 'react';
import style from './tags.module.scss';

const Tags = (props: any) => {
  const [tags, setTags] = React.useState<any>([]);
  const removeTags = (indexToRemove: number) => {
    setTags([
      ...tags.filter((_: any, index: number) => index !== indexToRemove)
    ]);
  };
  const addTags = (event: any) => {
    if (event.target.value !== '') {
      setTags([...tags, event.target.value]);
      props.selectedTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };
  return (
    <div className={style.tagsInput}>
      <ul className={style.tagss}>
        {tags?.map((tag: string, index: number) => (
          <li key={index} className={style.tag}>
            <span
              className={style.tagCloseIcon}
              onClick={() => removeTags(index)}
            >
              x
            </span>
            <span className={style.tagTitle}>{tag}</span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={(event) => (event.key === 'Enter' ? addTags(event) : null)}
        placeholder="Search keywords"
      />
    </div>
  );
};

export default Tags;
