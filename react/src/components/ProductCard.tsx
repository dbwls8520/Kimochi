import React from 'react';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Props extends Product {}

const ProductCard: React.FC<Props> = ({
  id,
  name,
  image,
  price,
  ecoScore,
}) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const inCart = isInCart(id);
  const navigate = useNavigate();

  const handleCartToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 막기
    if (inCart) removeFromCart(id);
    else
      addToCart({
        id,
        name,
        image,
        price,
        ecoScore,
        description: '',
        material: '',
        origin: '',
        category: '',
      });
  };

  const handleNavigate = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div
      className="card h-100 shadow-sm position-relative"
      style={{ cursor: 'pointer' }}
      onClick={handleNavigate}
    >
      <img
        src={image}
        className="card-img-top"
        alt={name}
        loading="lazy"
        style={{ height: '200px', width: '100%', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">価格: ¥{price.toLocaleString()}</p>
        <p className="card-text text-success">エコスコア: {ecoScore}</p>
      </div>

      {/* 장바구니 버튼 */}
      <button
        className="btn position-absolute top-0 end-0 m-2"
        onClick={handleCartToggle}
        aria-label="お気に入り"
      >
        {inCart ? (
          <FaStar color="#f4c542" size={20} />
        ) : (
          <FaRegStar color="#aaa" size={20} />
        )}
      </button>
    </div>
  );
};

export default ProductCard;
