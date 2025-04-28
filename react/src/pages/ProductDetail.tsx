import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/products';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import { FaRegStar, FaStar } from 'react-icons/fa';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product: Product | undefined = products.find(p => p.id === Number(id));

  const { addToCart, removeFromCart, isInCart } = useCart();

  if (!product) {
    return (
      <div className="container mt-5">
        <h3>商品が見つかりませんでした。</h3>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>戻る</button>
      </div>
    );
  }

  const inCart = isInCart(product.id);

  const handleCartToggle = () => {
    if (inCart) removeFromCart(product.id);
    else addToCart(product);
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>← 戻る</button>
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
            loading="lazy"
            style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-muted">価格: ¥{product.price.toLocaleString()}</p>
          <p className="text-success">エコスコア: {product.ecoScore}</p>
          <p><strong>素材:</strong> {product.material}</p>
          <p><strong>原産地:</strong> {product.origin}</p>
          <p className="mt-3">{product.description}</p>

          <button
            className="btn btn-outline-primary mt-3"
            onClick={handleCartToggle}
          >
            {inCart ? (
              <>
                <FaStar color="#f4c542" className="me-2" />
                カートから削除
              </>
            ) : (
              <>
                <FaRegStar className="me-2" />
                カートに追加
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;