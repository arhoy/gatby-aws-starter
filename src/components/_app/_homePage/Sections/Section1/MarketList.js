import React from 'react';
import styled from '@emotion/styled';

import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import { listMarkets } from '../../../../../graphql/queries';
import { MarketItem } from './MarketItem';
import { onCreateMarket } from '../../../../../graphql/subscriptions';

const Container = styled.div``;

const SearchResultSummary = styled.div`
  & span {
    font-weight: 700;
    &.red {
      color: red;
      font-weight: 500;
    }
    &.green {
      color: green;
      font-weight: 700;
    }
  }
`;

export const MarketList = ({ searchResults, finalSearchTerm }) => {
  const onNewMarket = (prevQuery, newData) => {
    let updatedQuery = { ...prevQuery };
    const updatedMarketList = [
      newData.onCreateMarket,
      ...prevQuery.listMarkets.items,
    ];
    updatedQuery.listMarkets.items = updatedMarketList;
    return updatedQuery;
  };

  return (
    <Connect
      query={graphqlOperation(listMarkets)}
      subscription={graphqlOperation(onCreateMarket)}
      onSubscriptionMsg={onNewMarket}
    >
      {({ data, loading, errors }) => {
        let market;
        if (errors.length > 0)
          return <p>Was not able get MarketPlace at this time</p>;
        if (loading || !data.listMarkets) return <h3>Loading...</h3>;
        market =
          searchResults && searchResults.length > 0
            ? searchResults
            : data.listMarkets.items;

        if (searchResults && searchResults.length === 0) {
          market = data.listMarkets.items;
        }

        return (
          <>
            {searchResults && searchResults.length === 0 && (
              <SearchResultSummary>
                <p>
                  <span className="red">No Results </span> for{' '}
                  <span>"{finalSearchTerm}"</span>
                </p>
              </SearchResultSummary>
            )}
            {searchResults && searchResults.length > 0 && (
              <SearchResultSummary>
                <p>
                  <span className="green">{searchResults.length}</span> Search
                  Result{searchResults.length !== 1 && 's'} for{' '}
                  <span>"{finalSearchTerm}"</span>
                </p>
              </SearchResultSummary>
            )}
            <Container>
              {market.map(item => (
                <MarketItem key={item.id} data={item} />
              ))}
            </Container>
          </>
        );
      }}
    </Connect>
  );
};
