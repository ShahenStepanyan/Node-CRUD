import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useNavigate, useParams } from "react-router-dom";
export default function Profile() {
  const navigate = useNavigate();

  const name = useSelector(function (state) {
    return state.currentUser.name;
  });
  const { id } = useParams();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    date: Date.now(),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`/api/profile/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData),
    });
    alert("Data Updated Successfully!");
    
      navigate("/home");

  };

  return (
    <form>
      <h1>{name}</h1>
      <div>
        <div>
          <h2>Date Account</h2>
          <h4>{inputData.date}</h4>
        </div>

        <div>
          <h2>UserEmail</h2>
          <input
            required
            type="text"
            value={inputData.email}
            onChange={(e) =>
              setInputData({ ...inputData, email: e.target.value })
            }
          />
          <Button onClick={handleSubmit} variant="outlined">
            <ChangeCircleIcon />
          </Button>
        </div>
        <div>
          <h2>Password</h2>
          <input
            required
            type="text"
            value={inputData.password}
            onChange={(e) =>
              setInputData({ ...inputData, password: e.target.value })
            }
          />
          <Button onClick={handleSubmit} variant="outlined">
            <ChangeCircleIcon />
          </Button>
        </div>
      </div>
    </form>
  );
}
