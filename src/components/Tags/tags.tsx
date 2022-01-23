import React, { useRef } from "react";
import style from './tags.module.scss';

interface TagsProps {
  setcount: any;
  selectedTags: any;
  setgroupTitle: any;
  value: string;
  getSkills?: any;
  setgetSkills: any;
  groupTitle?: any;
  setallTagsData:any
}

const Tags: React.FC<TagsProps> = ({
  selectedTags,
  setcount,
  setgroupTitle,
  getSkills,
  setgetSkills,
  groupTitle,
  setallTagsData
}) => {
  const [tags, setTags] = React.useState<any>([]);
  const [allTags, setallTags] = React.useState<any>([]);
  const ref = useRef<any>();

  React.useEffect(() => {
    setcount(tags);
    setallTagsData(allTags)
  }, [tags]);
  const removeTags = (indexToRemove: number) => {
    setTags([
      ...tags.filter((_: any, index: number) => index !== indexToRemove)
    ]);
  };
  const addTags = (event: any) => {
    if (event.target.value !== '') {
      setTags([...tags, event.target.value]);
      setallTags((prevData: any) => [...prevData, groupTitle]);
      selectedTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };
  const addSkills = (tag: any) => {
    ref.current.value = "";
    setallTags((prevData: any) => [...prevData, tag]);
    setTags([...tags, tag.keyword]);
    selectedTags([...tags, tag.keyword]);
    setgroupTitle(null);
    setgetSkills(null);
  };
  return (
    <>
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
          onChange={(e) => setgroupTitle(e.target.value)}
          ref={ref}
        />
      </div>
    
      {groupTitle?.length &&
        getSkills?.map((skill: any, index: any) => {
          return (
            <div key={index} className={style.skillDropdown}>
              <button className={style.button} onClick={() => addSkills(skill)}>
                {skill?.keyword}
              </button>
            </div>
          );
        })}
    </>
  );
};

export default Tags;
