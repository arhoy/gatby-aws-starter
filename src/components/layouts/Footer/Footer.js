import React from 'react';
import styled from '@emotion/styled';
import { SectionGrey } from '../../reusableStyles/sections/Sections';
import { FooterNavigation } from './FooterComponents/FooterNavigation';
import { FooterFollow } from './FooterComponents/FooterFollow';
import { FooterContact } from './FooterComponents/FooterContact';
import { MailChimpFooter } from './FooterComponents/MailChimpFooter';
import { FooterBottom } from './FooterComponents/FooterBottom';

const CustomSection = styled(SectionGrey)`
  padding: 2rem;
  margin: 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;

  grid-template-columns: repeat(5, 1fr);

  grid-gap: 1rem;
  grid-row-gap: 4rem;
  @media (max-width: ${props => props.theme.screenSize.fourFifty}) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  display: flex;
`;

const Section1 = styled(Section)`
  grid-column: 1/2;
  grid-row: 1/-1;
  @media (max-width: ${props => props.theme.screenSize.eightHundred}) {
    grid-column: 1/2;
    grid-row: 1/2;
  }
  @media (max-width: ${props => props.theme.screenSize.fourFifty}) {
    grid-row: 1/-1;
    grid-column: 1/-1;
  }
`;

const Section2 = styled(Section)`
  display: flex;
  flex-wrap: wrap;
  grid-column: 2/4;
  grid-row: 1/2;

  @media (max-width: ${props => props.theme.screenSize.eightHundred}) {
    grid-column: 2/-1;
  }
  @media (max-width: ${props => props.theme.screenSize.fourFifty}) {
    grid-column: 1/-1;
    grid-row: 2/3;
    flex-direction: column;
    justify-content: space-between;
  }
`;
//eslint-disable-next-line
const Section4 = styled(Section)`
  grid-column: 4/-1;
  grid-row: 1/2;
  @media (max-width: ${props => props.theme.screenSize.eightHundred}) {
    grid-column: 1/-1;
    grid-row: 2/3;
  }
  @media (max-width: ${props => props.theme.screenSize.fourFifty}) {
    grid-column: 1/-1;
    grid-row: 3/4;
  }
`;

const Section5 = styled(Section)`
  grid-column: 1/-1;
`;

export const Footer = () => {
  return (
    <CustomSection>
      <Container>
        <Section1>
          <FooterNavigation />
        </Section1>
        <Section2>
          <FooterFollow />
          <FooterContact />
        </Section2>

        <Section4>
          <MailChimpFooter />
        </Section4>
        <Section5>
          <FooterBottom />
        </Section5>
      </Container>
    </CustomSection>
  );
};
