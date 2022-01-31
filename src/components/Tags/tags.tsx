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
  isChecked
}) => {
  const [tags, setTags] = React.useState<any>([]);
  const [allTags, setallTags] = React.useState<any>([]);
  const ref = useRef<any>();
  console.log(selectListTag, 'selectListTag');

  const suggestionTagData = async () => {
    const response = await suggestionTag(allTags);
    settagsSuggestionList(response);
  };

  React.useEffect(() => {
    addSkills(selectListTag);
  }, [selectListTag]);

  useMemo(() => suggestionTagData(), [allTags]);

  useMemo(() => {
    setallTagsData(allTags);
    setcount(tags);
  }, [tags.length]);
  // React.useEffect(() => {
  //   suggestionTagData();
  // }, [allTags]);

  // React.useEffect(() => {
  //   setallTagsData(allTags);
  // }, [tags.length]);

  const removeTags = (indexToRemove: number) => {
    setTags([
      ...tags.filter((_: any, index: number) => index !== indexToRemove)
    ]);
    setallTags([
      ...allTags.filter((_: any, index: number) => index !== indexToRemove)
    ]);
  };
  const addTags = (event: any) => {
    const tag = { keyword: event.target.value, type: 'unknown' };
    if (event.target.value !== '') {
      setTags([...tags, event.target.value]);
      setallTags((prevData: any) => [...prevData, tag]);
      selectedTags([...tags, event.target.value]);
      event.target.value = '';
    }
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
        <ol className={style.tagss}>
          {allTags?.map((tag: any, index: number) => (
            <li key={index} className={style.tag}>
              {console.log(allTags, 'allTags')}
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
        </ol>
        <input
          type="text"
          onKeyUp={(event) => (event.key === 'Enter' ? addTags(event) : null)}
          placeholder="Search keywords"
          onChange={(e) => setgroupTitle(e.target.value)}
          ref={ref}
        />
      </div>
    </>
  );
};

export default Tags;
