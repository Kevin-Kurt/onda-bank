import { Input } from "./input";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { ChangeEvent, useState } from "react";

interface FormInputProps {
  placeholder: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  mask?: "currency";
}

export function FormInput({ placeholder, type = "text", register, error, mask }: FormInputProps) {
  const [value, setValue] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let val = e.target.value;
    if (mask === "currency") {
      val = val.replace(/\D/g, "");
      val = (Number(val) / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
    setValue(val);
    if (register.onChange) register.onChange(e);
  }

  return (
    <div>
      <Input
        placeholder={placeholder}
        type={type}
        {...register}
        value={mask === "currency" ? value : undefined}
        onChange={mask === "currency" ? handleChange : register.onChange}
        className={error ? "border-red-500" : ""}
      />
      {error?.message && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}