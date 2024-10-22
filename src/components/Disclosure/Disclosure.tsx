'use client';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { Disclosure as DisclosureHeadless } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

type TypeDisclosure = {
  trigger: ReactElement;
};

const Disclosure: FC<PropsWithChildren<TypeDisclosure>> = ({
  children,
  trigger,
}) => {
  return (
    <DisclosureHeadless>
      {({ open }) => (
        <>
          <DisclosureHeadless.Button className="flex items-center gap-2">
            {trigger}
            <ChevronUpIcon
              className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-slate-500`}
            />
          </DisclosureHeadless.Button>
          <DisclosureHeadless.Panel className="px-4 pb-2 text-sm text-gray-500 sm:px-6">
            {children}
          </DisclosureHeadless.Panel>
        </>
      )}
    </DisclosureHeadless>
  );
};

export { Disclosure };
