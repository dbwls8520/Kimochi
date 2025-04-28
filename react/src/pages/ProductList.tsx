import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products';
import { Product } from '../types/Product';
import Pagination from '../components/Pagination';

const categories = ['すべて', '衣類', 'キッチン用品', '日用品', '文房具'];
const priceRanges = ['すべて', '0~2000', '2001~5000', '5001~10000', '10001以上'];
const ecoScores = ['すべて', '0~40', '41~70', '71~100'];

const ProductList: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData);
  const [category, setCategory] = useState('すべて');
  const [priceRange, setPriceRange] = useState('すべて');
  const [ecoScore, setEcoScore] = useState('すべて');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    let result = [...productsData];

    // 카테고리 필터
    if (category !== 'すべて') {
      result = result.filter(p => p.category === category);
    }

    // 가격 필터
    if (priceRange !== 'すべて') {
      const [min, max] = priceRange.split('~');
      if (max) {
        result = result.filter(p => p.price >= +min && p.price <= +max);
      } else {
        result = result.filter(p => p.price >= +min);
      }
    }

    // 친환경 점수 필터
    if (ecoScore !== 'すべて') {
      const [min, max] = ecoScore.split('~');
      result = result.filter(p => p.ecoScore >= +min && p.ecoScore <= +max);
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [category, priceRange, ecoScore]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">商品一覧</h2>

      {/* 필터 */}
      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <label className="form-label">カテゴリー</label>
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c, idx) => <option key={idx}>{c}</option>)}
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <label className="form-label">価格帯</label>
          <select className="form-select" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
            {priceRanges.map((p, idx) => <option key={idx}>{p}</option>)}
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <label className="form-label">エコスコア</label>
          <select className="form-select" value={ecoScore} onChange={(e) => setEcoScore(e.target.value)}>
            {ecoScores.map((e, idx) => <option key={idx}>{e}</option>)}
          </select>
        </div>
      </div>

      {/* 상품 목록 */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {currentProducts.map(product => (
          <div className="col" key={product.id}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ProductList;
