import * as React from 'react';

interface InputFieldProps {
  name: string;
  placeholder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: any;
}

const InputField = ({
  name,
  placeholder,
  type,
  onChange,
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
      
      />
    </div>
  );
};

export default InputField;
