import React from 'react';
import { FaClipboardList } from 'react-icons/fa';
import { MdGroup, MdTrendingUp } from 'react-icons/md';
import style from './detailCard.module.css';

const DetailCard = () => {
  return (
    <div>
      <div className={style.card_item}>
        <div>
          <span className={style.topHeading}>East Midland</span>
          <div className={style.cardContainer}>
            <div className={style.cardSection}>
              <MdGroup className={style.cardIcon1} />
              <span className={style.cardSpan}>249</span>
            </div>
            <div>
              <span className={style.trendingText}>17</span>
              <MdTrendingUp className={style.trIcon1} />
              <span className={style.sourcingText}>£30,114</span>
              <MdTrendingUp className={style.trIcon2} />
              <span className={style.trendingText1}>34</span>
            </div>
            <div className={style.cardSection}>
              <FaClipboardList className={style.cardIcon2} />
              <span className={style.cardSpan}>249</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
