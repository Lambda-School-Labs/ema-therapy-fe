/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from 'react';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import PieLegend from './PieLegend';

const MoodPie = ({ totalMoods, arrayOfDays }) => {
  const findMoodPercent = (moodData) => {
    const moodArray = [0, 0, 0, 0, 0];
    moodData.map((entry) => {
      switch (entry.mood) {
        case 'happy':
          moodArray[0] += 1;
          break;
        case 'fine':
          moodArray[1] += 1;
          break;
        case 'normal':
          moodArray[2] += 1;
          break;
        case 'sad':
          moodArray[3] += 1;
          break;
        case 'unhappy':
          moodArray[4] += 1;
          break;

        default:
          return 1;
      }
    });
    return moodArray;
  };
  const totalMoodPercent = findMoodPercent(arrayOfDays);

  const moodsPercentageArray = [];
  totalMoods.map((item) => {
    moodsPercentageArray.push(item.percent);
    return moodsPercentageArray;
  });

  const data = {
    labels: ['happy', 'fine', 'normal', 'sad', 'unhappy'],
    datasets: [
      {
        data: moodsPercentageArray,
        backgroundColor: [
          '#00917A',
          '#53BBC9',
          '#FCD783',
          '#F2812E',
          '#F47979',
        ],
        hoverBackgroundColor: [
          '#00917A',
          '#53BBC9',
          '#FCD783',
          '#F2812E',
          '#F47979',
        ],
      },
    ],
  };
  const options = {
    cutoutPercentage: 90,
    legend: {
      display: false,
      position: 'bottom',
      labels: {
        fontColor: '#333',
        usePointStyle: true,
      },
    },
  };

  return (
    <div>
      <h2>Frequent Moods</h2>
      <Pie data={data} options={options} />
      <PieLegend totalMoods={totalMoods} />
    </div>
  );
};

MoodPie.propTypes = {
  arrayOfDays: PropTypes.arrayOf(
    PropTypes.shape({
      mood: PropTypes.string,
      anxietyLevel: PropTypes.number,
      sleep: PropTypes.number,
      createdAt: PropTypes.string,
    }),
  ).isRequired,
};

export default MoodPie;
