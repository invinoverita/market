'use client';
import { Fragment, FC, PropsWithChildren } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { TypeCategory } from 'src/types';

import Link from '../Link/Link';

type PropsCategories = {
  id: number;
  name: string;
  subcategories: {
    name: string;
    description: string;
    code: number;
    status: boolean;
    id: number;
    updated_at: number;
    created_at: number;
  }[] | null;
}

type PropsDropdown = {
  data: (TypeCategory | PropsCategories)[];
};

const Dropdown: FC<PropsWithChildren<PropsDropdown>> = ({
  children,
  data = [],
}) => {
  return (
    <Fragment>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>{children}</Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="grid grid-cols-1 px-1 py-1">
              {data.map((item) => (
                <Menu.Item key={item.id}>
                  {({ active }) => (
                    <Link
                      href={`/catalog/${item.id}`}
                      className={`${active ? 'bg-gray-100' : 'bg-white'
                        } group flex w-full items-center truncate rounded-md px-2 py-2 overflow-hidden`}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </Fragment>
  );
};

export { Dropdown };
