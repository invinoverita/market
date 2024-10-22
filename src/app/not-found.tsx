import dynamic from 'next/dynamic';

import { Metadata } from 'next';

const Link = dynamic(() => import('../components/Link/Link'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: '404',
  description: 'Что-то пошло не так',
};
const NotFound = () => {
  return (
    <section className="flex h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Страница не найдена
        </h1>
        <p className="mt-4 text-base leading-5 text-gray-600">
          К сожалению, мы не смогли найти
          <br />
          страницу, которую вы ищете.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <Link
            href="/catalog/all"
            className="rounded-md bg-slate-200 px-6 py-2.5 text-sm font-semibold  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
