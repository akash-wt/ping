"use client";

import Input from "@/components/input";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import Google from "@/app/dashboard/social/google";
import Github from "@/app/dashboard/social/github";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  async function handleLogin() {
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/user/signin`, {
        username: username,
        password: password,
      });
      if (remember) {
        localStorage.setItem("token", res.data.jwt);
      } else {
        sessionStorage.setItem("token", res.data.jwt);
      }
      toast.success("Login successfully!");
    } catch (err) {
      toast.error(`Signup failed: ${err}`);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-950 px-4">
      <div className="max-w-md w-full  p-8  shadow-xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-light text-white mb-3">Welcome back!</h2>
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

          {/* Checkbox */}
          <div className="flex items-start pt-2">
            <div className="flex items-start mb-2">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  onChange={(e) => {
                    setRemember(e.target.checked);
                  }}
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.01]"
          >
            Login
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
          Don&#39;t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}
