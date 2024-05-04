/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const AddProduct = () => {
  const queryClient = useQueryClient();

  const [state, setState] = useState({
    title: '',
    description: '',
    price: 0,
    rating: 5,
    thumbnail: '',
  });

  const mutation = useMutation({
    mutationFn: (newProduct) =>
      axios.post('http://localhost:3000/products', newProduct),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['products']);
    },
    onMutate: (variables) => {
      return { greeting: 'Say hello' };
    },
  });

  const submitData = (event) => {
    event.preventDefault();
    const newData = { ...state, id: crypto.randomUUID().toString() };
    mutation.mutate(newData);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === 'number'
        ? event.target.valueAsNumber
        : event.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  if (mutation.isLoading) {
    return <span>Submitting...</span>;
  }
  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }

  return (
    <div className="w-1/5 h-1/2">
      <div className="fixed m-2 p-2 bg-gray-100">
        <h2 className="text-2xl my-2">Add a Product</h2>
        {mutation.isSuccess && (
          <p className=" text-green-500 text-2xl my-2">Product Added!</p>
        )}
        <form className="flex flex-col" onSubmit={submitData}>
          <input
            type="text"
            value={state.title}
            name="title"
            onChange={handleChange}
            className="my-2 border p-2 rounded"
            placeholder="Enter a product title"
          />
          <textarea
            value={state.description}
            name="description"
            onChange={handleChange}
            className="my-2 border p-2 rounded"
            placeholder="Enter a product description"
          />

          <input
            type="number"
            value={state.price}
            name="price"
            onChange={handleChange}
            className="my-2 border p-2 rounded"
            placeholder="Enter a product price"
          />
          <input
            type="text"
            value={state.thumbnail}
            name="thumbnail"
            onChange={handleChange}
            className="my-2 border p-2 rounded"
            placeholder="Enter a product thumbnail URL"
          />

          <button
            type="submit"
            className="bg-black m-auto text-white text-xl p-1 rounded-md"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
