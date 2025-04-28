import React from 'react';
import { usePurchase } from '../context/PurchaseContext';
import { useNavigate } from 'react-router-dom';

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
};

const groupByDate = (items: ReturnType<typeof usePurchase>['purchaseHistory']) => {
  const map = new Map<string, typeof items>();
  items.forEach(item => {
    const date = item.purchasedAt.split('T')[0];
    if (!map.has(date)) map.set(date, []);
    map.get(date)!.push(item);
  });
  return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1)); // 최신순 정렬
};

const PurchaseHistory: React.FC = () => {
  const { purchaseHistory } = usePurchase();
  const grouped = groupByDate(purchaseHistory);
  const navigate = useNavigate();

  const goToDetail = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">購入履歴</h2>
      {purchaseHistory.length === 0 ? (
        <p>購入履歴がありません。</p>
      ) : (
        grouped.map(([date, items]) => (
          <div key={date} className="mb-5">
            <h5 className="mb-3">{formatDate(date)}</h5>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
              {items.map(item => (
                <div className="col" key={item.id}>
                  <div
                    className="card h-100 shadow-sm"
                    style={{ cursor: 'pointer' }}
                    onClick={() => goToDetail(item.id)}
                  >
                    <img
                      src={item.image}
                      className="card-img-top"
                      alt={item.name}
                      style={{ height: '160px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">価格: ¥{item.price.toLocaleString()}</p>
                      <p className="card-text text-success">エコスコア: {item.ecoScore}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PurchaseHistory;
