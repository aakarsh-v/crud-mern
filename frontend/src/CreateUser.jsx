import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        
        axios.post("http://localhost:3001/createUser", {
            name, email, age
        })
        .then(result => {
            console.log(result);
            navigate('/');
        })
        .catch(err => {
            console.log(err);
            setError("Failed to create user. Please try again.");
        });
    }

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className="w-50 bg-white p-3 rounded">
                <h2>Create User</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Age</label>
                        <input
                            type="number"
                            className="form-control"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </div>
                    <button className="btn btn-success" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
