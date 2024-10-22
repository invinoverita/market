'use client';
import { FC, ReactElement, useState, cloneElement, Fragment } from 'react';
import { Drawer } from 'src/components/Drawer/Drawer';
import { TypeCategory } from 'src/types';
import { CategoriesFilter } from '../Filter/CategoriesFilter';

import { XMarkIcon } from '@heroicons/react/24/outline';

type TypeMobileFilterProps = {
  categories: TypeCategory[];
  category_id: string;
  trigger: ReactElement;
};

const MobileFilter: FC<TypeMobileFilterProps> = ({
  categories,
  category_id,
  trigger,
}) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);

  const ButtonTriggerDrawer = cloneElement(trigger, {
    onClick: () => handleToggle(),
  });

  return (
    <Fragment>
      {ButtonTriggerDrawer}
      <div>
        <Drawer open={open} setOpen={setOpen}>
          <div className="pointer-events-auto relative h-full w-full max-w-80 bg-white">
            <div className="absolute right-3 top-3">
              <button onClick={handleToggle}>
                <XMarkIcon className="h-7 w-7" />
              </button>
            </div>
            <div className="px-4 pt-4">
              <legend className="font-medium tracking-tight">Категории</legend>
            </div>
            <div className="mt-3 px-4">
              <CategoriesFilter
                categories={categories}
                category_id={category_id}
              />
            </div>
          </div>
        </Drawer>
      </div>
    </Fragment>
  );
};

export { MobileFilter };
