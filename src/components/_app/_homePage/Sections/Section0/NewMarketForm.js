/* eslint-disable */
import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';
import { API, graphqlOperation } from 'aws-amplify';

import { createMarket } from '../../../../../graphql/mutations';

import { H3 } from '../../../../reusableStyles/typography/Typography';
import Error from '../../../Error';
import { UserContext } from '../../../../../context/user-context';

const Container = styled.div`
  max-width: ${props => props.theme.screenSize.mobileL};
  margin: 0 auto;
`;

const Form = styled.form`
  margin: 2rem 0;
  & input,
  select {
    width: 100%;
    padding: 5px;
    padding-left: 10px;
    background: transparent;
    border: none;
    border-radius: 5px;
    border: 2px solid rgba(14, 30, 37, 0.15);
    font-family: Poppins, Roboto;
    font-size: 1.4rem;
    font-weight: 400;
    outline-color: ${props => props.theme.colors.secondary};
    margin-bottom: 1rem;
  }
  & option {
    &.disabled {
      opacity: 0.7;
    }
  }
`;

const Button = styled.button`
  outline: none;
  border: 2px solid black;
  padding: 4px 8px;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.colors.lightgrey};
  }
`;

const TitleContainer = styled.div`
  margin-bottom: 1rem;
`;

const tagOptions = [
  { value: 'book', label: 'Books' },
  { value: 'clothes', label: 'Clothes' },
  { value: 'online-courses', label: 'Online Courses' },
  { value: 'electronics', label: 'Electronics' },
];

export const NewMarketForm = () => {
  const user = useContext(UserContext);
  const { username } = user;

  const [error, setError] = useState('');
  const [name, setName] = useState('');

  const [selectedTag, setSelectTag] = useState('Art');
  const onSubmitHandler = async e => {
    e.preventDefault();
    try {
      const input = {
        name,
        owner: username,
        tags: [selectedTag],
      };

      // create new market API
      await API.graphql(graphqlOperation(createMarket, { input }));

      setName('');
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  return (
    <Container>
      <TitleContainer>
        <H3>New Market Form</H3>
      </TitleContainer>

      {error && <Error errorMessage={error.message} />}
      <Form onSubmit={onSubmitHandler}>
        <input
          onChange={event => setName(event.target.value)}
          placeholder="name"
          name="name"
          value={name}
          required
        />
        <label htmlFor="tags">
          Select Tag
          <select
            onChange={event => setSelectTag(event.target.value)}
            value={selectedTag}
          >
            <option className="disabled" value="none-selected">
              Select one of the following...
            </option>
            {tagOptions.map(tag => (
              <option key={tag.value} value={tag.value}>
                {tag.label}
              </option>
            ))}
          </select>
        </label>

        <Button type="submit">Submit My Info</Button>
      </Form>
    </Container>
  );
};
