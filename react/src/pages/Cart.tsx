import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { usePurchase } from '../context/PurchaseContext';
import { useUser } from '../context/UserContext'; // ✅ 포인트 관련 context 추가
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearSelectedItems } = useCart();
  const { addPurchase } = usePurchase();
  const { ecoPoints, setEcoPoints } = useUser(); // ✅ ecoPoint 상태 접근
  const [selected, setSelected] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSelected(cartItems.map(item => item.id));
  }, [cartItems]);

  const toggleSelect = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelected(cartItems.map(item => item.id));
  };

  const deselectAll = () => {
    setSelected([]);
  };

  const selectedItems = cartItems.filter(item => selected.includes(item.id));
  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = () => {
    const success = Math.random() > 0.2;

    navigate('/payment-result', {
      state: {
        success,
        items: selectedItems,
        total,
      },
    });

    if (success) {
      addPurchase(selectedItems); // ✅ 구매 이력 반영

      // ✅ 포인트 누적 로직 추가
      const gainedPoints = selectedItems.reduce(
        (sum, item) => sum + Math.floor(item.ecoScore / 10),
        0
      );
      setEcoPoints(ecoPoints + gainedPoints); // ✅ 포인트 누적

      clearSelectedItems(selected);
      setSelected([]);
    }
  };

  const goToDetail = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">カート</h2>
      {cartItems.length === 0 ? (
        <p>カートに商品がありません。</p>
      ) : (
        <>
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-outline-primary me-2 btn-sm" onClick={selectAll}>
              すべて選択
            </button>
            <button className="btn btn-outline-secondary btn-sm" onClick={deselectAll}>
              すべて解除
            </button>
          </div>

          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            {cartItems.map(item => (
              <div className="col" key={item.id}>
                <div className="card h-100 shadow-sm position-relative">
                  <div
                    onClick={() => goToDetail(item.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={item.image}
                      className="card-img-top"
                      loading="lazy"
                      alt={item.name}
                      style={{ height: '140px', width: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{ cursor: 'pointer' }}
                      onClick={() => goToDetail(item.id)}
                    >
                      {item.name}
                    </h5>
                    <p className="card-text">価格: ¥{item.price.toLocaleString()}</p>
                    <p className="card-text text-success">エコスコア: {item.ecoScore}</p>

                    <div className="form-check mt-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`select-${item.id}`}
                        checked={selected.includes(item.id)}
                        onChange={() => toggleSelect(item.id)}
                      />
                      <label className="form-check-label" htmlFor={`select-${item.id}`}>
                        決済対象から除外
                      </label>
                    </div>
                  </div>

                  <button
                    className="btn position-absolute top-0 end-0 m-2"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="お気に入り解除"
                  >
                    <FaStar color="#f4c542" size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <h5>選択された商品合計: ¥{total.toLocaleString()}</h5>
            <button
              className="btn btn-success mt-3"
              onClick={handlePayment}
              disabled={selected.length === 0}
            >
              決済する
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
