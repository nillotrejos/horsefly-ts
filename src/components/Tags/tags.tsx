import React, { useRef } from 'react';
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
  // settagsSuggestions:any
}

const Tags: React.FC<TagsProps> = ({
  selectedTags,
  setcount,
  setgroupTitle,
  getSkills,
  setgetSkills,
  groupTitle,
  setallTagsData
  // settagsSuggestions
}) => {
  const [tags, setTags] = React.useState<any>([]);
  const [allTags, setallTags] = React.useState<any>([]);
  const [tagsSuggestions, settagsSuggestions] = React.useState<any>([]);
  const ref = useRef<any>();
  console.log(tags, 'tagsssss');
  console.log(allTags, 'allTags');

  const suggestionTagData = async () => {
    const response = await suggestionTag(allTags);
    settagsSuggestions(response);
    console.log(response, 'seggg');
  };

  React.useEffect(() => {
    suggestionTagData();
  }, [allTags]);

  React.useEffect(() => {
    setcount(tags);
    setallTagsData(allTags);
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
      {tagsSuggestions?.length && !getSkills?.length ? (
        <div style={{zIndex:0}}>
          {tagsSuggestions?.map((skill: any, index: any) => { 
            return (
              <button
                className={style.suggestionsButton}
                onClick={() => addSkills(skill)}
              >
                {skill?.keyword}
              </button>
            );
          })}
        </div>
      ) : null}

      {getSkills?.length ? (
        <div style={{ maxHeight: 200, overflow: 'scroll',zIndex:1 }}>
          {groupTitle?.length &&
            getSkills?.map((skill: any, index: any) => {
              return (
                <div key={index} className={style.skillDropdown}>
                  <button
                    className={style.button}
                    onClick={() => addSkills(skill)}
                  >
                    {skill?.keyword}
                  </button>
                </div>
              );
            })}
        </div>
      ) : null}
    </>
  );
};

export default Tags;
