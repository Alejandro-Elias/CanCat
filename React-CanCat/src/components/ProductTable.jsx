import { useState, useEffect } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { ModalProducts } from './ModalProducts';
import { getProduct } from '../services/getProduct';
import { ModalEdit } from './ModalEdit';

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetch('https://cancat.onrender.com/apis/products')
      .then(response => response.json())
      .then(data => setProducts(data.formattedProducts))
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);

  const handleShowProductModal = async (id) => {
    const productDetail = await getProduct(id);
    setSelectedProduct(productDetail);
    setShowProductModal(true);
  };

  const handleShowEditModal = async (id) => {
    const productDetail = await getProduct(id);
    setSelectedProduct(productDetail);
    setShowEditModal(true);
  };

  const handleShowdeleteModal = async (id) => {
    const productDetail = await getProduct(id);
    setSelectedProduct(productDetail);
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setNoResults(filteredProducts.length === 0);
  }, [filteredProducts]);  

  console.log(selectedProduct);

  return (
    <>
      <Form.Control
        type="text"
        placeholder="Buscar por nombre, descripción, etc..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {noResults && <p>Producto no encontrado</p>}
      {!noResults && (
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>
                  <div className='d-flex gap-1 justify-content-center p-1'>
                    <Button onClick={() => handleShowProductModal(product.id)} variant="outline-success">Ver</Button>
                    <Button onClick={() => handleShowEditModal(product.id)} variant="outline-warning">Editar</Button>
                    <Button onClick={() => handleShowdeleteModal(product.id)} variant="outline-danger">Eliminar</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {showProductModal && (
        <ModalProducts
          show={showProductModal}
          handleClose={() => setShowProductModal(false)}
          prod={selectedProduct}
        />
      )}
      {showEditModal && (
        <ModalEdit
          showForm={showEditModal}
          handleCloseForm={() => setShowEditModal(false)}
          prod={selectedProduct}
        />
      )}
    </>
  );
}

export default ProductTable;
