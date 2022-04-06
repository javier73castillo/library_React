import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { API } from "../../shared/services/api";
import { useNavigate } from "react-router-dom";
import { JwtContext } from "../../shared/contexts/JwtContext";
import { useContext } from "react";

export const LoginForm = () => {
  const [value, setValue] = useState(true);
  let navigate = useNavigate();
  const { setJwt } = useContext(JwtContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {
    controlForm(formData);
    API.post("login", formData).then((response) => {
      console.log(response.data);
      setJwt(response.data);
      localStorage.setItem("token", response.data);
      navigate("/");
    });
  };

  const controlForm = (e) => {
    console.log(e);
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input
        type="email"
        name="email"
        {...register("email", {
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        })}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        {...register("password", {
          required: true,
          pattern:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
        })}
      />
      <button className="botonSubmit">Login</button>

      {value !== true && (
        <h1 className="warning">Todos los campos son obligatorios</h1>
      )}
    </form>
  );
};
