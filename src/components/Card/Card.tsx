import { API_URL } from 'src/config/config';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC } from 'react';
import { TypeProduct } from 'src/types';
import { emptyUrl } from 'src/config/config';

import { ButtonCart } from 'src/modules/ButtonCart/ButtonCart';

const Link = dynamic(() => import('../Link/Link'), { ssr: false });

type TypeCardProps = {
  data: TypeProduct;
  cardClassName?: string;
  type?: '';
};

const Card: FC<TypeCardProps> = ({ data, cardClassName = '' }) => {
  const image = data.pictures.length
    ? API_URL + '/' + data.pictures[0].url
    : emptyUrl;

  return (
    <div
      key={data.id}
      className={` flex flex-col border-b border-r border-slate-200 p-2 sm:p-3 xl:p-5 ${cardClassName}`}
    >
      <Link href={`/product/${data.id}`} className="h-full">
        <div className="relative overflow-hidden rounded-lg bg-gray-100 pb-[100%]">
          <Image src={image} alt={data.name} fill loading="lazy" />
          <div className="absolute bottom-3 right-3 rounded-md bg-white px-2">
            <p className="font-medium">
              {data.unit} / {data.unit_name}
            </p>
          </div>
        </div>
        <div>
          <h3 className="line-clamp-2 pt-4 font-medium leading-5">
            {data.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-400">
            {data.description_short}
          </p>
        </div>
      </Link>
      <div className="mt-2">
        <ButtonCart data={data} />
      </div>
    </div>
  );
};

export { Card };
