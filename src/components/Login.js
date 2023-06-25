import React, { useState } from "react";
import { useForm } from "react-hook-form";
export default function Login() {
  const { register, handleSubmit } = useForm();
  const [loginError, setLoginError] = useState(null);
  async function authenticate(data) {
    let response = await fetch("/api/authenticate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    response = await response.json();

    if (response.error) {
      setLoginError(response.error);
    } else {
      window.location.href = "/";
    }
    console.log(response);
  }
  const onSubmit = (data) => {
    authenticate(data);
  };
  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <div
        className="border d-flex flex-column align-items-center p-4 bg-secondary bg-opacity-25"
        style={{ width: "35%" }}
      >
        <h1
          className="text-danger"
          style={{ fontFamily: "monospace", textDecoration: "underline" }}
        >
          Login Form
        </h1>
        <form
          className="w-100 d-flex flex-column align-items-center mt-4 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-75 m-2">
            <label className="text-light">
              Email <span className="text-danger">*</span>
            </label>
            <input
              className="w-100 p-2 rounded bg-black bg-opacity-25 text-light border"
              {...register("Email", {
                required: true,
              })}
            ></input>
          </div>
          <div className="w-75 m-2">
            <label className="text-light">
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              className="w-100 p-2 rounded bg-black bg-opacity-25 text-light border"
              {...register("Password", {
                required: true,
              })}
            ></input>
          </div>
          <div className="w-75">
            {loginError && (
              <div className="text-danger" style={{ fontWeight: "650" }}>
                {loginError}.
              </div>
            )}
          </div>
          <div className="w-75 d-flex justify-content-end mt-4">
            <button className="btn btn-success btn-lg w-25" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
