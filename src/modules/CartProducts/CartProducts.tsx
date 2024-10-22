'use client';
import { FC, memo } from 'react';

import { Card } from 'src/modules/Cart';

import { TypeGood } from 'src/types';

type TypeCartProducts = {
  data: TypeGood[];
  onChange: (data: TypeGood) => void;
  onRemove: (data: TypeGood) => void;
};

const CartProducts: FC<TypeCartProducts> = memo(
  ({ data = [], onRemove, onChange }) => {
    return (
      <div className="flow-root">
        <ul className="-my-6">
          {data.map((good) => (
            <Card
              key={good.nomenclature}
              data={good}
              onChange={onChange}
              onRemove={onRemove}
            />
          ))}
        </ul>
      </div>
    );
  },
);
export { CartProducts };
