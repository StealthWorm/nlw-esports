import { HTMLAttributes, InputHTMLAttributes } from 'react';
import { UseFormRegister, FieldValues, FieldErrorsImpl, FieldError, Merge } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export type FormValues = {
  name: string;
  game: string;
};

export function Input({ id, register, errors, required = false, ...rest }: InputProps) {
  return (
    <>
      <input
        id={id}
        className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500  ${errors ? "outline-none border border-red-500" : ""}`}
        {...rest}
        {...register(id, { required })}
      />
      {errors && <span className="text-[12px] text-red-500 -mt-1">Campo obrigatório</span>}
    </>
  )
}