import { FC, Fragment } from 'react';
import { Sort } from 'src/components/Sort/Sort';
import { TypeDefaultResData } from 'src/lib/utils';
import { Filter } from 'src/modules/Filter/Filter';
import { MobileFilter } from 'src/modules/MobileFilter/MobileFilter';
import { ProductsList } from 'src/modules/ProductsList/ProductsList';
import { TypeCategory, TypeProduct } from 'src/types';

import { FunnelIcon } from '@heroicons/react/24/outline';

type TypeCatalogPageType = {
  data: TypeDefaultResData<TypeProduct>;
  categories: TypeDefaultResData<TypeCategory>;
  category_id: string;
};

const CatalogPage: FC<TypeCatalogPageType> = ({
  data = {
    result: [],
    count: 0,
  },
  categories = {
    result: [],
    count: 0,
  },
  category_id,
}) => {
  const title =
    category_id === 'all'
      ? 'Все товары'
      : categories.result.find(
          (category) => category.id === Number(category_id),
        )?.name;

  return (
    <Fragment>
      <section className="border-b bg-slate-50">
        <div className="container">
          <div className="py-12">
            <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="flex items-center justify-between py-4 lg:justify-end">
          <div className="lg:hidden">
            <MobileFilter
              categories={categories.result}
              category_id={category_id}
              trigger={
                <button className="flex gap-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                  <FunnelIcon className="h-5 w-5 text-slate-600" />
                  <p>Фильтр</p>
                </button>
              }
            />
          </div>
          <div>
            <Sort />
          </div>
        </div>
      </section>
      <div className="container">
        <div className="grid grid-cols-4 gap-y-8">
          <aside className="relative hidden border-y border-l lg:block">
            <div className="sticky top-0">
              <Filter
                categories={categories.result}
                category_id={category_id}
              />
            </div>
          </aside>
          <div className="col-span-4 lg:col-span-3">
            {data.result.length ? (
              <ProductsList data={data.result} />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-24">
                <div>
                  <h2 className="text-center text-lg font-medium tracking-tight">
                    Товаров в данной категории нет
                  </h2>
                  <span className="mt-2 block text-center text-base text-slate-500">
                    Выберите другую категорию
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CatalogPage;
