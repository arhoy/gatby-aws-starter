import React from 'react';
import styled from '@emotion/styled';

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
  margin-right: 0.7rem;
  &:hover {
    background: ${props => props.theme.colors.lightgrey};
  }
`;

export const MarketSearch = ({
  searchTerm,
  searchTermHandler,
  submitSearchHandler,
  clearSearchHandler,
}) => {
  return (
    <Container>
      <Form onSubmit={submitSearchHandler}>
        <input
          onChange={searchTermHandler}
          placeholder="Search"
          name="search"
          value={searchTerm}
          required
        />

        <Button type="submit">Search</Button>
        <Button onClick={clearSearchHandler} type="button">
          Clear
        </Button>
      </Form>
    </Container>
  );
};
