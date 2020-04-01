// used as templates refer to MailChimpEmailForm1 for full use

import React, { useState } from 'react';
import styled from '@emotion/styled';

import addToMailchimp from 'gatsby-plugin-mailchimp';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  & h4,
  & p {
    margin-bottom: 1rem;
  }
  & p {
    opacity: 0.8;

    font-size: 1.5rem;
  }
  margin-bottom: 1rem;
`;

const SubContainer = styled.div`
  display: flex;
  @media (max-width: ${props => props.theme.screenSize.fourFifty}) {
    flex-direction: column;
  }
`;

const Button = styled.input`
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.3);
  border: none;
  outline: none;
  padding: 0.7rem 1.5rem;
  background-color: ${props => props.theme.colors.primaryLight};
  transition: all 0.15s ease;
  color: #fff;
  font-weight: 700;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight2};
    text-decoration: none;
  }
  &:disabled {
    cursor: not-allowed;
    color: black;
    opacity: 0.7;
    &:hover {
      background: white;
    }
  }
`;

const Input = styled.input`
  border: none;
  padding: 0.7rem 1.5rem;
  background-color: #fff;
  border: 2px solid rgba(14, 30, 37, 0.09);
  border-radius: 4px;
  box-shadow: none;
  outline-color: ${props => props.theme.colors.secondary};
  margin-right: 1rem;
  @media (max-width: ${props => props.theme.screenSize.fourFifty}) {
    margin: 0;
    margin-bottom: 1rem;
  }
`;

export const MailChimpFooter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);

  const setEmailHandler = value => {
    setError(false);
    setEmail(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(false);
    const result = await addToMailchimp(email);

    if (result.result === 'error') {
      setError(true);
      setMessage('Sorry, invalid email or already subscribed!');
    } else {
      setSuccess(true);
      setMessage('Thank you for subscribing, please check your inbox!');
      setEmail('');
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <h4>{success ? `Submission Success!` : `Subscribe To Our Newsletter`}</h4>
      <p>
        Stay up to the date with the latest in Automation and Zeitlify by
        subscribing to our newsletter
      </p>

      <SubContainer>
        <Input
          type="email"
          placeholder="Your Email"
          onChange={event => setEmailHandler(event.target.value)}
          value={email}
        />
        <Button
          disabled={success}
          onClick={handleSubmit}
          type="submit"
          value="Subscribe"
        />
      </SubContainer>
      {error && <div>{message}</div>}
      {success && <div>{message}</div>}
    </Container>
  );
};
