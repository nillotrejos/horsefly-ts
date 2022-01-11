import React from 'react';
import style from './home.module.css';
import Image from 'next/image';
import Icon from '../../../public/assets/horsefly.png';
import SelectDropDown from '../../components/Dropdown/dropdown';
import { COUNTRIES, RADIUS } from '../../components/utils/MOC_DATA/mocData';
import InputField from '../../components/Input/InputField';
import Button from '../../components/Button/button';
const HomePage = () => {
  const [inputList, setInputList] = React.useState([
    { country: '', location: '', radius: '' }
  ]);

  const [country, setcountry] = React.useState('United Kingdom');
  const [location, setLocation] = React.useState('');
  const [radius, setradius] = React.useState('');
  const [isSearchActive, setisSearchActive] = React.useState(false);

  const addSearchGroup = () => {
    setisSearchActive(true);
  };
  
  const handleRemoveClick = (index: any) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  const handleAddClick = () => {
    setInputList([...inputList, { country: '', location: '', radius: '' }]);
  };
  return (
    <>
      <div className={style.topBar}>
        <Image src={Icon} width={160} height={26} />
      </div>
      <div className={style.container}>
        <div className={style.topHeadings}>
          <p className={style.headingText}> SEARCH BUILDER </p>
          <p className={style.headingText}> SAVED SEARCHES </p>
          <p className={style.headingText}> UPLOAD CVS</p>
        </div>
        <hr style={{ margin: 0, padding: 0 }} />
        <div className={style.filtersHeading}>
          <p className={style.filterText1}>New Search</p>
          <div className={style.filterTextContainer}>
            <p className={style.filterText}>Filters</p>
            <p className={style.filterText}>GBP</p>
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
                    <Button
                      className={style.discardInputBtn}
                      onClick={() => handleRemoveClick(i)}
                      title="Discard"
                    />
                  </div>
                )}
                {inputList.length - 1 === i && (
                  <Button
                    onClick={handleAddClick}
                    title="Add location"
                    className={style.btn}
                  />
                )}
              </div>
            </>
          );
        })}

        
        <div style={{ margin: 10 }}>
          <p className={style.search}>Search Group Options</p>
          <InputField
            type="text"
            placeholder="Search keyword"
            name="firstName"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={style.searchGroup}
          />
          <Button
            title="Add search group"
            onClick={addSearchGroup}
            className={isSearchActive ? style.btn1Active : style.btn1}
          />
        </div>
        <div>
          {isSearchActive ? (
            <div className={style.bottom}>
              <div className={style.bottomContainer}>
                <Button title="Discard search" className={style.discardBtn} />
                <Button title="Explore results" className={style.exploreBtn} />
              </div>
            </div>
          ) : null}
         
        </div>
      </div>
    </>
  );
};

export default HomePage;
