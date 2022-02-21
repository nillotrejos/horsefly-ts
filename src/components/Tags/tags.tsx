import React, { useMemo, useRef } from 'react';
import { suggestionTag } from '../../Api/api';
import style from './tags.module.scss';

interface TagsProps {
  setcount: any;
  setgroupTitle: any;
  value: any;
  getSkills?: any;
  setgetSkills: any;
  groupTitle?: any;
  setallTagsData: any;
  selectListTag: any;
  settagsSuggestionList?: any;
  tagsSuggestionList?: any;
  isChecked: boolean;
  index:number

}

const Tags: React.FC<TagsProps> = ({
  setcount,
  setgroupTitle,
  setgetSkills,
  setallTagsData,
  selectListTag,
  settagsSuggestionList,
  isChecked,

}) => {
  const [allTags, setallTags] = React.useState<any>([]);
  const [tags, setTags] = React.useState<any>([]);
  const ref = useRef<any>();
console.log(allTags,'allTags')
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
    allTags?.length > 0 && suggestionTagData();
  }, [allTags]);

  React.useEffect(() => {
    if (allTags?.length > 0){
      setallTagsData(allTags);
      setcount(tags);
    }
  }, [tags]);
  
  const removeTags = (indexToRemove: number) => {
    setTags([
      ...tags.filter((_: any, index: number) => index !== indexToRemove)
    ]);
    setallTags([
      ...allTags?.filter((_: any, index: number) => index !== indexToRemove)
    ]);
  };

  const addTags = (event: any) => {
    const tag = { keyword: event.target.value, type: 'unknown' };
    if (event.target.value !== '') {
      setTags([...tags, event.target.value]);
      setallTags([...allTags,tag]);
      event.target.value = '';
    } 
  };
  const addSkills = (tag: any) => {
    ref.current.value = '';
    setTags([...tags, tag.keyword]);
    setallTags([...allTags,tag]);
    setgroupTitle(null);
    setgetSkills(null);
  };
  return (
    <>
      <div className={style.tagsInput}>
        <ul className={style.tagss}>
          {allTags?.length > 0 && allTags?.map((tag: any, index: number) => (
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
