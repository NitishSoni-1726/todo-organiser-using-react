import React, { useState } from "react";
import { useForm } from "react-hook-form";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const loginForm = React.createRef();

  const onSubmit = (data) => {
    console.log(data);
    loginForm.current.reset();
  };
  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <div className="border w-50 d-flex flex-column align-items-center p-4">
        <h1 className="text-light" style={{ fontFamily: "monospace" }}>
          Login Form
        </h1>
        <form
          className="w-100 d-flex flex-column align-items-center"
          onSubmit={handleSubmit(onSubmit)}
          ref={loginForm}
        >
          <div className="w-75 m-2">
            <label className="text-light">
              Email <span className="text-danger">*</span>
            </label>
            <input
              className="w-100 p-2 rounded bg-transparent text-light border"
              {...register("Email", {
                required: true,
              })}
            ></input>
          </div>
          <div className="w-75 m-2">
            <label className="text-light">
              Password <span className="text-danger">*</span>
            </label>
            <div className="d-flex">
              <input
                className="p-2 rounded bg-transparent text-light me-1 border"
                style={{ width: "90.5%" }}
                type={showPassword ? "text" : "password"}
                {...register("Password", {
                  required: true,
                  minLength: 6,
                })}
              ></input>
              <button
                type="button"
                className="btn btn-outline-light btn ms-2"
                onMouseEnter={() => {
                  setShowPassword(!showPassword);
                }}
                onMouseLeave={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <i id="showpass" className="fa fa-eye icon"></i>
              </button>
            </div>
          </div>
          <button className="btn btn-success btn-lg mt-3" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
