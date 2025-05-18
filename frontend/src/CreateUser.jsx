import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './UpdateUser.css'; // We can reuse the UpdateUser styles

function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        try {
            const result = await axios.post("http://localhost:3001/createUser", {
                name, email, age
            });
            console.log("Create response:", result.data);
            navigate('/');
        } catch (err) {
            console.error("Error creating user:", err);
            setError("Failed to create user. Please try again.");
        }
    }

    return (
        <div className="update-container">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="update-card">
                            <div className="update-header">
                                <h2 className="update-title">Create User</h2>
                                <Link to="/" className="btn btn-outline-secondary btn-back">
                                    <i className="bi bi-arrow-left me-2"></i>Back
                                </Link>
                            </div>

                            <div className="form-container">
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-person"></i>
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter name"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-envelope"></i>
                                            </span>
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter email"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Age</label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-calendar"></i>
                                            </span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                                placeholder="Enter age"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary submit-button">
                                        <i className="bi bi-plus-lg me-2"></i>Create User
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;
