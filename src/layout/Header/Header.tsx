'use client';

import { FC, Fragment } from 'react';

import dynamic from 'next/dynamic';

import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Navbar } from 'src/modules/Navbar/Navbar';
import { Categories } from 'src/modules/Header/Categories';
import { TypeCategory } from 'src/types';
import { SearchModal } from 'src/modules/SearchModal/SearchModal';

import Logo from 'public/images/logo.png';

const Link = dynamic(() => import('../../components/Link/Link'), {
  ssr: false,
});

const HeaderCart = dynamic(
  () => import('src/components/HeaderCart/HeaderCart'),
  {
    ssr: false,
  },
);

type TypeHeaderProps = {
  categories: TypeCategory[];
};

const Header: FC<TypeHeaderProps> = ({ categories = [] }) => {
  return (
    <Fragment>
      <header className="border-b border-b-slate-200 lg:border-none">
        {/* <div className="flex h-10 items-center justify-center whitespace-nowrap border-b border-b-slate-200 bg-slate-50">
          <span className="text-sm text-slate-600 ">
            100% оригинальная продукция!
          </span>
        </div> */}
        <div className="container">
          <div className="flex items-center py-2">
            <div className="flex flex-[0_0_calc(100%_/_4)] items-center gap-4">
              <span className="flex items-center lg:hidden">
                <Navbar
                  categories={categories}
                  trigger={
                    <button>
                      <Bars3Icon className="h-7 w-7" />
                    </button>
                  }
                />
              </span>
              <SearchModal
                trigger={
                  <button>
                    <MagnifyingGlassIcon className="h-6 w-6" />
                  </button>
                }
              />
            </div>
            <div className="flex-[1_0_auto]">
              <Link href="/" className="flex justify-center">
                <span className="text-center  text-xl font-bold leading-5 tracking-tighter transition-opacity hover:opacity-80 lg:text-3xl">
                  <img src={Logo.src} className="h-16"/>
                </span>
              </Link>
            </div>
            <div className="flex flex-[0_0_calc(100%_/_4)] justify-end">
              <Link href="/cart">
                <HeaderCart />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <nav className="hidden border-t border-t-slate-200 lg:block">
        <Categories data={categories} />
      </nav>
    </Fragment>
  );
};

export { Header };
