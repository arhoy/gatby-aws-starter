import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled';
import { API, graphqlOperation, Storage, Auth } from 'aws-amplify';
import awsExports from '../../../../../aws-exports';

import { PhotoPicker } from 'aws-amplify-react';
import { Radio } from 'antd';
import { H3 } from '../../../../reusableStyles/typography/Typography';
import Error from '../../../Error';
import { createProduct } from '../../../../../graphql/mutations';
import { dollarToCents } from '../../../../../utils/awsHelpers';
import { onCreateProduct } from '../../../../../graphql/subscriptions';
import { ProductsContext } from '../../../../../context/products-context';
import { UserContext } from '../../../../../context/user-context';

const Container = styled.div`
  max-width: ${props => props.theme.screenSize.mobileL};
  margin: 0 auto;
  background: white;
  padding: 2rem;
`;

const Form = styled.form`
  margin: 2rem 0;
`;

const Field = styled.div`
  margin-bottom: 2rem;
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
  }
  & .label_shipped {
    display: inline-block;
    margin-bottom: 0.5rem;
  }
  & img {
    width: 20rem;
    margin-bottom: 1rem;
  }
`;

const Button = styled.button`
  outline: none;
  border: 2px solid black;
  padding: 4px 8px;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.colors.lightgrey};
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const TitleContainer = styled.div``;

export const NewProductForm = ({ marketId }) => {
  const [market, setMarket] = useContext(ProductsContext);
  const user = useContext(UserContext);
  const owner = user.sub;
  const [id, setId] = useState(null);
  const [error, setError] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [shipped, setShipped] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [image, setImage] = useState('');
  const [success, setSuccess] = useState(false);

  const [percentUploaded, setPercentUploaded] = useState(0);

  useEffect(() => {
    const createProductListener = API.graphql(
      graphqlOperation(onCreateProduct, { owner }),
    ).subscribe({
      next: productData => {
        const createdProduct = productData.value.data.onCreateProduct;
        const prevProducts = market.products.items.filter(
          item => item.id !== createdProduct.id,
        );
        console.log('product data is', productData);
        console.log('created product is', createProduct);
        console.log('previous products are', prevProducts);
        const updatedProducts = [createdProduct, ...prevProducts];
        console.log('updaetd products are ', updatedProducts);

        setMarket(market => ({
          ...market,
          products: { items: updatedProducts },
        }));
      },
    });
    // unmounting
    return () => {
      createProductListener.unsubscribe();
    };
  }, [market]);

  const onSubmitHandler = async e => {
    e.preventDefault();
    try {
      // handling image upload
      const visiblity = 'public';
      const { identityId } = await Auth.currentCredentials();

      // create filename path
      const filename = `/${visiblity}/${identityId}/${Date.now()}-${
        image.name
      }`;

      // upload file to AMZN
      const uploadedFile = await Storage.put(filename, image.file, {
        contentType: image.type,
        progressCallback: progress => {
          const percentUploaded = Math.round(
            (progress.loaded / progress.total) * 100,
          );
          setPercentUploaded(percentUploaded);
        },
      });

      // build file object for Product
      const file = {
        key: uploadedFile.key,
        bucket: awsExports.aws_user_files_s3_bucket,
        region: awsExports.aws_project_region,
      };
      // new product input data
      const input = {
        description,
        productMarketId: marketId,
        file,
        price: dollarToCents(price),
        shipped,
        owner: user.sub,
      };

      await API.graphql(graphqlOperation(createProduct, { input }));

      // reset state
      setDescription('');
      setPrice('');
      setImagePreview('');
      setShipped(false);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  return (
    <Container>
      <TitleContainer>
        <H3>New Product Form</H3>
      </TitleContainer>

      {error && <Error errorMessage={error.message} />}
      <Form onSubmit={onSubmitHandler}>
        <Field>
          <input
            onChange={event => setDescription(event.target.value)}
            placeholder="Product description"
            name="description"
            value={description}
            required
          />
        </Field>

        <Field>
          <input
            onChange={event => setPrice(event.target.value)}
            placeholder="Product price"
            name="price"
            type="number"
            value={price}
            required
          />
        </Field>

        <Field>
          <label htmlFor="shipping" className="label_shipped">
            Is this a digital product?
          </label>
          <Radio.Group
            onChange={event => setShipped(event.target.value)}
            value={shipped}
            style={{ width: '100%' }}
          >
            <Radio value={false}>No, I will ship it</Radio>
            <Radio value={true}>Yes, delivered via email</Radio>
          </Radio.Group>
        </Field>
        <Field>
          {imagePreview && (
            <>
              <img src={imagePreview} alt="Product Preview" />
              <div>Percent Uploaded{percentUploaded}</div>
            </>
          )}
          <PhotoPicker
            title="Product Image"
            preview="hidden"
            onLoad={url => setImagePreview(url)}
            onPick={data => setImage(data)}
          />
        </Field>

        <Field>
          <Button disabled={!image || !description || !price} type="submit">
            Submit My Info
          </Button>
        </Field>
        {success && <p className="success"> New Product Added! Add Another </p>}
      </Form>
    </Container>
  );
};
