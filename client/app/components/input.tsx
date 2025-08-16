import { HTMLInputTypeAttribute } from "react";

export default function Input(
  InputType: HTMLInputTypeAttribute,
  InputId: string,
  labelBody: string,
  InputPlaceholder: string
) {
  return (
    <div className="mb-5">
      <label
        htmlFor={InputId}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {labelBody}
      </label>
      <input
        type={InputType}
        id={InputId}
        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
        placeholder={InputPlaceholder}
        required
      />
    </div>
  );
}
