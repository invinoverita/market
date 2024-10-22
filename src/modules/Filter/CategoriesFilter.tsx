import dynamic from 'next/dynamic';
import { FC, Fragment } from 'react';

import { Checkbox } from 'src/components/UI';
import { TypeCategory } from 'src/types';

const Link = dynamic(() => import('../../components/Link/Link'), {
  ssr: false,
});

type TypeCategoriesFilterProps = {
  category_id: null | string;
  categories: TypeCategory[];
};

const CategoriesFilter: FC<TypeCategoriesFilterProps> = ({
  category_id,
  categories,
}) => {
  return (
    <Fragment>
      <div>
        <Link href={`/catalog/all`}>
          <Checkbox
            label="Все"
            name="all"
            defaultChecked={category_id === 'all'}
          />
        </Link>
      </div>
      {categories.map((category) => (
        <div className="mt-2 xl:mt-3" key={category.id}>
          <Link href={`/catalog/${category.id}`}>
            <Checkbox
              defaultChecked={category_id === category.id.toPrecision()}
              label={category.name}
              name={category.id.toPrecision()}
            />
          </Link>
        </div>
      ))}
    </Fragment>
  );
};

export { CategoriesFilter };
