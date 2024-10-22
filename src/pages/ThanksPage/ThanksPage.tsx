import { FC } from 'react';

import dynamic from 'next/dynamic';

import CheckIcon from '@heroicons/react/24/outline/CheckIcon';
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';

const Link = dynamic(() => import('src/components/Link/Link'), {
  ssr: false,
});

const ThanksPage: FC<{ id: string }> = ({ id }) => {
  return (
    <section className="py-24">
      <div className="container h-full">
        <div className="flex h-full flex-col items-center justify-center">
          <div>
            <CheckIcon className="h-40 w-40 text-green-500" />
          </div>
          <div className="py-4">
            <h1 className="text-3xl font-bold tracking-tight">
              Номер заказа - №{id}
            </h1>
          </div>
          <div className="pb-4">
            <p className="text-center text-lg text-gray-500">
              Благодарим вас за ваш заказ! <br /> Мы очень ценим ваш выбор и
              доверие <br /> к нашей компании.
            </p>
          </div>
          <div>
            <Link href="/catalog/all" legacyBehavior>
              <a className="flex items-center gap-2">
                <ArrowLeftIcon className="h-4 w-4 text-blue-600" />
                <p className="text-lg text-blue-600">Продолжить покупки</p>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThanksPage;
