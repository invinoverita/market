import Image from 'next/image';
import { FC, memo, ChangeEvent } from 'react';
import { TypeGood, TypeProduct } from 'src/types';

import { emptyUrl } from 'src/config/config';
import { Select } from 'src/components/UI';
import { getQuantityOptions } from 'src/lib/utils';

type TypeCardProps = {
  data: TypeGood;
  onChange: (data: TypeGood) => void;
  onRemove: (data: TypeGood) => void;
};

// eslint-disable-next-line react/display-name
const Card: FC<TypeCardProps> = memo(({ data, onChange, onRemove }) => {
  const handleChangeQuantity = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);

    onChange({
      ...data,
      quantity: value,
    });
  };

  const handleRemove = () => onRemove(data);

  return (
    <li className="flex border-b py-6">
      <div className="relative h-[6.5rem] w-[6.5rem] flex-shrink-0 sm:h-28 sm:w-28">
        <Image
          fill
          alt="alt"
          src={emptyUrl}
          className="rounded-md object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-[1_1_0%] flex-col sm:ml-6">
        <div className="">
          <div className="flex justify-between leading-5">
            <h4 className="line-clamp-2 font-medium tracking-tight">
              {data.nomenclature_name}
            </h4>
            <p className="ml-4 text-nowrap font-medium">
              {data.unit} / {data.unit_name}
            </p>
          </div>
          <div className="mt-1 line-clamp-1 text-sm text-slate-500">
            <p>{data?.description_short}</p>
          </div>
        </div>
        <div className="flex flex-[1_1_0%] items-end justify-between">
          <div className="mt-1">
            <Select
              value={data?.quantity ?? 1}
              onChange={handleChangeQuantity}
              options={getQuantityOptions()}
            />
          </div>
          <button className="font-medium text-blue-600" onClick={handleRemove}>
            <span>Удалить</span>
          </button>
        </div>
      </div>
    </li>
  );
});

export { Card };
