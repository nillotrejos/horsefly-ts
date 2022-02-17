import React, { useMemo, useRef } from 'react';
import { suggestionTag } from '../../Api/api';
import style from './tags.module.scss';

interface TagsProps {
  setgroupTitle: any;
  value: string;
  getSkills?: any;
  setgetSkills: any;
  groupTitle?: any;
  setallTagsData: any;
  selectListTag: any;
  settagsSuggestionList: any;
  isChecked: boolean;
  allTags: any;
  setAllTags: any;
}

const Tags: React.FC<TagsProps> = ({
  setgroupTitle,
  setgetSkills,
  setallTagsData,
  selectListTag,
  settagsSuggestionList,
  isChecked,
  getSkills,
  allTags,
  setAllTags,
}) => {
  
  const ref = useRef<any>();

  const suggestionTagData = async () => {
    const response = await suggestionTag(allTags);
    settagsSuggestionList(response);
  };

  const firstUpdate = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    addSkills(selectListTag)
  }, [selectListTag]);
  
  useMemo(() => suggestionTagData(), [allTags]);

  React.useEffect(() => {
    console.log("allTags", allTags);
    allTags.length > 0 && suggestionTagData();
  }, [allTags]);

  React.useEffect(() => {
    if (allTags.length > 0){
      setallTagsData(allTags);
    }
  }, []);
  
  const removeTags = (indexToRemove: number) => {
    setAllTags([
      ...allTags.filter((_: any, index: number) => index !== indexToRemove)
    ]);
  };
  const addTags = (event: any) => {
    getSkills.map((item: any) => {
      if (event.target.value !== item.keyword){
        const tag = { keyword: event.target.value, type:"", collisionId: "" };
        setAllTags((prevData: any) => [...prevData, tag]);
        event.target.value = '';
      } else {
        event.target.value = '';
      }
    })
  };
  const addSkills = (tag: any) => {
    ref.current.value = '';
    setAllTags((prevData: any) => [...prevData, tag]);
    setgroupTitle(null);
    setgetSkills(null);
  };
  return (
    <>
      <div className={style.tagsInput}>
        <ul className={style.tagss}>
          {allTags.length > 0 && allTags?.map((tag: string, index: number) => (
            <li key={index} className={style.tag}>
              <span
                className={
                  isChecked
                    ? style.tagCloseIconList1
                    : tag.type === 'unknown'
                    ? style.tagCloseIcon
                    : style.tagCloseIconList
                }
                onClick={() => removeTags(index)}
              >
                x
              </span>
              <span className={style.tagTitle}>{tag.keyword}</span>
            </li>
          ))}
        </ul>
        <input
          type="text"
          onKeyUp={(event) => (event.key === 'Enter' ? addTags(event) : null)
          }
          placeholder="Search keywords"
          onChange={(e) =>  setgroupTitle(e.target.value)}
          ref={ref}
        />
      </div>
    </>
  );
};

export default Tags;
