import React from "react";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <div
      className="bg-black p-2"
      style={{
        height: "70px",
        position: "fixed",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link
        to="/"
        className="text-light"
        style={{
          textDecoration: "none",
          fontSize: "30px",
          fontWeight: "500",
          fontFamily: "monospace",
        }}
      >
        do<span className="text-danger">it</span> -{" "}
        <span className="text-success">Your To Do Organiser</span>
      </Link>
      <div className="d-flex align-items-center me-4">
        <Link to="/login" className="btn btn-outline-success btn-lg">
          Login
        </Link>
        <h1 className="text-light">|</h1>
        <Link to="/register" className="btn btn-outline-danger btn-lg">
          Register
        </Link>
      </div>
    </div>
  );
}
