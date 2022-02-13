import React, { useMemo, useRef } from 'react';
import { suggestionTag } from '../../Api/api';
import style from './tags.module.scss';

interface TagsProps {
  setcount: any;
  selectedTags: any;
  setgroupTitle: any;
  value: string;
  getSkills?: any;
  setgetSkills: any;
  groupTitle?: any;
  setallTagsData: any;
  selectListTag: any;
  settagsSuggestionList: any;
  tagsSuggestionList: any;
  isChecked: boolean;
}

const Tags: React.FC<TagsProps> = ({
  selectedTags,
  setcount,
  setgroupTitle,
  setgetSkills,
  setallTagsData,
  selectListTag,
  settagsSuggestionList,
  isChecked,
  getSkills,
  tagsSuggestionList,
}) => {
  const [tags, setTags] = React.useState<any>([]);
  const [allTags, setallTags] = React.useState<any>([]);
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
    console.log('worked')
    addSkills(selectListTag)
  }, [selectListTag]);
  
  useMemo(() => suggestionTagData(), [allTags]);

  React.useEffect(() => {
    allTags.length > 0 && suggestionTagData();
  }, [allTags]);

  React.useEffect(() => {
    if (allTags.length > 0){
      setallTagsData(allTags);
      setcount(tags);
    }
  }, [tags]);
  
  const removeTags = (indexToRemove: number) => {
    setTags([
      ...tags.filter((_: any, index: number) => index !== indexToRemove)
    ]);
    setallTags([
      ...allTags.filter((_: any, index: number) => index !== indexToRemove)
    ]);
  };
  const addTags = (event: any) => {
    getSkills.map((item: any) => {
      if (event.target.value === item.keyword){
        const tag = { keyword: event.target.value, type: item.type, collisionId: item.collisionId };
        setTags([...tags, event.target.value]);
        setallTags((prevData: any) => [...prevData, tag]);
        selectedTags([...tags, event.target.value]);
        event.target.value = '';
      }
    })
  };
  const addSkills = (tag: any) => {
    ref.current.value = '';
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
