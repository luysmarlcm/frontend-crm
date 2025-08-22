// components/LoginForm.js

import React from 'react';

const LoginForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Hi,</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-8">Welcome back</h2>
        <form>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-md bg-gray-100 border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition-colors"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md bg-gray-100 border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition-colors"
            />
          </div>
          <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-blue-600" />
              Remember me
            </label>
            <a href="#" className="hover:underline text-blue-600">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
          >
            LOGIN
          </button>
        </form>
        <div className="text-center mt-6 text-sm">
          Don't have account?{' '}
          <a href="#" className="font-semibold text-blue-600 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;