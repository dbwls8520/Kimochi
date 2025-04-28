import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface LocationState {
  success: boolean;
  items: Product[];
  total: number;
}

const PaymentResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  if (!state) {
    return (
      <div className="container mt-5 text-center">
        <h2>不正なアクセスです</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          ホームに戻る
        </button>
      </div>
    );
  }

  const { success, items, total } = state;
  const failureReasons = ['ネットワークエラー', '残高不足', 'サーバーエラー'];
  const randomReason = failureReasons[Math.floor(Math.random() * failureReasons.length)];

  return (
    <div className="container mt-5">
      <div className="text-center">
        {success ? (
          <>
            <h2 className="text-success">決済が完了しました！</h2>
            <p>ご購入ありがとうございます。</p>
          </>
        ) : (
          <>
            <h2 className="text-danger">決済に失敗しました</h2>
            <p>理由: {randomReason}</p>
          </>
        )}
      </div>

      <div className="mt-4">
        <h5>購入商品一覧</h5>
        <ul className="list-group">
          {items.map(item => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              {item.name}
              <span>¥{item.price.toLocaleString()}</span>
            </li>
          ))}
        </ul>

        <div className="text-end mt-3">
          <strong>合計: ¥{total.toLocaleString()}</strong>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-outline-primary me-3" onClick={() => navigate('/')}>
          ホームに戻る
        </button>
        {!success && (
          <button className="btn btn-danger" onClick={() => navigate(-1)}>
            再試行する
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentResult;
