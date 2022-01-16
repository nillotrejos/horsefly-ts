import React from 'react';
import style from './result.module.css';
import { FaChevronCircleLeft, FaClipboardList } from 'react-icons/fa';
import { MdGroup, MdTrendingUp } from 'react-icons/md';
import Switch from 'react-switch';

interface ResultPageProps {
  setIsLoading: any;
}
const ResultPage: React.FC<ResultPageProps> = ({ setIsLoading }) => {
  const [loading, setLoading] = React.useState(true);
  const [isChecked, setIsChecked] = React.useState(false);

  const switchHanler = () => {
    setIsChecked(!isChecked);
  };

  const toggler = () => {
    setIsLoading(setIsLoading(true));
  };
  React.useEffect(() => {
    console.log('chl 1');
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <img
          style={{ width: 650 }}
          src="https://i.pinimg.com/originals/ae/51/e1/ae51e1395e87cc72c6021df5445cc5f8.gif"
          alt=""
        />
      </div>
    );
  }
  return (
    <div>
      <div className={style.resultHeader}>
        <div className={style.topSection}>
          <div className={style.topSectionContainer}>
            <button style={{ border: 'none' }} onClick={toggler}>
              <FaChevronCircleLeft style={{ fontSize: 30 }} />
            </button>
          </div>
          <div className={style.topSectionText}>
            <div className={style.header}>
              <span className={style.TopHeading1}>SHOWING RESULTS FOR</span>
              <span className={style.TopHeading2}>United Kingdom</span>
            </div>
          </div>
        </div>
        <div className={style.secondSection}>
          <div className={style.headertopContainer}>
            <span className={style.span1}>1,833</span>
            <MdGroup className={style.icon} />
            <span className={style.span2}>SEE TALENT INSIGHTS</span>
          </div>
          <div style={{ width: '50%' }}>
            <div className={style.sourcing}>
              <span className={style.trendingText}>17</span>
              <MdTrendingUp className={style.trIcon1} />
              <span className={style.sourcingText}>£30,114</span>
              <MdTrendingUp className={style.trIcon2} />
              <span className={style.trendingText1}>34</span>
            </div>
            <div></div>
            <div style={{ textAlign: 'center' }}>
              <span className={style.span2}>AVERAGE SALARY</span>
            </div>
          </div>
          <div className={style.headertopContainer1}>
            <span className={style.span3}>1,833</span>
            <FaClipboardList className={style.icon1} />
            <span className={style.span2}>SEE ADVERTS</span>
          </div>
        </div>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              
            }}
          >
            <div />
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"40%",marginLeft:90}}>
              <span className={style.span4}>Annual Salary</span>
            
              <Switch
                onChange={switchHanler}
                checked={isChecked}
                offColor="#4A9258"
                uncheckedIcon={false}
                checkedIcon={false}
                className={style.switch}
                boxShadow="none"
                activeBoxShadow="none"
                height={20}
                
              />
              <span  className={style.span4}>Daily Rate</span>
            </div>
            <span  className={style.span4}>Search Options</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
