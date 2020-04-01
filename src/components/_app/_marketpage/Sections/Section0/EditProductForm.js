// import React, { useState, useEffect, useContext } from 'react';
// import styled from '@emotion/styled';
// import { API, graphqlOperation } from 'aws-amplify';

// import { Radio } from 'antd';
// import { H3 } from '../../../../reusableStyles/typography/Typography';
// import Error from '../../../Error';
// import { updateProduct } from '../../../../../graphql/mutations';
// import { dollarToCents, centsToDollars } from '../../../../../utils/awsHelpers';
// import { onUpdateProduct } from '../../../../../graphql/subscriptions';
// import { ProductsContext } from '../../../../../context/products-context';
// import { UserContext } from '../../../../../context/user-context';

// const FormContainer = styled.div`
//   max-width: ${props => props.theme.screenSize.mobileL};
//   margin: 0 auto;
//   background: white;
//   padding: 2rem;
// `;

// const Form = styled.form`
//   margin: 2rem 0;
// `;

// const Field = styled.div`
//   margin-bottom: 2rem;
//   & input,
//   select {
//     width: 100%;
//     padding: 5px;
//     padding-left: 10px;
//     background: transparent;
//     border: none;
//     border-radius: 5px;
//     border: 2px solid rgba(14, 30, 37, 0.15);
//     font-family: Poppins, Roboto;
//     font-size: 1.4rem;
//     font-weight: 400;
//     outline-color: ${props => props.theme.colors.secondary};
//   }
//   & .label_shipped {
//     display: inline-block;
//     margin-bottom: 0.5rem;
//   }
//   & img {
//     width: 20rem;
//     margin-bottom: 1rem;
//   }
// `;

// const Button = styled.button`
//   outline: none;
//   border: 2px solid black;
//   padding: 4px 8px;
//   border-radius: 4px;
//   background: white;
//   cursor: pointer;
//   &:hover {
//     background: ${props => props.theme.colors.lightgrey};
//   }
//   &:disabled {
//     cursor: not-allowed;
//   }
// `;

// const TitleContainer = styled.div``;

// export const EditProductForm = ({ marketId, product }) => {
//   // context
//   const [market, setMarket] = useContext(ProductsContext);
//   const user = useContext(UserContext);
//   const owner = user.sub;

//   // state
//   const [error, setError] = useState('');
//   const [description, setDescription] = useState(product.description);
//   const [price, setPrice] = useState(centsToDollars(product.price));
//   const [shipped, setShipped] = useState(product.shipped);

//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const updateProductListener = API.graphql(
//       graphqlOperation(onUpdateProduct, { owner }),
//     ).subscribe({
//       next: productData => {
//         const updateProduct = productData.value.data.onUpdateProduct;
//         setMarket(prevMarket => {
//           const index = prevMarket.products.items.findIndex(
//             product => product.id === updateProduct.id,
//           );

//           const updatedProducts = [
//             ...prevMarket.products.items.slice(0, index),
//             updateProduct,
//             ...prevMarket.products.items.slice(index + 1),
//           ];
//           return { ...market, products: { items: updatedProducts } };
//         });
//       },
//     });

//     // unmounting
//     return () => {
//       updateProductListener.unsubscribe();
//     };
//   }, []);

//   const productUpdateHandler = async e => {
//     e.preventDefault();
//     try {
//       // new product input data
//       const input = {
//         id: product.id,
//         description,
//         price: dollarToCents(price),
//         shipped,
//       };

//       await API.graphql(graphqlOperation(updateProduct, { input }));

//       // reset state
//       setDescription('');
//       setPrice('');

//       setShipped(false);

//       setSuccess(true);
//     } catch (err) {
//       console.error(err);
//       setError(err);
//     }
//   };

//   return (
//     <FormContainer>
//       <TitleContainer>
//         <H3>{success ? 'Product Updated' : 'Edit Product'}</H3>
//       </TitleContainer>

//       {error && <Error errorMessage={error.message} />}
//       <Form onSubmit={productUpdateHandler}>
//         <Field>
//           <input
//             onChange={event => setDescription(event.target.value)}
//             placeholder="Product description"
//             name="description"
//             value={description}
//             required
//           />
//         </Field>

//         <Field>
//           <input
//             onChange={event => setPrice(event.target.value)}
//             placeholder="Product price"
//             name="price"
//             type="number"
//             value={price}
//             required
//           />
//         </Field>

//         <Field>
//           <label htmlFor="shipped" className="label_shipped">
//             Is this a digital product
//           </label>
//           <Radio.Group
//             onChange={event => setShipped(event.target.value)}
//             value={shipped}
//             style={{ width: '100%' }}
//           >
//             <Radio value={false}>No, I will ship it</Radio>
//             <Radio value={true}>Yes, delivered via email</Radio>
//           </Radio.Group>
//         </Field>

//         <Field>
//           <Button disabled={!description || !price} type="submit">
//             Submit My Info
//           </Button>
//         </Field>
//         {success && <p className="success"> Product Successfully Updated </p>}
//       </Form>
//     </FormContainer>
//   );
// };
