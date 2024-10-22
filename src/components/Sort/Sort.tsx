'use client';
import { Fragment, FC } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

type TypeValueVariant = 'popular' | 'price-' | 'price+';

export type TypeVariant = {
  label: string;
  value: TypeValueVariant;
};

const variants: TypeVariant[] = [
  {
    label: 'Популярное',
    value: 'popular',
  },
  {
    label: 'Цена: По убыванию',
    value: 'price-',
  },
  {
    label: 'Цена: По возрастанию',
    value: 'price+',
  },
];

type TypeSortProps = {
  onChange?: (value: TypeVariant) => void;
};

const Sort: FC<TypeSortProps> = ({ onChange }) => {
  const handleSelect = (variant: TypeVariant) => {
    if (onChange) {
      onChange(variant);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
          Сортировка
          <ChevronDownIcon
            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </Menu.Button>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {variants.map((variant) => (
              <Menu.Item key={variant.value}>
                <li
                  onClick={() => handleSelect(variant)}
                  className={
                    'block cursor-pointer px-4 py-2 text-sm hover:bg-slate-50'
                  }
                >
                  {variant.label}
                </li>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export { Sort };
