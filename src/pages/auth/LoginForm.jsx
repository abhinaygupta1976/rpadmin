import React from "react";

export const LoginForm = ({
  handleChange,
  handleSubmit,
  loginRequest,
  loading,
  formErrors,
  apiError,
}) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="Username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              value={loginRequest.Username ? loginRequest.Username : ""}
            />
            {formErrors.username && (
              <p className="text-red-500 text-xs italic">
                {formErrors.username}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="Password"
              type="password"
              placeholder="******************"
              onChange={handleChange}
              value={loginRequest.Password ? loginRequest.Password : ""}
            />
            {formErrors.password && (
              <p className="text-red-500 text-xs italic">
                {formErrors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            {apiError.message && (
              <p className="text-red-500 text-xs italic">{apiError.message}</p>
            )}
            {loading ? (
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled
              >
                <svg
                  className="animate-spin h-2 w-5 mr-3 ..."
                  viewBox="0 0 20 20"
                ></svg>
                Processing...
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
