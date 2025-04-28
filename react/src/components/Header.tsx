import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
      <Link className="navbar-brand fw-bold text-success" to="/">
        キモチ
      </Link>
      <div className="collapse navbar-collapse show">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">ホーム</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">商品一覧</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">カート</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/history">購入履歴</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">プロフィール</Link>
          </li>
        </ul>
        <Link className="btn btn-outline-success" to="/login">ログイン</Link>
      </div>
    </nav>
  );
};

export default Header;
