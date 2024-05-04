import { useState } from 'react';
import './App.css';
import ProductDetails from './components/ProductDetails';
import Products from './components/Products';
import AddProduct from './components/AddProduct';

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <div className="flex m-2">
      <AddProduct />
      <Products onShow={(productId) => setSelectedProductId(productId)} />
      {selectedProductId && <ProductDetails id={selectedProductId} />}
    </div>
  );
}

export default App;
