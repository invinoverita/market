import { FC, InputHTMLAttributes, ReactNode } from 'react';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

const Checkbox: FC<CheckboxProps> = ({ label, name, ...rest }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        name={name}
        className="h-4 w-4 rounded border-slate-200"
        {...rest}
        id={name}
      />
      <label
        htmlFor={name}
        className="ml-3 text-base font-normal text-slate-600"
      >
        {label}
      </label>
    </div>
  );
};

export { Checkbox };
