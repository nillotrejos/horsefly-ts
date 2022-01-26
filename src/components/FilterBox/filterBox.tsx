import React from 'react';
import style from './filter.module.css';

interface FilterBoxProps {
  setfilterBoxData?: any;
}
export const FilterBox: React.FC<FilterBoxProps> = ({ setfilterBoxData }) => {
  const [maleCheckBox, setmale] = React.useState(true);
  const [femaleCheckBox, setfemale] = React.useState(true);
  const [yoe0CheckBox, setyoe0] = React.useState(true);
  const [yoe1CheckBox, setyoe1] = React.useState(true);
  const [yoe2CheckBox, setyoe2] = React.useState(true);
  const [wfOnlyCheckBox, setwfOnly] = React.useState(false);

  React.useEffect(() => {
    const male = maleCheckBox ? 1 : 0;
    const female = femaleCheckBox ? 1 : 0;
    const yoe0 = yoe0CheckBox ? 1 : 0;
    const yoe1 = yoe1CheckBox ? 1 : 0;
    const yoe2 = yoe2CheckBox ? 1 : 0;
    const wfOnly = wfOnlyCheckBox ? 1 : 0;
    const data = { male, female, yoe0, yoe1, yoe2, wfOnly };

    setfilterBoxData(data);
  }, [
    maleCheckBox,
    femaleCheckBox,
    yoe0CheckBox,
    yoe1CheckBox,
    yoe2CheckBox,
    wfOnlyCheckBox
  ]);

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
              checked={maleCheckBox}
              onChange={() => setmale(!maleCheckBox)}
            />
            Male
          </label>
          <label className={style.customCheck} htmlFor="Female">
            <input
              type="checkbox"
              id="Female"
              checked={femaleCheckBox}
              onChange={() => setfemale(!femaleCheckBox)}
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
              checked={yoe0CheckBox}
              onChange={() => setyoe0(!yoe0CheckBox)}
            />
            0-3 years
          </label>
          <label className={style.customCheck} htmlFor="4-7 years">
            <input
              type="checkbox"
              name="4-7"
              id="4-7 years"
              checked={yoe1CheckBox}
              onChange={() => setyoe1(!yoe1CheckBox)}
            />
            4-7 years
          </label>
          <label className={style.customCheck} htmlFor="8+ years">
            <input
              type="checkbox"
              name="8+"
              id="8+ years"
              checked={yoe2CheckBox}
              onChange={() => setyoe2(!yoe2CheckBox)}
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
              checked={wfOnlyCheckBox}
              onChange={() => setwfOnly(!wfOnlyCheckBox)}
            />
            Workforce
          </label>
        </div>
      </div>
    </div>
  );
};
