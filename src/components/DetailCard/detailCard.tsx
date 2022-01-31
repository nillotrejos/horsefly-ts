import React from 'react';
import { FaClipboardList } from 'react-icons/fa';
import { MdGroup, MdTrendingUp } from 'react-icons/md';
import style from './detailCard.module.css';

interface DetailCardProps {
  region: any;
  index: any;
}

const DetailCard: React.FC<DetailCardProps> = ({ region }, index) => {

  const { avgSalary, candidatesCount, advertsCount ,cityName} = region;
  return (
    <div>
      <div className={style.card_item}>
        <div>
          <span className={style.topHeading}>{cityName}</span>
          <div className={style.cardContainer}>
            <div className={style.cardSection}>
              <MdGroup className={style.cardIcon1} />
              <span className={style.cardSpan}>{candidatesCount}</span>
            </div>
            <div className={style.sourcing}>
              <span className={style.trendingText}>0</span> 
              <MdTrendingUp className={style.trIcon1} />
              <span className={style.sourcingText}>£{avgSalary}</span>
              <MdTrendingUp className={style.trIcon2} />
              <span className={style.trendingText1}>0</span>
            </div>
            <div className={style.cardSection}>
              <FaClipboardList className={style.cardIcon2} />
              <span className={style.cardSpan}>{advertsCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
