"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  InputType: "email" | "text" | "password";
  InputId: string;
  labelBody: string;
  InputPlaceholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Input({
  InputType,
  InputId,
  labelBody,
  InputPlaceholder,
  value,
  onChange,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const currentType =
    InputType === "password" ? (showPassword ? "text" : "password") : InputType;

  return (
    <div className="mb-5">
      <label
        htmlFor={InputId}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {labelBody}
      </label>

      {/* wrapper with flex */}
      <div className="relative flex items-center">
        <input
          type={currentType}
          id={InputId}
          className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={InputPlaceholder}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {/* Eye icon toggle */}
        {InputType === "password" && (
          <button
            type="button"
            className="absolute right-3 flex items-center justify-center h-full text-gray-500 dark:text-gray-300"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
