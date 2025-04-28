import React from 'react';

interface FilterProps {
  category: string;
  priceRange: string;
  ecoScoreRange: string;
  onCategoryChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;
  onEcoScoreRangeChange: (value: string) => void;
}

const FilterBar: React.FC<FilterProps> = ({
  category,
  priceRange,
  ecoScoreRange,
  onCategoryChange,
  onPriceRangeChange,
  onEcoScoreRangeChange,
}) => {
  return (
    <div className="mb-4">
      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label">カテゴリー</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">すべて</option>
            <option value="衣類">衣類</option>
            <option value="キッチン用品">キッチン用品</option>
            <option value="文房具">文房具</option>
            <option value="日用品">日用品</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">価格帯</label>
          <select
            className="form-select"
            value={priceRange}
            onChange={(e) => onPriceRangeChange(e.target.value)}
          >
            <option value="">すべて</option>
            <option value="0-2000">0〜2,000円</option>
            <option value="2001-5000">2,001〜5,000円</option>
            <option value="5001-10000">5,001〜10,000円</option>
            <option value="10001+">10,000円以上</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">エコスコア</label>
          <select
            className="form-select"
            value={ecoScoreRange}
            onChange={(e) => onEcoScoreRangeChange(e.target.value)}
          >
            <option value="">すべて</option>
            <option value="0-40">0〜40点 (低)</option>
            <option value="41-70">41〜70点 (中)</option>
            <option value="71-100">71〜100点 (高)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;