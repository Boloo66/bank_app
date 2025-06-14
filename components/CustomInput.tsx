import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { AuthFormProps } from "../lib/utils";

const CustomInput = ({
  control,
  name,
  label,
  message,
  placeholder,
}: AuthFormProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                className="input-class"
                type={name === "password" ? "password" : "text"}
              />
            </FormControl>
            <FormMessage className="mt-1 text-red-500">{message}</FormMessage>
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
