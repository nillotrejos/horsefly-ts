import React from 'react';
import style from './filter.module.css';

interface FilterBoxProps {
  setfilterBoxData?: any;
}
export const FilterBox: React.FC<FilterBoxProps> = ({ setfilterBoxData }) => {
  const [male, setmale] = React.useState(true);
  const [female, setfemale] = React.useState(true);
  const [yoe0, setyoe0] = React.useState(true);
  const [yoe1, setyoe1] = React.useState(true);
  const [yoe2, setyoe2] = React.useState(true);
  const [wfOnly, setwfOnly] = React.useState(false);

  React.useEffect(() => {
    const data = { male, female, yoe0, yoe1, yoe2, wfOnly };
    setfilterBoxData(data);
  }, [male, female, yoe0, yoe1, yoe2, wfOnly]);

  return (
    <div>
      <div className={style.dropMenu}>
        <h4>Gender</h4>
        <hr style={{ margin: 0, padding: 0 }} />
        <div className={style.genderContainer}>
          <label className={style.customCheck} htmlFor="male">
            <input
              type="checkbox"
              id="male"
              checked={male}
              onChange={() => setmale(!male)}
            />
            Male
          </label>
          <label className={style.customCheck} htmlFor="Female">
            <input
              type="checkbox"
              id="Female"
              checked={female}
              onChange={() => setfemale(!female)}
            />
            Female
          </label>
        </div>
        <h4>Experience</h4>
        <hr style={{ margin: 0, padding: 0 }} />

        <div className={style.genderContainer}>
          <label className={style.customCheck} htmlFor="0-3 years">
            <input
              type="checkbox"
              name="0-3"
              id="0-3 years"
              checked={yoe0}
              onChange={() => setyoe0(!yoe0)}
            />
            0-3 years
          </label>
          <label className={style.customCheck} htmlFor="4-7 years">
            <input
              type="checkbox"
              name="4-7"
              id="4-7 years"
              checked={yoe1}
              onChange={() => setyoe1(!yoe1)}
            />
            4-7 years
          </label>
          <label className={style.customCheck} htmlFor="8+ years">
            <input
              type="checkbox"
              name="8+"
              id="8+ years"
              checked={yoe2}
              onChange={() => setyoe2(!yoe2)}
            />
            8+ years
          </label>
        </div>
        <h4>Other Options</h4>
        <hr style={{ margin: 0, padding: 0 }} />

        <div className={style.genderContainer}>
          <label className={style.customCheck} htmlFor=" Workforce">
            <input
              type="checkbox"
              id=" Workforce"
              checked={wfOnly}
              onChange={() => setwfOnly(!wfOnly)}
            />
            Workforce
          </label>
        </div>
      </div>
    </div>
  );
};
