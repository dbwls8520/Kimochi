import React from 'react';
import { Product } from '../types/Product';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{product.name}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body row">
            <div className="col-md-6">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid"
              />
            </div>
            <div className="col-md-6">
              <p><strong>価格:</strong> ¥{product.price.toLocaleString()}</p>
              <p><strong>エコスコア:</strong> {product.ecoScore}</p>
              <p><strong>素材:</strong> {product.material}</p>
              <p><strong>原産地:</strong> {product.origin}</p>
              <p className="mt-3">{product.description}</p>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>閉じる</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;