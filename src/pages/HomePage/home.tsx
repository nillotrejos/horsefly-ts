import React from 'react';
import style from './home.module.css';
import Image from 'next/image';
import Icon from '../../../public/assets/horsefly.png';
import SelectDropDown from '../../components/Dropdown/dropdown';
import { CURRENCY, RADIUS } from '../../components/utils/MOC_DATA/mocData';
import InputField from '../../components/Input/InputField';
import Button from '../../components/Button/button';
import Tags from '../../components/Tags/tags';
import { Mapbox } from '../Map/map';
import ResultPage from '../ResultPage/resultPage';
import { getContries, getCities, getTags, demand } from '../../Api/api';
import {
  MdAddLocation,
  MdOutlinePlaylistAdd,
  MdDonutLarge,
  MdDoNotDisturbOn,
  MdTune,
  MdKeyboardArrowDown
} from 'react-icons/md';
import { VscDiscard } from 'react-icons/vsc';
import { FilterBox } from '../../components/FilterBox/filterBox';

const HomePage = () => {
  const [allData, setallData] = React.useState([{}]);
  const [inputList, setInputList] = React.useState([
    { country: '', location: '', radius: '' }
  ]);
  const [searchGroups, setSearchGroups] = React.useState([{ group: '' }]);
  const [country, setcountry] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [radius, setradius] = React.useState('');
  const [tags, setTags] = React.useState<any>([]);
  const [currency, setCurrency] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [count, setcount] = React.useState([]);
  const [groupTitle, setgroupTitle] = React.useState([]);
  const [allCountries, setAllCountries] = React.useState(['uk']);
  const [filterCities, setFilterCities] = React.useState([]);
  const [getSkills, setgetSkills] = React.useState([]);
  const [filterBox, setFilterBox] = React.useState(false);
  const [filterBoxData, setfilterBoxData] = React.useState('');
  const [selectLocationData, setSelectLocationData] = React.useState('');
  const [allTagsData, setallTagsData] = React.useState([]);
  const [resultPageData, setresultPageData] = React.useState([]);
  console.log(currency, 'currency');
  const locationData = (cities: any) => {
    setLocation(cities?.displayName);
    setSelectLocationData(cities);
    setFilterCities(null);
  };
  const getCountries = async () => {
    const response = await getContries();
    setAllCountries(response);
  };
  const getCitiesData = async () => {
    const response = await getCities(country, location);
    setFilterCities(response);
  };
  const getSkillsData = async () => {
    if (groupTitle?.length > 2) {
      const response = await getTags(groupTitle);
      setgetSkills(response);
    }
    return null;
  };

  React.useEffect(() => {
    getCitiesData();
  }, [location.length]);

  React.useEffect(() => {
    getSkillsData();
  }, [groupTitle]);

  React.useEffect(() => {
    getCountries();
  }, []);

  const exploreResult = async () => {
    setIsLoading(true);
    const exploreData = {
      selectLocationData,
      filterBoxData,
      allTagsData,
      allData,
      country
    };
    console.log(exploreData, 'exploreData');
    const res = await demand(
      selectLocationData,
      filterBoxData,
      allTagsData,
      country,
      currency
    );
    setresultPageData(res)
    console.log(res,"ressss===>>>>");
  };

  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { country: '', location: '', radius: '' }]);
    const data = {
      country,
      selectLocationData,
      radius
    };
    setallData((prevData) => [...prevData, data]);
  };

  const searchGroupHandler = () => {
    setSearchGroups([...searchGroups, { group: '' }]);
  };
  const searchRemoveClick = (index: any) => {
    const list = [...searchGroups];
    list.splice(index, 1);
    setSearchGroups(list);
  };
  const selectedTags = (tags: any) => {
    setTags((prevTags: any) => [...prevTags, tags]);
  };
  return (
    <div className={style.top} style={{}}>
      <div className={style.topBar}>
        <Image src={Icon} width={160} height={26} />
      </div>

      <div className={style.header}>
        {isLoading ? (
          <>
            <div style={{ width: '100%' }}>
              <ResultPage setIsLoading={setIsLoading} resultPageData={resultPageData} />
            </div>
          </>
        ) : (
          <div>
            <div className={style.topHeadings}>
              <p className={style.headingText}> SEARCH BUILDER </p>
              <p className={style.headingText}> SAVED SEARCHES </p>
              <p className={style.headingText}> UPLOAD CVS</p>
            </div>
            <hr style={{ margin: 0, padding: 0, width: 640 }} />

            <div className={style.container}>
              <div className={style.filtersHeading}>
                <p className={style.filterText1}>New Search</p>
                <div className={style.filterTextContainer}>
                  <div className={style.filterText}>
                    <MdTune />
                    <button onClick={() => setFilterBox(!filterBox)}>
                      Filters
                    </button>
                  </div>
                  <div className={style.filterText}>
                    <SelectDropDown
                      items={CURRENCY}
                      className={style.currencyDropdown}
                      handler={setCurrency}
                      title={currency}
                    />
                  </div>
                </div>
              </div>
              {filterBox ? (
                <FilterBox setfilterBoxData={setfilterBoxData} />
              ) : null}
              {inputList?.map((value, i) => {
                return (
                  <>
                    <div key={i} className={style.selectInputContainer}>
                      <SelectDropDown
                        items={allCountries}
                        className={style.dropdown}
                        handler={setcountry}
                        title={country}
                      />
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative'
                        }}
                      >
                        <InputField
                          type="text"
                          placeholder="Location"
                          name="location"
                          onChange={(e) => setLocation(e.target.value)}
                          className={style.dropdown1}
                          value={location}
                        />
                        <div className={style.filterCitiesContainer}>
                          {filterCities?.length > 1 &&
                            location.length > 1 &&
                            filterCities?.map((cities, index) => {
                              return (
                                <div
                                  key={index}
                                  className={style.skillDropdown}
                                >
                                  <button
                                    className={style.locationButton}
                                    onClick={() => locationData(cities)}
                                  >
                                    {cities?.displayName}
                                  </button>
                                </div>
                              );
                            })}
                        </div>
                      </div>

                      <SelectDropDown
                        items={RADIUS}
                        className={style.dropdown2}
                        handler={setradius}
                        captionKey="radius"
                        title="Radius"
                        extra="mi"
                      />
                    </div>
                    <div className="btn-box">
                      {inputList.length !== 1 && (
                        <div
                          className={style.discardBtnContainer}
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
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
                {searchGroups.map((index) => {
                  return (
                    <div key={index}>
                      <Tags
                        setgroupTitle={setgroupTitle}
                        setcount={setcount}
                        selectedTags={selectedTags}
                        value={''}
                        getSkills={getSkills}
                        setgetSkills={setgetSkills}
                        groupTitle={groupTitle}
                        setallTagsData={setallTagsData}
                      />
                      {searchGroups.length > 1 && (
                        <div
                          className={style.searchInputSection}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <p className={style.search}>Search Group Options</p>

                          <div
                            className={style.discardIconBtn}
                            onClick={() => searchRemoveClick(index)}
                          >
                            <MdDoNotDisturbOn />
                            <Button
                              className={style.discardInputBtn}
                              title="Discard"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                <Button
                  title="Add search group"
                  disable={count.length < 1}
                  className={count.length ? style.btn1Active : style.btn1}
                  icon={<MdOutlinePlaylistAdd className={style.iconStyle} />}
                  onClick={searchGroupHandler}
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
                        onClick={exploreResult}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
        <div className={style.mapContainer}>
          <Mapbox />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
