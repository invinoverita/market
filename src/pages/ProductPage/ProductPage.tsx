import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FC, Fragment } from 'react';
import { emptyUrl } from 'src/config/config';

import { API_URL } from 'src/config/config';

import { TypeProduct } from 'src/types';

import {
  Breadcrumbs,
  type TypeBreadcrumbsProps,
} from 'src/components/Breadcrumbs/Breadcrumbs';
import { ButtonCart } from 'src/modules/ButtonCart/ButtonCart';

type TypeProductPageProps = {
  data: TypeProduct;
};

const HistoryProducts = dynamic(
  () => import('../../modules/HistoryPruducts/HistoryProducts'),
  {
    ssr: false,
  },
);

const ProductPage: FC<TypeProductPageProps> = ({ data }) => {
  const image = data?.pictures.length
    ? API_URL + '/' + data.pictures[0].url
    : emptyUrl;

  const breadcrumbsItems: TypeBreadcrumbsProps['data'] = [
    {
      name: 'Главная',
      link: '/',
    },
    {
      name: 'Каталог',
      link: '/catalog/all',
    },
    {
      name: data?.name ?? '',
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs data={breadcrumbsItems} />
      <section className="lg:mt-16">
        <div className="lg:container">
          <div className="grid-cols-2 lg:grid">
            <div className="relative w-full pb-[100%] lg:border">
              <Image src={image} alt={data?.name ?? 'alt'} fill priority />
            </div>
            <div className="p-6 lg:p-8">
              <h1 className="text-3xl font-bold tracking-tight">
                {data?.name}
              </h1>
              <div className="mt-3">
                <p className="text-3xl tracking-tight">
                  {data?.unit} / {data?.unit_name}
                </p>
              </div>
              <div className="mt-6 text-base text-gray-500">
                <p>{data?.description_long}</p>
              </div>
              {data ? (
                <div className="mt-10">
                  <ButtonCart data={data} type="product" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      {data && <HistoryProducts product={data} />}
    </Fragment>
  );
};

export default ProductPage;
