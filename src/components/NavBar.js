import React from "react";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <div
      className="bg-black p-4"
      style={{
        height: "74px",
        position: "fixed",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "solid 2px white",
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
      <div className="d-flex align-items-center me-1">
        <Link to="/login" className="btn btn-outline-success btn-lg me-2">
          Login
        </Link>
        <h1 className="text-light">|</h1>
        <Link to="/register" className="btn btn-outline-danger btn-lg ms-2">
          Register
        </Link>
      </div>
    </div>
  );
}
