'use client';
import { FC, Fragment } from 'react';
import { Card } from 'src/components/Card/Card';
import { getHistoryProducts, setHistoryProducts } from 'src/lib/utils';

import { useEffect } from 'react';
import { TypeProduct } from 'src/types';

type TypeHistoryProductsProps = {
  product: TypeProduct;
};

const HistoryProducts: FC<TypeHistoryProductsProps> = ({ product }) => {
  const products = getHistoryProducts();

  useEffect(() => {
    setHistoryProducts(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!products.length) {
    return null;
  }

  return (
    <section>
      <div className="container">
        <div className="py-6 lg:py-8">
          <h2 className="text-2xl font-bold tracking-tight lg:text-center">
            Недавно просмотренные
          </h2>
        </div>
      </div>
      <div className="container">
        <div className="grid auto-rows-auto grid-cols-2 overflow-hidden border-l border-t sm:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <Card data={product} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryProducts;
