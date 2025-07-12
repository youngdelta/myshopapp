import React, { useState, useEffect } from 'react';
import { fetchProducts, createProduct, addToCart } from '../api';

function ProductsPage({ showAlert }) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [memberId, setMemberId] = useState(1); // For simplicity, assume memberId 1

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await createProduct({ name, price: parseInt(price), stockQuantity: parseInt(stockQuantity) });
      showAlert('Product added successfully!', 'success');
      setName('');
      setPrice('');
      setStockQuantity('');
      loadProducts();
    } catch (error) {
      console.error('Add product error:', error);
      showAlert('Failed to add product.', 'danger');
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart({ memberId, productId, count: 1 });
      showAlert('Product added to cart!', 'success');
    } catch (error) {
      console.error('Add to cart error:', error);
      showAlert('Failed to add product to cart.', 'danger');
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Products</h1>
      <div className="card mb-4">
        <div className="card-header">Add New Product</div>
        <div className="card-body">
          <form onSubmit={handleAddProduct}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="number" className="form-control" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="number" className="form-control" placeholder="Stock Quantity" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </form>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <div className="col" key={product.productId}> {/* key를 product.productId로 변경 */}
            <div className="card h-100">
              <img src={`https://picsum.photos/seed/${product.productId}/300/200`} className="card-img-top" alt={product.name} /> {/* product.id를 product.productId로 변경 */}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Stock: {product.stockQuantity}</p>
                <button className="btn btn-success" onClick={() => handleAddToCart(product.productId)}>Add to Cart</button> {/* product.id를 product.productId로 변경 */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
