import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(`http://localhost:3001/getUser/${id}`);
                console.log("Fetched user data:", result.data); // Debug log
                
                // Check if the data exists and has the expected structure
                if (!result.data) {
                    throw new Error("No user data received");
                }

                // Access the user data correctly from the response
                const userData = result.data;
                setFormData({
                    name: userData.name || "",
                    email: userData.email || "",
                    age: userData.age || ""
                });
                setError(""); // Clear any previous errors
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Failed to fetch user data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        try {
            const response = await axios.put(`http://localhost:3001/updateUser/${id}`, formData);
            console.log("Update response:", response.data); // Debug log
            navigate('/');
        } catch (err) {
            console.error("Error updating user:", err);
            setError("Failed to update user. Please try again.");
        }
    };

    if (loading) return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    return (
        <div className="min-vh-100 bg-light py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card shadow-sm">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h2 className="card-title mb-0 text-primary">Update User</h2>
                                    <Link to="/" className="btn btn-outline-secondary btn-sm">
                                        <i className="bi bi-arrow-left me-1"></i>Back
                                    </Link>
                                </div>

                                {error && (
                                    <div className="alert alert-danger d-flex align-items-center" role="alert">
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
                                                name="name"
                                                className="form-control"
                                                value={formData.name}
                                                onChange={handleChange}
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
                                                name="email"
                                                className="form-control"
                                                value={formData.email}
                                                onChange={handleChange}
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
                                                name="age"
                                                className="form-control"
                                                value={formData.age}
                                                onChange={handleChange}
                                                placeholder="Enter age"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="d-grid">
                                        <button className="btn btn-primary" type="submit">
                                            <i className="bi bi-check-lg me-2"></i>Update User
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;
