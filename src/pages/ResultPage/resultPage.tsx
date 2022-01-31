import React from 'react';
import style from './result.module.css';
import { FaChevronCircleLeft, FaClipboardList } from 'react-icons/fa';
import { MdGroup, MdTrendingUp } from 'react-icons/md';
import Switch from 'react-switch';
import DetailCard from '../../components/DetailCard/detailCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface ResultPageProps {
  setIsLoading: any;
  resultPageData: any;
  selectLocationData: any;
  setInputList:any
  settagsSuggestions:any
  setresultPageData:any
}
const ResultPage: React.FC<ResultPageProps> = ({
  setIsLoading,
  resultPageData,
  selectLocationData,
  setInputList,
  settagsSuggestions,
  setresultPageData
}) => {
  const [loading, setLoading] = React.useState(true);
  const [isChecked, setIsChecked] = React.useState(false);
  const resultData = useSelector(
    (state: RootState) => state.userData.resultData
  );

  const { totalCandidatesCount, totalAdvertsCount, totalAvgSalary, regions,totalMaxSalary,totalMinSalary } =
    resultPageData;

    // console.log(totalAdvertsCount.toString().slice(0,3),'jhjhjhjh');
  const switchHanler = () => {
    setIsChecked(!isChecked);
  };

  const toggler = () => {
    setIsLoading(setIsLoading(true));
    setInputList([{ country: '', location: '', radius: '' }])
    settagsSuggestions([])
    setresultPageData([])
    
  };
  React.useEffect(() => {
    resultPageData.locationCount ? setLoading(false) : null;
  }, [resultPageData]);

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
              <span className={style.TopHeading2}>
                {' '}
                {selectLocationData[0].city}
              </span>
            </div>
          </div>
          <div style={{flexGrow:1}}></div>
        </div>
        <div className={style.secondSection}>
          <div className={style.headertopContainer}>
            <span className={style.span1}>{totalCandidatesCount || 0}</span>
            <MdGroup className={style.icon} />
            <span className={style.span2}>SEE TALENT INSIGHTS</span>
          </div>
          <div style={{ width: '50%' }}>
            <div className={style.sourcing}>
              <span className={style.trendingText}>{totalMinSalary || 0}</span>
              <MdTrendingUp className={style.trIcon1} />
              <span className={style.sourcingText}>£{totalAvgSalary || 0}</span>
              <MdTrendingUp className={style.trIcon2} />
              <span className={style.trendingText1}>{totalMaxSalary || 0}</span>
            </div>
            <div></div>
            <div style={{ textAlign: 'center' }}>
              <span className={style.span2}>AVERAGE SALARY</span>
            </div>
          </div>
          <div className={style.headertopContainer1}>
            <span className={style.span3}>{totalAdvertsCount || 0}</span>
            <FaClipboardList className={style.icon1} />
            <span className={style.span2}>SEE ADVERTS</span>
          </div>
        </div>
        <div>
          <div className={style.switchContainer}>
            <div />
            <div className={style.switchSection}>
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
              <span className={style.span4}>Daily Rate</span>
            </div>
            <span className={style.span4}>Search Options</span>
          </div>
        </div>
        <div className={style.regions}>
          {Object.values(regions).length ? (
            Object.values(regions)?.map((region, index) => {
              return <DetailCard region={region} index={index} />;
            })
          ) : (
            <div className={style.regionMessage}>
              <p>
                No matching results! Please contact us using the chat box on the
                bottom right if you need our help!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
