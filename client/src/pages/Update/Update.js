
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";

function Update() {
  const { id } = useParams();

  const [inputData, setInputData] = useState({
    title: "",
    body: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/api/posts/update/${id}`)
      .then((res) => setInputData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
     await fetch(`/api/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData),
    });

    alert("successfully")
    navigate("/home")
  };

  return (
    <div>
      <Header />
      <div>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id">ID: {id}</label>
          
          </div>
          <div>
            <label htmlFor="name">Title</label>
            <input
              required
              type="text"
              name="name"
              value={inputData.title}
              onChange={(e) =>
                setInputData({ ...inputData, title: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="email">Body</label>
            <input
              required
              type="text"
              name="email"
              value={inputData.body}
              onChange={(e) =>
                setInputData({ ...inputData, body: e.target.value })
              }
            />
          </div>
          <br />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
