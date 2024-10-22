import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const EmptyCard = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24">
      <ShoppingBagIcon className="h-12 w-12 text-slate-500" />
      <div>
        <h2 className="text-center text-lg font-medium tracking-tight">
          Корзина пуста
        </h2>
        <span className="mt-2 block text-center text-base text-slate-500">
          Перейдите в каталог и добавьте <br /> в корзину товары
        </span>
      </div>
    </div>
  );
};

export { EmptyCard };
