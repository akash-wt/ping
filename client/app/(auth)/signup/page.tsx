"use client";

import Input from "@/components/input";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import Google from "@/app/dashboard/social/google";
import Github from "@/app/dashboard/social/github";
import { redirect } from "next/navigation";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  async function handleRegister() {
    if (!username || !password || !repeatPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/user/signup`, {
        username: username,
        password: password,
      });
      toast.success("Account created successfully!");
      redirect("/login");
    } catch (err) {
      toast.error(`Signup failed: ${err}`);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-950 px-4">
      <div className="max-w-md w-full  p-8  shadow-xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-light text-white mb-3">
            Create account
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <Input
            InputType="email"
            InputId="username"
            labelBody="Email"
            InputPlaceholder="Enter your email"
            value={username}
            onChange={setUsername}
          />

          <Input
            InputType="password"
            InputId="password"
            labelBody="Password"
            InputPlaceholder="Create password"
            value={password}
            onChange={setPassword}
          />

          <Input
            InputType="password"
            InputId="repeat-password"
            labelBody="Confirm"
            InputPlaceholder="Confirm password"
            value={repeatPassword}
            onChange={setRepeatPassword}
          />

          {/* Checkbox */}
          <div className="flex items-start pt-2">
            <div className="flex items-center h-5">
              <input
                id="agree"
                type="checkbox"
                className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500 focus:ring-2"
              />
            </div>
            <label
              htmlFor="agree"
              className="ml-3 text-sm text-gray-400 leading-relaxed"
            >
              I agree to the{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.01]"
          >
            Create account
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-500">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            <Google />
            <Github />
          </div>
        </div>

        {/* Sign in link */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
