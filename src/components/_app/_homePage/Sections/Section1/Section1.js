import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Section,
  Container1200,
} from '../../../../reusableStyles/sections/Sections';
import { MarketList } from './MarketList';
import { H3 } from '../../../../reusableStyles/typography/Typography';
import { MarketSearch } from './MarketSearch';
import { API, graphqlOperation } from 'aws-amplify';
import { searchMarkets } from '../../../../../graphql/queries';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Section1 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  //eslint-disable-next-line
  const [isSearching, setIsSearching] = useState(false);
  const [finalSearchTerm, setFinalSearchTerm] = useState('');

  const searchTermHandler = searchTerm => {
    setSearchTerm(searchTerm.target.value);
  };

  const clearSearchHandler = () => {
    setSearchTerm('');
    setSearchResults(null);
  };

  const submitSearchHandler = async e => {
    e.preventDefault();
    try {
      setIsSearching(true);
      const result = await API.graphql(
        graphqlOperation(searchMarkets, {
          filter: {
            or: [
              { name: { match: searchTerm } },
              { owner: { match: searchTerm } },
              { tags: { match: searchTerm } },
            ],
          },
          sort: {
            field: 'name',
            direction: 'desc',
          },
        }),
      );

      setSearchResults(result.data.searchMarkets.items);
      setIsSearching(false);
      setFinalSearchTerm(searchTerm);
    } catch (error) {
      console.error('There was an error', error);
    }
  };

  return (
    <Section>
      <Container1200>
        <TitleContainer>
          <H3>Your Stuff</H3>
        </TitleContainer>
        <MarketSearch
          searchTerm={searchTerm}
          searchTermHandler={searchTermHandler}
          submitSearchHandler={submitSearchHandler}
          clearSearchHandler={clearSearchHandler}
        />
        <MarketList
          searchResults={searchResults}
          finalSearchTerm={finalSearchTerm}
        />
      </Container1200>
    </Section>
  );
};
