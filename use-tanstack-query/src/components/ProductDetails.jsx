/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const productDetails = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`,
  );
  return response.data;
};

const ProductDetails = ({ id }) => {
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['products', id],
    queryFn: productDetails,
  });

  if (isLoading) return <div>Fetching Product Details...</div>;
  if (error) return <div>An error occured: {error.message}</div>;

  return (
    <div className="w-1/5">
      <div className="fixed">
        <h1 className="text-3xl my-2">Product Details</h1>
        <div className="text-left border bg-gray-100 p-1 text-md rounded flex flex-col">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="object-cover h-48 w-48 border rounded-full m-auto"
          />
          <p className="text-2xl my-2">{product.title}</p>
          <p>{product.description}</p>
          <p className="text-2xl my-2">USD {product.price}</p>
          <p className="text-xl my-2">{product.rating}/5</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
