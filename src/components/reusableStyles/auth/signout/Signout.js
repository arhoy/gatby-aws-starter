import React from 'react';
import styled from '@emotion/styled';
import { Auth } from 'aws-amplify';
import { navigate } from '@reach/router';

const Button = styled.button`
  outline: none;
  border: none;
  padding: 3px 5px;
  cursor: pointer;
  color: ${props => props.theme.colors.black};
  background: ${props => props.theme.colors.white};
  border-radius: 3px;
  font-size: 1.3rem;
  &:hover {
    background: ${props => props.theme.colors.primaryLight};
    color: ${props => props.theme.colors.white};
  }
`;

export const Signout = () => {
  const signoutHandler = async () => {
    navigate('/');
    try {
      await Auth.signOut();
    } catch (error) {
      console.error('Not Able to sign user out', error);
    }
  };
  return <Button onClick={signoutHandler}> Sign Out</Button>;
};
