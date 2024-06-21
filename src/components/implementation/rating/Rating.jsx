import React, { useState, useEffect } from 'react';

const Rating = () => {
  const [popularity, setPopularity] = useState(0);
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
  const [isDragging, setIsDragging] = useState(false);

  const calcStarRates = () => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (popularity * 70) / 5;

    let idx = 0;
    while (starVerScore > 14) {
      tempStarRatesArr[idx] = 14;
      idx += 1;
      starVerScore -= 14;
    }
    tempStarRatesArr[idx] = starVerScore;

    return tempStarRatesArr;
  };

  useEffect(() => {
    setRatesResArr(calcStarRates());
  }, [popularity]);

  const handleInputChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 5) {
      setPopularity(value);
    }
  };

  const handleStarClick = (e, index) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPopularity = (index + clickX / rect.width) * 5 / 5;
    setPopularity(newPopularity);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e, index) => {
    if (isDragging) {
      handleStarClick(e, index);
    }
  };

  return (
    <div>
      {ratesResArr.map((rate, idx) => (
        <span 
          className='star_icon' 
          key={idx}
          onClick={(e) => handleStarClick(e, idx)}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={(e) => handleMouseMove(e, idx)}
          style={{ cursor: 'pointer' }}
        >
          <svg width={50} height={50} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 13' fill='#cacaca'>
            <clipPath id={`starClip_${idx}`}>
              <rect width={rate} height='39' />
            </clipPath>
            <path
              id={`star_${idx}`}
              d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
              transform='translate(-2 -2)'
            />
            <use clipPath={`url(#starClip_${idx})`} href={`#star_${idx}`} fill='#FFB300' />
          </svg>
        </span>
      ))}
      <br/>
      <input 
        type="number" 
        value={popularity.toFixed(1)} 
        onChange={handleInputChange} 
        min="0" 
        max="5" 
        step="0.1" 
        placeholder="Enter popularity score"
      />
      <span style={{marginLeft: 10}}>{popularity.toFixed(1)}</span><span> 점aws</span>
    </div>
  );
};

export default Rating;
