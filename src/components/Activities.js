import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import activities from '../utils/Activities';

const Activities = () => {
  const [type, setType] = useState('food');

  const handleTypeView = (view) => {
    setType(view);
  };
  console.log(activities);
  return (
    <ActivitiesWrapper>
      <div>
        {activities.map((cur) => {
          return (
            <TypeButton onClick={() => handleTypeView(cur.name)} type="button">
              {cur.name}
            </TypeButton>
          );
        })}
      </div>
      <ActivitiesView>
        {type === 'food' &&
          activities[0].foods.map((food) => {
            return (
              <ActivityButton type="button">
                <Icon icon={food.icon} />
                <p>{food.foodType}</p>
              </ActivityButton>
            );
          })}

        {type === 'drink' &&
          activities[1].drinks.map((drink) => {
            return (
              <ActivityButton type="button">
                <Icon icon={drink.icon} />
                <p>{drink.drinkType}</p>
              </ActivityButton>
            );
          })}
        {type === 'fun' &&
          activities[2].funs.map((fun) => {
            return (
              <ActivityButton type="button">
                <Icon icon={fun.icon} />
                <p>{fun.funType}</p>
              </ActivityButton>
            );
          })}
        {type === 'misc' &&
          activities[3].miscs.map((misc) => {
            return (
              <ActivityButton type="button">
                <Icon icon={misc.icon} />
                <p>{misc.miscType}</p>
              </ActivityButton>
            );
          })}
        {type === 'leisure' &&
          activities[4].leisures.map((leisure) => {
            return (
              <ActivityButton type="button">
                <Icon icon={leisure.icon} />
                <p>{leisure.leisureType}</p>
              </ActivityButton>
            );
          })}
      </ActivitiesView>
    </ActivitiesWrapper>
  );
};

const ActivitiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  align-items: center;
  margin: 0 auto;
`;

const ActivitiesView = styled.div`
  margin-left: 15px;
`;

const TypeButton = styled.button`
  width: 62px;
  height: 16px;
  background: #c4c4c4;
  border-radius: 2px;
  margin-right: 9px;
  align-items: center;
  font-family: Muli;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  margin-top: 50px;
`;

const ActivityButton = styled.button`
  padding: 5px;
  width: 70px;
  border: none;
  background: none;
  margin-right: 3px;
  margin-top: 27px;
`;

export default Activities;
