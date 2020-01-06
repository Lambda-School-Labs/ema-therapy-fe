import React, { useState } from 'react';
import { Icon, Input } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useParams, useHistory } from 'react-router-dom';
import request from 'superagent';
import styled from 'styled-components';
import NotFound from '../../containers/NotFound/404';
import styles from '../../styles/theme';
import { useAuth } from '../../utils/dataStore';
import UploadPic from './UploadPic';
import Button from '../Button';
import TaskComplete from './TaskComplete';
import { checkForUserAndGetMoodsQuery } from '../../queries';

const { TextArea } = Input;

const ADD_TASK = gql`
  mutation(
    $userEmail: String!
    $prompt: String!
    $text: String
    $photoUrl: String
  ) {
    addTask(
      userEmail: $userEmail
      prompt: $prompt
      text: $text
      photoUrl: $photoUrl
    ) {
      completedAt
      prompt
      text
      photoUrl
    }
  }
`;

function Task() {
  const { user } = useAuth();
  const history = useHistory();
  const { task } = useParams();

  const [text, setText] = useState();
  const [taskComplete, setTaskComplete] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [addTask] = useMutation(ADD_TASK);

  const handleChange = (e) => setText(e.target.value);

  let prompt;

  const getPrompt = () => {
    if (task === '1') {
      prompt = 'task 1';
    } else if (task === '2') {
      prompt = 'task 2';
    } else if (task === '3') {
      prompt = 'task 3';
    } else if (task === '4') {
      prompt = 'task 4';
    } else if (task === '5') {
      prompt = 'task 5';
    } else if (task === '6') {
      prompt = 'task 6';
    } else if (task === '7') {
      prompt = 'task 7';
    }
    return prompt;
  };

  const handleSubmit = async () => {
    await addTask({
      variables: {
        userEmail: user.email,
        prompt: getPrompt(),
        text,
        photoUrl,
      },
      refetchQueries: [
        {
          query: checkForUserAndGetMoodsQuery,
          variables: { email: user.email },
        },
      ],
      awaitRefetchQueries: true,
    });
    setTaskComplete(true);
  };

  const upload = (file) => {
    const cloudName = 'moodbloom';
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_KEY;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    request
      .post(url)
      .field('upload_preset', uploadPreset)
      .field('file', file)
      .field('multiple', false)
      // .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
      // .field('context', title ? `photo=${title}` : '')
      // .on('progress', (progress) => onPhotoUploadProgress(photoId, file.name, progress))
      // .end((error, response) => {
      //     onPhotoUploaded(photoId, fileName, response);
      // });
      .on('progress', (progress) => console.log(progress))
      .end((error, response) => {
        console.log(error, response);
        // set local state to response.body.secure_url for when we submit form to our database
        setPhotoUrl(response.body.secure_url);
      });
  };

  if (!(task >= 1 && task <= 7)) return <NotFound />;
  return taskComplete ? (
    <TaskComplete />
  ) : (
    <TaskWrapper>
      <Header>
        <Icon
          type="left"
          style={{ fontSize: 22, color: '#9cd9dd' }}
          onClick={() => history.goBack()}
        />
        <Title>Daily Task {task}</Title>
      </Header>

      <main>
        <StyledPrompt>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          hendrerit condimentum nisi, at convallis sapien pellentesque quis.
        </StyledPrompt>

        <TextArea
          name="text"
          value={text}
          style={{
            fontSize: 16,
            height: '200px',
            color: '#658883',
            borderRadius: '10',
            padding: '35px 30px',
            background: '#ffffff',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
            resize: 'none',
          }}
          onChange={handleChange}
          placeholder="Write your thoughts here..."
        />
      </main>
      <PicturesWrapper>
        <UploadPic upload={upload} />
      </PicturesWrapper>
      <ButtonWrapper>
        <Button onClick={handleSubmit}>Done</Button>
      </ButtonWrapper>
    </TaskWrapper>
  );
}

export default Task;

const TaskWrapper = styled.div`
  background-color: ${styles.seafoamGreen};
  height: 100%;
  padding: 30px 25px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  color: ${styles.tealGreen};
  font-size: 24px;
  margin: 0;
  margin: 0 20px;
`;

const StyledPrompt = styled.p`
  color: ${styles.tealGreen};
  margin-bottom: 24px;
`;

const ButtonWrapper = styled.div`
  align-self: center;
`;

const PicturesWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
