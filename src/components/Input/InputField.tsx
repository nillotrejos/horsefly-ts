import * as React from 'react';

interface InputFieldProps {
  name: string;
  placeholder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: any;
  value: any
}

const InputField = ({
  name,
  placeholder,
  type,
  onChange,
  className,
  value
}: InputFieldProps) => {
  return (
    <div className="form-group">
      <input
        id='citiesInput'
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoComplete='off'

      />
    </div>
  );
};

export default InputField;
