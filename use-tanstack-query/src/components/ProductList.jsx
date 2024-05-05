/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const ProductList = ({ onShow }) => {
  const [page, setPage] = useState(1);
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['products', {page}],
    queryFn: async ({ queryKey }) => {
      const response = await axios.get(
        `http://localhost:3000/${queryKey[0]}?_page=${queryKey[1].page}&_per_page=6`,
      );
      return response.data;
    },
  });

  if (isLoading) return <div>Fetching Products...</div>;
  if (error) return <div>An error occured: {error.message}</div>;

  return (
    <>
      <div className="flex flex-col justify-center items-center w-3/5">
        <h2 className="text-3xl my-2">Product List</h2>
        <ul className="flex flex-wrap justify-center items-center">
          {products &&
            products.map((product) => (
              <li
                key={product.id}
                className="flex flex-col items-center m-2 border rounded-sm"
              >
                <img
                  className="h-64 w-96 rounded-sm"
                  src={product.thumbnail}
                  alt={product.title}
                />
                <p className="text-xl my-3">{product.title}</p>
                <button
                  className="text-orange-600 mb-4"
                  onClick={() => onShow(product.id)}
                >
                  Show Details
                </button>
              </li>
            ))}
        </ul>
        <div className="flex">
          {page !== 1 && (
            <button
              className="p-2 m-2 bg-gray-100 border  cursor-pointer rounded-sm"
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>
          )}

          {page !== products.length - 1 && (
            <button
              className="p-2 m-2 bg-gray-100 border  cursor-pointer rounded-sm"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
