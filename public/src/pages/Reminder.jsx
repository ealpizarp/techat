import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { sendReminderRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Reminder() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", reminder: "", cellnumber:"", date:"", time:"" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };  

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, reminder,cellnumber,time } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (reminder === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (cellnumber === ""){
        toast.error("Cellphone required.", toastOptions);
      return false;
    }else if (time === ""){
        toast.error("time is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit =  async (event) => {
    event.preventDefault();
    if (validateForm()) {

      const { username, reminder, cellnumber,date,time } = values;

      console.log(values);

      const RObject = {
        username: username,
        reminder: reminder,
        cellnumber: cellnumber,
        date: date,
        time: time,
      }
      navigate("/");
      await axios.post(sendReminderRoute, RObject);
      
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Te<span class="light">ch</span><span class="dark">at</span></h1>
          </div>
          <input
            type="text"
            placeholder="Nombre"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="text"
            placeholder="Recordatorio"
            name="reminder"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="tel"
            placeholder="Numero Celular"
            name="cellnumber"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="date"
            placeholder="Fecha"
            name="date"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="time"
            placeholder="Hora"
            name="time"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Recordar</button>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #022B3A;
  overflow: hidden;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    .light{
      color: #d3d3d3;
    }

    .dark{
        color:#b1a7a6;
    }

    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #1F7A8C;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #BFDBF7;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #022B3A;
      outline: none;
    }
    ::placeholder{
      color: #124559;
    }
  }
  button {
    background-color: #022B3A;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #06bee1;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #06bee1;
      text-decoration: none;
      font-weight: bold;
    }
  }
  `;
