import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import activities from '../utils/Activities';
import Activity from './activity';

const Activities = (props) => {
  const { addActivities } = props;

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
          activities[0].foods.map((activityType) => {
            return (
              <Activity
                activityType={activityType}
                addActivities={addActivities}
              />
            );
          })}
        {type === 'drink' &&
          activities[1].drinks.map((drink) => {
            return (
              <ActivityButton
                type="button"
                onClick={() => addActivities(drink)}
              >
                <Icon icon={drink.icon} />
                <p>{drink.type}</p>
              </ActivityButton>
            );
          })}
        {type === 'fun' &&
          activities[2].funs.map((fun) => {
            return (
              <ActivityButton type="button" onClick={() => addActivities(fun)}>
                <Icon icon={fun.icon} />
                <p>{fun.type}</p>
              </ActivityButton>
            );
          })}
        {type === 'misc' &&
          activities[3].miscs.map((misc) => {
            return (
              <ActivityButton type="button" onClick={() => addActivities(misc)}>
                <Icon icon={misc.icon} />
                <p>{misc.type}</p>
              </ActivityButton>
            );
          })}
        {type === 'leisure' &&
          activities[4].leisures.map((leisure) => {
            return (
              <ActivityButton
                type="button"
                onClick={() => addActivities(leisure)}
              >
                <Icon icon={leisure.icon} />
                <p>{leisure.type}</p>
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

const ActivityButtonToggle = styled(ActivityButton)`
  background: ${(props) => (props.active ? 'darkred' : 'limegreen')};
`;

export default Activities;