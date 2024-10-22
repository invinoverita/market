import { FC, SelectHTMLAttributes } from 'react';

type TypeOption = {
  label: string;
  value: string | number;
};

type TypeSelectProps = {
  options?: TypeOption[];
  defaultValue?: string | number;
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select: FC<TypeSelectProps> = ({
  options = [],
  defaultValue,
  ...props
}) => {
  return (
    <select
      defaultValue={defaultValue}
      {...props}
      className="block w-full rounded-md border-gray-300 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >
      {options?.map((option, key) => (
        <option value={option.value} key={key}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export { Select };
