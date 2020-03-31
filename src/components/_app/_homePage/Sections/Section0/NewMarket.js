import React from 'react';
import styled from '@emotion/styled';
import { H1 } from '../../../../reusableStyles/typography/Typography';

import { NewMarketForm } from './NewMarketForm';
import { ModalForForm } from './ModalForForm';

const Container = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NewMarket = () => {
  return (
    <Container>
      <TitleContainer>
        <H1>Create Your MarketPlace</H1>
      </TitleContainer>
      <ModalForForm>
        <NewMarketForm />
      </ModalForForm>
    </Container>
  );
};
