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
  const [completeLocationData, setCompleteLocationData] = React.useState<any>([
    { country: '', location: '', radius: '', cityFound: false }
  ]);
  const [locationHandler, setLocationHandler] = React.useState<any>({
    country: '', location: '', radius: '', cityFound: false
  })
  const [searchGroups, setSearchGroups] = React.useState([{ group: '' }]); //search group in which tags will be added separately

  const [country, setcountry] = React.useState(''); ///don't know what is this
  const [currency, setCurrency] = React.useState('US Dollar'); //currency is set here
  const [isLoading, setIsLoading] = React.useState(false);

  const [allTags, setAllTags] = React.useState<any>([]);
  const [groupTitle, setgroupTitle] = React.useState([]); //tag inputValue will be added here

  const [countriesList, setCountriesList] = React.useState([]); //for countires dropdown
  const [filterCities, setFilterCities] = React.useState<any>([]); //for cities suggestion dropdown

  const [getSkills, setgetSkills] = React.useState([]); //skill suggestion dropdown

  const [filterBox, setFilterBox] = React.useState(false); //filter box is open or not
  const [filterBoxData, setfilterBoxData] = React.useState(''); //filter box data
  const [selectLocationData, setSelectLocationData] = React.useState<any>([]); //to store selected location data

  const [allTagsData, setallTagsData] = React.useState([]); //to store selected tags data
  const [resultPageData, setresultPageData] = React.useState([]); //don't know what is this
  const [selectListTag, settagsSuggestions] = React.useState<any>([]); //last selected tag is stored here
  const [tagsSuggestionList, settagsSuggestionList] = React.useState<any>([]); //suggestion tags are stored here after selecting tags
  const [isChecked, setIsChecked] = React.useState(false);
  const [cityFound, setCityFound] = React.useState(false); //it will true when city location is selected
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData.location); //userLocation



  const changeHandler = async (e: any, i: any) => {
    const { name, value } = e.target;
    setLocationHandler(
      { ...locationHandler, [name]: value }
    )
    if (name === 'country') {
      getCitiesData(value, i);
    }

    if (name === 'location' && locationHandler.country !== '') {
      let cityFound = await getCitiesData(value, i);
      console.log(cityFound, "cityFound");
    }
    // let location = { country: e, location: '', radius: '', cityFound: false };
    // getCitiesData(e, index);
    // completeLocationData[index] = location;
  }
  console.log("handler", locationHandler);

  const cityChangeHandler = async (e: any, index: number) => {
    let tempCityLocation: { country: any; location: any; radius: any, cityFound: any };
    tempCityLocation = { country: completeLocationData[index]?.country, location: e, radius: completeLocationData[index]?.radius, cityFound: completeLocationData[index]?.cityFound };
    const cityFound = await getCitiesData(e, index);
    completeLocationData[index] = { ...tempCityLocation, cityFound: cityFound[0] };
    console.log(tempCityLocation);
  }

  const radiusChangeHandler = (e: any, index: number) => {
    let tempRadiusLocation: { country: any; location: any; radius: any };
    tempRadiusLocation = { country: completeLocationData[index]?.country, location: completeLocationData[index]?.location, radius: e };
    completeLocationData[index] = tempRadiusLocation;
  }

  const locationData = (cities: any, i: number) => {
    //use to select city location  
    const countryData: any = countriesList?.find(
      (country: any) => country.code === completeLocationData[i]?.country
    );

    const subContinent = countryData.continent;
    const country = countryData.code;
    const region = cities.region || 'all';
    const city = cities.city || 0;
    const locationId = cities.locationId || 0;
    const radius = completeLocationData[i]?.radius || '';
    const data = {
      subContinent,
      country,
      region,
      city,
      locationId,
      radius
    };

    //why sending data as object of object //need to check
    setSelectLocationData([...selectLocationData, data]);
    dispatch(setCurrentUserLocation({ data }));

    //set selected location data
    // setFilterCities(null);
  };

  const getCountries = async () => {
    try {
      const response = await getContries();
      setCountriesList(response);
      setCompleteLocationData([
        { country: response[0].code, location: '', radius: '' }
      ])
    } catch (e) {
      console.log(e, "message")
    }
  };

  const getCitiesData = async (cityInputValue: any, i: number) => {
    const response = await getCities(completeLocationData[i]?.country, cityInputValue);
    setFilterCities(response);
    return response.map((city: any) => {
      let cityName = new RegExp(city.displayName, 'g')
      let city2 = cityInputValue.match(cityName)
      if (city2) {
        completeLocationData[i].cityFound = true
        return true
      }
      else {
        completeLocationData[i].cityFound = false
        return false
      }
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
    const list = [...completeLocationData];
    list.splice(index, 1);
    setCompleteLocationData(list);
  };

  //using to add locations groups
  const handleAddClick = () => {
    setCompleteLocationData([...completeLocationData, { country: countriesList[0]?.code, location: '', radius: '' }]);
  };

  const searchGroupHandler = () => {
    setSearchGroups([...searchGroups, { group: '' }]);
  };
  const searchRemoveClick = (index: any) => {
    const list = [...searchGroups];
    list.splice(index, 1);
    setSearchGroups(list);
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
                setCompleteLocationData={setCompleteLocationData}
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
              {completeLocationData?.map((value: any, i: number) => {
                return (
                  <>
                    <div key={i} className={style.selectInputContainer}>
                      <SelectDropDown
                        name="country"
                        items={countriesList}
                        className={style.dropdown}
                        handler={(e) => {
                          changeHandler(e, i);
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
                          onChange={(e) => changeHandler(e, i)}
                          className={`${style.dropdown1}`}
                          value={locationHandler.location}
                        />
                      </div>
                      <SelectDropDown
                        name="radius"
                        disable={value.cityFound ? false : true}
                        items={RADIUS}
                        className={style.dropdown2}
                        // handler={setradius}
                        handler={(e) => changeHandler(e, i)}
                        captionKey="radius"
                        title="Radius"
                        extra="mi"
                      />
                    </div>
                    <div className="btn-box">
                      {completeLocationData.length !== 1 && (
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
                      {completeLocationData.length - 1 === i && (
                        <div className={`${style.filterCitiesContainer} filterCitiesContainer`}
                        >
                          {filterCities?.length > 0 &&
                            filterCities?.map((cities: any, index: number) => {
                              return (
                                <div
                                  key={index}
                                  className={style.skillDropdown}
                                  onClick={() =>
                                    setCompleteLocationData((prev) => {
                                      const newList: any = [...prev];
                                      newList[i].location = cities.displayName;
                                      locationData(cities, i);
                                      filterCities.map(city => {
                                        let cityName = new RegExp(city.displayName, 'g')
                                        let city2 = completeLocationData[i]?.location.match(cityName)
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

                      {completeLocationData.length - 1 === i && (
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
                        value={''}
                        getSkills={getSkills}
                        setgetSkills={setgetSkills}
                        groupTitle={groupTitle}
                        setallTagsData={setallTagsData}
                        selectListTag={selectListTag}
                        settagsSuggestionList={settagsSuggestionList}
                        isChecked={isChecked}
                        allTags={allTags}
                        setAllTags={setAllTags}
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

                <div style={{ maxHeight: 200, overflow: 'scroll' }}>
                  {groupTitle && <div
                    onClick={() => { addSkills(groupTitle) }}
                    className={style.skillDropdown}>
                    <button className={style.button}>Add {groupTitle}</button>
                  </div>}
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
                <Button
                  title="Add search group"
                  disable={allTags.length < 1}
                  className={allTags.length ? style.btn1Active : style.btn1}
                  icon={<MdOutlinePlaylistAdd className={style.iconStyle} />}
                  onClick={searchGroupHandler}
                />
              </div>

              <div className={style.bottomMainContainer}>
                {allTags.length ? (
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
