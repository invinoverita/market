import { FC } from 'react';
import { TypeCategory } from 'src/types';
import { CategoriesFilter } from './CategoriesFilter';

type FilterProps = {
  categories: TypeCategory[];
  category_id?: string;
};

const Filter: FC<FilterProps> = ({ categories, category_id = 'all' }) => {
  return (
    <fieldset>
      <div className="px-4 py-4 xl:px-6 xl:py-6">
        <legend className="font-medium tracking-tight">Категории</legend>
      </div>
      <div className="px-4 pb-4 xl:px-6">
        <CategoriesFilter categories={categories} category_id={category_id} />
      </div>
    </fieldset>
  );
};

export { Filter };
