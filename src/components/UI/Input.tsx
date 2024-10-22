import { FC, InputHTMLAttributes, ReactNode } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name?: string;
  label?: string;
  rightAddons?: ReactNode;
  inputClassName?: string;
};

const Input: FC<InputProps> = ({
  label,
  name,
  rightAddons,
  inputClassName,
  ...rest
}) => {
  return (
    <div className="relative flex flex-col">
      {!!label && (
        <label className="text-xs text-slate-500 sm:text-sm" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={`${rightAddons ? 'pr-28' : 'pr-4'} w-full border-0 border-b bg-transparent py-1.5 pl-0 text-sm focus:ring-0 sm:py-2 sm:text-base ${inputClassName}`}
        id={name}
        {...rest}
      />
      <div className="absolute bottom-1.5 right-0 z-10 sm:bottom-2">
        {rightAddons}
      </div>
    </div>
  );
};

export { Input };
