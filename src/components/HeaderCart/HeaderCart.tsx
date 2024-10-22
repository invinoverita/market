'use client';
import { FC } from 'react';

import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useStore } from 'src/lib/hooks/useStore';
const HeaderCart: FC = () => {
  const { goods } = useStore();

  return (
    <div className="relative">
      <ShoppingBagIcon className="h-6 w-6" />
      <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-700/40 text-sm text-white">
        {goods.length}
      </span>
    </div>
  );
};

export default HeaderCart;
