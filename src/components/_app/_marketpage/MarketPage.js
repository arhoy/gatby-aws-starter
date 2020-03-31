/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';

import { API, graphqlOperation } from 'aws-amplify';

import { DashboardLayout } from '../layouts/DashboardLayout';
import { UserContext } from '../../../context/user-context';
import { ProductsContext } from '../../../context/products-context';

import { Section0 } from './Sections/Section0/Section0';

const getMarket = /* GraphQL */ `
  query GetMarket($id: ID!) {
    getMarket(id: $id) {
      id
      name
      products {
        items {
          id
          description
          price
          shipped
          owner
          createdAt
          file {
            key
          }
        }
        nextToken
      }
      tags
      owner
      createdAt
    }
  }
`;

export const MarketPage = ({ marketplaceId }) => {
  const user = useContext(UserContext);

  const { username } = user;
  const [market, setMarket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  // check to see if the logged in user is the owner of the market
  const checkMarketOwner = owner => {
    setIsOwner(username === owner);
  };

  // Grab the market information from AWS
  const handleGetMarket = async () => {
    const input = {
      id: marketplaceId,
    };
    const result = await API.graphql(graphqlOperation(getMarket, input));
    setMarket(result.data.getMarket);
    setIsLoading(false);
    checkMarketOwner(result.data.getMarket.owner);
  };

  // change render on isLoading only
  useEffect(() => {
    handleGetMarket();
  }, [isLoading]);

  if (isLoading) return <p> Loading ...</p>;

  return (
    <ProductsContext.Provider value={[market, setMarket]}>
      <DashboardLayout>
        <Section0 market={market} isOwner={isOwner} />
      </DashboardLayout>
    </ProductsContext.Provider>
  );
};
