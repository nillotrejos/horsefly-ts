import React from 'react';
import style from './home.module.css';
import Image from 'next/image';
import Switch from 'react-switch';
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
  MdTune
} from 'react-icons/md';
import { VscDiscard } from 'react-icons/vsc';
import { FilterBox } from '../../components/FilterBox/filterBox';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import {
  setCurrentUserLocation,
  resultData
} from '../../features/homepageSlice';

const HomePage = () => {
  const [allData, setallData] = React.useState([{}]);
  const [inputList, setInputList] = React.useState([
    { country: '', location: '', radius: '' }
  ]);

  const [searchGroups, setSearchGroups] = React.useState([{ group: '' }]);
  const [country, setcountry] = React.useState('');
  const [radius, setradius] = React.useState('5');
  const [tags, setTags] = React.useState<any>([]);
  const [currency, setCurrency] = React.useState('US Dollar');
  const [isLoading, setIsLoading] = React.useState(false);
  const [count, setcount] = React.useState([]);
  const [groupTitle, setgroupTitle] = React.useState([]);
  const [allCountries, setAllCountries] = React.useState([]);
  const [filterCities, setFilterCities] = React.useState<any>([]);
  const [getSkills, setgetSkills] = React.useState([]);
  const [filterBox, setFilterBox] = React.useState(false);
  const [filterBoxData, setfilterBoxData] = React.useState('');
  const [selectLocationData, setSelectLocationData] = React.useState<any>([]);
  const [allTagsData, setallTagsData] = React.useState([]);
  const [resultPageData, setresultPageData] = React.useState([]);
  const [selectListTag, settagsSuggestions] = React.useState<any>([]);
  const [tagsSuggestionList, settagsSuggestionList] = React.useState<any>([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [cityFound, setCityFound] = React.useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData.location);

  const locationData = (cities: any, i: number) => {
    const countryData: any = allCountries?.find(
      (country: any) => country.code === inputList[i]?.country
    );

    const subContinent = countryData.continent;
    const country = countryData.code;
    const region = cities.region || 'all';
    const city = cities.city || 0;
    const locationId = cities.locationId || 0;
    const radius = inputList[i]?.radius || '';

    const data = {
      subContinent,
      country,
      region,
      city,
      locationId,
      radius
    };
    dispatch(setCurrentUserLocation({ data }));
    setSelectLocationData([...selectLocationData, data]);
    // setFilterCities(null);
  };

  const getCountries = async () => {
    try {
      const response = await getContries();
      setAllCountries(response);
      // console.log('response -->',response[0].code)
      setInputList([
        { country: response[0].code, location: '', radius: '' }
      ])
    } catch (e) {
      console.log(e, "message")
    }
  };

  const getCitiesData = async (location: any, i: number) => {
    const response = await getCities(inputList[i]?.country, location);
    setFilterCities(response);
    response.map(city => {
      let cityName = new RegExp(city.displayName, 'g')
      let city2 = inputList[i]?.location.match(cityName)
      if (city2) setCityFound(true)
      else setCityFound(false)
    })
  };

  const getSkillsData = async () => {
    if (groupTitle?.length > 0) {
      const response = await getTags(groupTitle);
      setgetSkills(response);
    }
    return null;
  };

  React.useEffect(() => {
    getSkillsData();
  }, [groupTitle]);

  React.useEffect(() => {
    getCountries();
  }, []);

  const addSkills = (skill: any) => {
    settagsSuggestions(skill);
  };
  const switchHanler = () => {
    setIsChecked(!isChecked);
  };

  const exploreResult = async () => {
    setIsLoading(true);

    const res = await demand(
      selectLocationData,
      filterBoxData,
      allTagsData,
      country,
      currency
    );
    setresultPageData(res);
    dispatch(resultData({ res }));
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

  if (typeof window === 'object') {
    let doc = document.querySelector('body')
    let container = document.querySelector('#filterBox')
    let citiesInput = document.querySelector('#citiesInput')
    let citiesContainer = document.querySelector('.filterCitiesContainer')
    doc?.addEventListener('click', (e) => {
      if (e.target !== container) {
        setFilterBox(false)
      }

      let display = style.displayNone
      if (e.target === citiesInput) {
        citiesContainer?.classList.remove(display)
      } else {
        citiesContainer?.classList.add(display)
      }
    })
  }

  return (
    <div className={style.top}>
      <div className={style.topBar}>
        <Image src={Icon} width={160} height={26} />
      </div>

      <div className={style.header}>
        {isLoading ? (
          <>
            <div style={{ width: '100%' }}>
              <ResultPage
                setIsLoading={setIsLoading}
                resultPageData={resultPageData}
                selectLocationData={selectLocationData}
                setInputList={setInputList}
                settagsSuggestions={settagsSuggestions}
                setresultPageData={setresultPageData}
              />
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
                    <button id="filterBox" onClick={() => setFilterBox(!filterBox)}>
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
                <FilterBox
                  setfilterBoxData={setfilterBoxData} />
              ) : null}
              {inputList?.map((value, i) => {
                return (
                  <>
                    <div key={i} className={style.selectInputContainer}>
                      <SelectDropDown
                        items={allCountries}
                        className={style.dropdown}
                        handler={(e) => {
                          setInputList([
                            { country: e, location: '', radius: '' }
                          ])
                          getCitiesData(e)
                        }
                        }
                        title={value.country}
                      />
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                        }}
                      >
                        <InputField
                          type="text"
                          placeholder="Location"
                          name="location"
                          onChange={(e) =>
                            setInputList((prev) => {
                              const newList: any = [...prev];
                              newList[i].location = e.target.value;
                              getCitiesData(e.target.value, i);
                              return newList;
                            })
                          }
                          className={`${style.dropdown1}`}
                          value={value.location}
                        />
                      </div>


                      <SelectDropDown
                        disable={cityFound ? false : true}
                        items={RADIUS}
                        className={style.dropdown2}
                        // handler={setradius}
                        handler={(e) =>
                          setInputList((prev) => {
                            const newList: any = [...prev];
                            newList[i].radius = e;
                            return newList;
                          })
                        }
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
                            justifyContent: 'flex-end',
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
                        <div className={`${style.filterCitiesContainer} filterCitiesContainer`}
                        >
                          {filterCities?.length > 0 &&
                            filterCities?.map((cities: any, index: number) => {
                              return (
                                <div
                                  key={index}
                                  className={style.skillDropdown}
                                  onClick={() =>
                                    setInputList((prev) => {
                                      const newList: any = [...prev];
                                      newList[i].location = cities.displayName;
                                      locationData(cities, i);
                                      filterCities.map(city => {
                                        let cityName = new RegExp(city.displayName, 'g')
                                        let city2 = inputList[i]?.location.match(cityName)
                                        if (city2) setCityFound(true)
                                      })
                                      return newList;
                                    })
                                  }

                                >
                                  <button className={style.locationButton}>
                                    {cities?.displayName}
                                  </button>
                                </div>
                              );
                            })}
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
                {searchGroups.map((val, index) => {
                  return (
                    <div key={index}>
                      {searchGroups.length > 1 && index !== 0 && (
                        <div
                        className={style.searchInputSection}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <p className={style.search}>Search Group Options</p>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginRight: 50
                            }}
                          >
                            <span style={{ fontSize: 13, margin: 5 }}>
                              Include terms
                            </span>
                            <Switch
                              onChange={switchHanler}
                              checked={isChecked}
                              offColor="#4584c4"
                              uncheckedIcon={false}
                              checkedIcon={false}
                              className={style.switch1}
                              onColor="#E85153"
                              boxShadow="none"
                              activeBoxShadow="none"
                              height={20}
                              />
                            <p style={{ fontSize: 13 }}>
                              Exclude Exclude terms
                            </p>
                          </div>
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

                      <Tags
                        setgroupTitle={setgroupTitle}
                        setcount={setcount}
                        selectedTags={selectedTags}
                        value={''}
                        getSkills={getSkills}
                        setgetSkills={setgetSkills}
                        groupTitle={groupTitle}
                        setallTagsData={setallTagsData}
                        selectListTag={selectListTag}
                        tagsSuggestionList={tagsSuggestionList}
                        settagsSuggestionList={settagsSuggestionList}
                        isChecked={isChecked}
                        />
                    </div>
                  );
                })}
                {tagsSuggestionList?.length && !getSkills?.length ? (
                  <div style={{ zIndex: 0 }}>
                    {tagsSuggestionList?.map((skill: any, index: any) => {
                      return (
                        <button
                          key={index}
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
                  <div style={{ maxHeight: 200, overflow: 'scroll' }}>
                    {groupTitle?.length &&
                      getSkills?.map((skill: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className={style.skillDropdown}
                            onClick={() => addSkills(skill)}
                          >
                            <button className={style.button}>
                              {skill?.keyword}
                            </button>
                          </div>
                        );
                      })}
                  </div>
                ) : null}
                <Button
                  title="Add search group"
                  disable={count.length < 1}
                  className={count.length ? style.btn1Active : style.btn1}
                  icon={<MdOutlinePlaylistAdd className={style.iconStyle} />}
                  onClick={searchGroupHandler}
                />
              </div>

              <div className={style.bottomMainContainer}>
                {count.length ? (
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
