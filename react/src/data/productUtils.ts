import products from './products';
import { Product } from '../types/Product';

// 상품 배열에서 지정한 개수만큼 랜덤으로 반환
export const getRandomProducts = (count: number): Product[] => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};