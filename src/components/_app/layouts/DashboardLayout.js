import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { Section } from '../../reusableStyles/sections/Sections';
import { UserContext } from '../../../context/user-context';
import { Link } from '@reach/router';

const Header = styled.div`
  background: ${props => props.theme.colors.lightgrey};
  padding: 1rem 2rem;
  & p {
    opacity: 0.9;
  }
  & span {
    font-weight: 700;
    opacity: 1;
  }
`;

const StyledSection = styled(Section)`
  margin: 0;
  padding: 0;
`;

const NavLinksContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  max-width: 30rem;
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.black};
  margin-right: 8px;
  font-size: 1.5rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const DashboardLayout = ({ children }) => {
  const user = useContext(UserContext);

  const { username } = user;

  return (
    <>
      <Header>
        <p>
          Hello <span>{username}</span>! This is your Dashboard
        </p>
        <NavLinksContainer>
          <StyledLink to="/app">Dashboard</StyledLink>
          <StyledLink to="/app/home">Home</StyledLink>
        </NavLinksContainer>
      </Header>
      <StyledSection>{children}</StyledSection>
    </>
  );
};
