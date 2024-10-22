'use client';
import { useState, FC, cloneElement, ReactElement, Fragment } from 'react';
import { Drawer } from 'src/components/Drawer/Drawer';

import { XMarkIcon } from '@heroicons/react/24/outline';

type TypeNavbarProps = {
  trigger: ReactElement;
  categories: TypeCategory[];
};

import { Categories } from '../Header/Categories';
import { TypeCategory } from 'src/types';

const Navbar: FC<TypeNavbarProps> = ({ trigger, categories }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);

  const ButtonTriggerDrawer = cloneElement(trigger, {
    onClick: () => handleToggle(),
  });

  return (
    <Fragment>
      {ButtonTriggerDrawer}
      <Drawer open={open} setOpen={setOpen}>
        <div className="pointer-events-auto h-full w-full max-w-80 bg-white">
          <div className="flex h-full flex-col justify-between">
            <div className="flex justify-end p-2">
              <button onClick={handleToggle}>
                <XMarkIcon className="h-7 w-7" />
              </button>
            </div>
            <div className="h-full">
              <div className="h-full overflow-y-auto">
                <Categories data={categories} onClose={() => setOpen(false)} />
              </div>
            </div>
            <div className="border-t px-4 py-2">
              <span>© {new Date().getFullYear()} Все права защищены.</span>
            </div>
          </div>
        </div>
      </Drawer>
    </Fragment>
  );
};

export { Navbar };
