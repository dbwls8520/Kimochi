// src/pages/Home.tsx

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getRandomProducts } from '../data/productUtils';
import { Product } from '../types/Product'
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const [recommended, setRecommended] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const random = getRandomProducts(6);
    setRecommended(random);
  }, []);

  return (
    <div className="container py-5 text-center">
      <motion.h1
        className="display-5 fw-bold mb-3 text-success"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🌿環境にやさしいショッピングを始めよう！
      </motion.h1>

      <motion.p
        className="lead mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        キモチ(kimochi)では、エコな商品を楽しく探すことができます。
      </motion.p>

      <motion.button
        className="btn btn-success btn-lg px-4 mb-5"
        onClick={() => navigate('/products')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        商品一覧を見る
      </motion.button>

      <motion.div
        className="row row-cols-1 row-cols-md-3 g-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {recommended.map((product) => (
          <motion.div
            className="col"
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <ProductCard {...product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
