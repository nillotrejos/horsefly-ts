import React from 'react';
import style from './home.module.css';
import Image from 'next/image';
import Icon from '../../../public/assets/horsefly.png';
import SelectDropDown from '../../components/Dropdown/dropdown';
import { COUNTRIES, RADIUS } from '../../components/utils/MOC_DATA/mocData';
import InputField from '../../components/Input/InputField';
import Button from '../../components/Button/button';
import Tags from '../../components/Tags/tags';
import {Mapbox} from '../Map/map';

import {
  MdAddLocation,
  MdOutlinePlaylistAdd,
  MdDonutLarge,
  MdDoNotDisturbOn,
  MdTune,
  MdKeyboardArrowDown
} from 'react-icons/md';
import { VscDiscard } from 'react-icons/vsc';

const HomePage = () => {
  const [inputList, setInputList] = React.useState([
    { country: '', location: '', radius: '' }
  ]);
  const [country, setcountry] = React.useState('United Kingdom');
  const [location, setLocation] = React.useState('');
  const [radius, setradius] = React.useState('');
  const [tags, setTags] = React.useState([]);

  const handleRemoveClick = (index: any) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  const handleAddClick = () => {
    setInputList([...inputList, { country: '', location: '', radius: '' }]);
  };
  const selectedTags = (tags: any) => {
    console.log(tags, 'selectedTags');
    setTags(tags);
  };
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",height:"90vh"}}>
    <div>

      <div className={style.topBar}>
        <Image src={Icon} width={160} height={26} />
      </div>
      <div className={style.topHeadings}>
          <p className={style.headingText}> SEARCH BUILDER </p>
          <p className={style.headingText}> SAVED SEARCHES </p>
          <p className={style.headingText}> UPLOAD CVS</p>
        </div>
        <hr style={{ margin: 0, padding: 0 ,width:640 }} />
      <div className={style.container}>
     

        <div className={style.filtersHeading}>
          <p className={style.filterText1}>New Search</p>
          <div className={style.filterTextContainer}>
              <div className={style.filterText}>
              <MdTune/>
              <p >Filters</p>
              </div>
              <div className={style.filterText}>
           
              <p>GBP</p>
              <MdKeyboardArrowDown/>
              </div>
             
          </div>
        </div>

        {inputList.map((x, i) => {
          return (
            <>
              <div className={style.selectInputContainer}>
                <SelectDropDown
                  items={COUNTRIES}
                  selected={country}
                  className={style.dropdown}
                  handler={setcountry}
                  captionKey="name"
                  title={country}
                />
                <InputField
                  type="text"
                  placeholder="Location"
                  name="firstName"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={style.dropdown1}
                />
                <SelectDropDown
                  items={RADIUS}
                  selected={radius}
                  className={style.dropdown2}
                  handler={setradius}
                  captionKey="radius"
                  title="radius"
                />
              </div>
              <div className="btn-box">
                {inputList.length !== 1 && (
                  <div
                    className={style.discardBtnContainer}
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <div
                      className={style.discardIconBtn}
                      onClick={() => handleRemoveClick(i)}
                    >
                      <MdDoNotDisturbOn />
                      <Button
                        className={style.discardInputBtn}
                        title="Discard"
                      />
                    </div>
                  </div>
                )}
                {inputList.length - 1 === i && (
                  <Button
                    onClick={handleAddClick}
                    title="Add location"
                    className={style.btn}
                    icon={<MdAddLocation className={style.iconStyle} />}
                  />
                )}
              </div>
            </>
          );
        })}
        <div style={{ margin: 10 }}>
          <p className={style.search}>Search Group Options</p>

          <Tags selectedTags={selectedTags} />

          <Button
            title="Add search group"
            className={tags.length ? style.btn1Active : style.btn1}
            icon={<MdOutlinePlaylistAdd className={style.iconStyle} />}
          />
        </div>

        <div className={style.bottomMainContainer}>
          {tags.length ? (
            <div className={style.bottom}>
              <div className={style.bottomContainer}>
                <Button
                  title="Discard search"
                  icon={<VscDiscard className={style.iconStyle} />}
                  className={style.discardBtn}
                />
                <Button
                  title="Explore results"
                  icon={<MdDonutLarge className={style.iconStyle} />}
                  className={style.exploreBtn}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      </div>
    <div >
        
        <Mapbox/>
    </div>
    </div>
  );
};

export default HomePage;
