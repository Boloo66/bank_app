import { clsx, type ClassValue } from "clsx";
import { Control, FieldPath } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = (type: string) =>
  z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long")
      .optional(),
    firstName:
      type === "sign-in"
        ? z.string().min(1, "First name is required").optional()
        : z.string().min(1, "First name is required"),
    lastName:
      type === "sign-in"
        ? z.string().min(1, "Last name is required").optional()
        : z.string().min(1, "Last name is required"),
    address1:
      type === "sign-in"
        ? z.string().max(50, "Address is required").optional()
        : z.string().max(50, "Address is required"),
    state:
      type === "sign-in"
        ? z.string().min(2, "State is required").max(2).optional()
        : z.string().min(2, "State is required").max(2),
    postalCode:
      type === "sign-in"
        ? z
            .string()
            .min(1, "Postal code is required")
            .regex(/^\d{5}(-\d{4})?$/, "Invalid postal code format")
            .optional()
        : z
            .string()
            .min(1, "Postal code is required")
            .regex(/^\d{5}(-\d{4})?$/, "Invalid postal code format"),
    dateOfBirth:
      type === "sign-in"
        ? z
            .string()
            .min(1, "Date of birth is required")
            .regex(
              /^\d{4}-\d{2}-\d{2}$/,
              "Date of birth must be in YYYY-MM-DD format"
            )
            .optional()
        : z
            .string()
            .min(1, "Date of birth is required")
            .regex(
              /^\d{4}-\d{2}-\d{2}$/,
              "Date of birth must be in YYYY-MM-DD format"
            ),
    ssn:
      type === "sign-in"
        ? z
            .string()
            .min(1, "SSN is required")
            .regex(
              /^\d{3}-\d{2}-\d{4}$/,
              "SSN must be in the format XXX-XX-XXXX"
            )
            .optional()
        : z
            .string()
            .min(1, "SSN is required")
            .regex(
              /^\d{3}-\d{2}-\d{4}$/,
              "SSN must be in the format XXX-XX-XXXX"
            ),
    city:
      type === "sign-in"
        ? z.string().min(1, "City is required").optional()
        : z.string().min(1, "City is required"),
  });

const formSchema = authFormSchema("sign-in");
export interface AuthFormProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  message?: string;
}
