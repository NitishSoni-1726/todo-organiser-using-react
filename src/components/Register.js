import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [registartion, setRegistration] = useState(false);
  const registrationForm = React.createRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function updateToServer(data) {
    fetch(`http://localhost:4000/api/user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  const onSubmit = (data) => {
    updateToServer(data);
    registrationForm.current.reset();
    setRegistration(true);
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-center">
      <div className="border border-2 bg-transparent w-50 text-light p-4 d-flex flex-column align-items-center">
        <h1 className="text-light" style={{ fontFamily: "monospace" }}>
          Registration Form
        </h1>
        {registartion ? (
          <div
            className="bg-success w-100 text-center p-4 border"
            style={{ fontWeight: "800" }}
          >
            Registration Successfull
            <Link
              className="onHover"
              style={{ textDecoration: "none", color: "black" }}
              to="/login"
              onClick={() => {
                setRegistration(false);
              }}
            >
              {" "}
              Click Here{" "}
            </Link>{" "}
            to Login
          </div>
        ) : null}
        <form
          className="d-flex flex-column w-100 justify-content-center align-items-center"
          onSubmit={handleSubmit(onSubmit)}
          name="registration-form"
          ref={registrationForm}
        >
          <div className="w-75 m-2">
            <label>
              First Name <span className="text-danger">*</span>
            </label>
            <input
              className="w-100 p-2 rounded bg-transparent text-light border"
              {...register("FirstName", { required: true })}
            ></input>
          </div>
          <div className="w-75 m-2">
            <label>
              Last Name <span className="text-danger">*</span>
            </label>
            <input
              className="w-100 p-2 rounded bg-transparent text-light border"
              {...register("LastName", { required: true })}
            ></input>
          </div>
          <div className="w-75 m-2">
            <label>
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
            <label>
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
          {(errors.Password?.type === "required" ||
            errors.FirstName ||
            errors.LastName ||
            errors.Email?.type === "required") && (
            <span className="text-danger">Invalid Inputs</span>
          )}
          {errors.Password?.type === "minLength" && (
            <span className="text-danger">
              Password Length should be atleast 6
            </span>
          )}

          <button className="btn btn-success btn-lg mt-3" type="submit">
            Register
          </button>
        </form>
        <div className="mt-2">
          Already Registered ?{" "}
          <Link
            className="onHover"
            style={{ textDecoration: "none", color: "red" }}
            to="/login"
            onClick={() => {
              setRegistration(false);
            }}
          >
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}
