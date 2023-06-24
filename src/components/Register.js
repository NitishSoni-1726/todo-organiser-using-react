import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
export default function Register() {
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [registration, setRegistration] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function updateToServer(data) {
    let response = await fetch(`/api/user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    response = await response.json();
    if (response.error) {
      setRegistrationStatus(response.error);
      setRegistration(true);
    } else {
      setRegistrationStatus(response.message);
      setRegistration(true);
    }
  }
  const onSubmit = (data) => {
    updateToServer(data);
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-center">
      <div
        className="border border-2 bg-secondary bg-opacity-25 text-light p-4 d-flex flex-column align-items-center"
        style={{ width: "40%" }}
      >
        {registration ? (
          <div
            className="w-100 text-center d-flex align-items-center justify-content-center"
            style={{ height: "100px", width: "25%" }}
          >
            {registrationStatus && (
              <div
                className="text-light"
                style={{ fontWeight: "650", fontSize: "20px" }}
              >
                {registrationStatus}
                {". "}
                <Link
                  className="text-primary onHover"
                  style={{ textDecoration: "none" }}
                  to="/login"
                >
                  {" "}
                  Click Here{" "}
                </Link>{" "}
                to Login
              </div>
            )}
          </div>
        ) : (
          <div className="w-100">
            <h1
              className="text-success text-center"
              style={{ fontFamily: "monospace", textDecoration: "underline" }}
            >
              Registration Form
            </h1>
            <form
              className="d-flex flex-column w-100 justify-content-center align-items-center"
              onSubmit={handleSubmit(onSubmit)}
              name="registration-form"
            >
              <div className="w-75 m-2">
                <label>
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  className="w-100 p-2 rounded bg-black bg-opacity-25 text-light border"
                  {...register("FirstName", { required: true })}
                ></input>
                {errors.FirstName && (
                  <span className="text-danger">This Field is Required</span>
                )}
              </div>
              <div className="w-75 m-2">
                <label>
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  className="w-100 p-2 rounded bg-black bg-opacity-25 text-light border"
                  {...register("LastName", { required: true })}
                ></input>
                {errors.LastName && (
                  <span className="text-danger">This Field is Required</span>
                )}
              </div>
              <div className="w-75 m-2">
                <label>
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="w-100 p-2 rounded bg-black bg-opacity-25 text-light border"
                  {...register("Email", {
                    required: true,
                  })}
                ></input>
                {errors.Email?.type === "required" && (
                  <span className="text-danger">This Field is Required</span>
                )}
              </div>
              <div className="w-75 m-2">
                <label>
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  className="w-100 p-2 rounded bg-black bg-opacity-25 text-light me-1 border"
                  style={{ width: "90.5%" }}
                  type="password"
                  {...register("Password", {
                    required: true,
                    minLength: 6,
                  })}
                ></input>
                {errors.Password?.type === "required" && (
                  <span className="text-danger">This Field is Required</span>
                )}
                {errors.Password?.type === "minLength" && (
                  <span className="text-danger">
                    Password Length should be atleast 6
                  </span>
                )}
              </div>

              <div className="d-flex w-75 justify-content-between align-items-center">
                <div className="mt-2">
                  Already Registered ?{" "}
                  <Link
                    className="onHover"
                    style={{
                      textDecoration: "none",
                      color: "red",
                      fontWeight: "500",
                    }}
                    to="/login"
                  >
                    Login Here
                  </Link>
                </div>
                <button
                  className="btn btn-success btn-lg mt-3 w-25"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
