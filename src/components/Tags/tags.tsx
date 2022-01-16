import React from 'react';
import style from './tags.module.scss';

interface TagsProps{
  setcount:any
  selectedTags:any
  setSearchGroups:any
  value:string
}

const Tags:React.FC<TagsProps> = ({selectedTags,setcount,setSearchGroups}) => {
  const [tags, setTags] = React.useState<any>([]);

  React.useEffect(()=>{
    setcount(tags)
  },[tags])
  const removeTags = (indexToRemove: number) => {
    setTags([
      ...tags.filter((_: any, index: number) => index !== indexToRemove)
    ]);
  };
  const addTags = (event: any) => {
    if (event.target.value !== '') {
      setTags([...tags, event.target.value]);
      selectedTags([...tags, event.target.value]);
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
        onChange={(e)=>setSearchGroups(e.target.value)}
      />
    </div>
  );
};

export default Tags;
