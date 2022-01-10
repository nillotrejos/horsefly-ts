import * as React from 'react';

interface InputFieldProps {
  name: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: any;
}

const InputField = ({
  name,
  placeholder,
  type,
  onChange,
  value,
  className
}: InputFieldProps) => {
  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputField;
