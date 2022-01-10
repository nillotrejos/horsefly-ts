import React from 'react';
import style from './home.module.css';
import Image from 'next/image';
import Icon from '../../../public/assets/horsefly.png';
import SelectDropDown from '../../components/Dropdown/dropdown';
import { COUNTRIES ,RADIUS} from '../../components/utils/MOC_DATA/mocData';
import InputField from '../../components/Input/InputField';
const HomePage = () => {
  const [country, setcountry] = React.useState("United Kingdom");
  const [location, setLocation] = React.useState('');
  const [radius, setradius] = React.useState('');
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
        <hr />
        <div className={style.filtersHeading}>
          <p className={style.filterText1}>New Search</p>
          <div className={style.filterTextContainer}>
            <p className={style.filterText}>Filters</p>
            <p className={style.filterText}>GBP</p>
          </div>
        </div>
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
            title='radius'
           
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
