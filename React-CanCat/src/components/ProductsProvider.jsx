import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/apis/products')
      .then(response => response.json())
      .then(data => setProducts(data.formattedProducts))
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = {
  children : PropTypes.object
}

export { ProductsProvider, ProductsContext };
