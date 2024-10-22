import dynamic from 'next/dynamic';
import { FC } from 'react';
import { TypeCategory, TypeProduct } from 'src/types';
import { Card } from 'src/components/Card/Card';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
const Link = dynamic(() => import('../../Link/Link'), { ssr: false });

type TypeMainProducts = {
  data: TypeProduct[];
  category: TypeCategory;
};

const MainProducts: FC<TypeMainProducts> = ({ data = [], category }) => {
  return (
    <div className="container">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-6 text-2xl font-bold tracking-tight sm:text-xl lg:py-8">
        <h2 className="text-2xl font-bold">{category.name}</h2>
        <Link
          href={`/catalog/${category.id}`}
          className="mt-1 flex items-center gap-2 text-base font-semibold text-blue-500"
        >
          <p>Все</p>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 overflow-hidden border-l border-t sm:grid-cols-3 xl:grid-cols-4">
        {data.slice(0, 4).map((product) => (
          <Card data={product} key={product.id} cardClassName="" />
        ))}
      </div>
    </div>
  );
};

export { MainProducts };
