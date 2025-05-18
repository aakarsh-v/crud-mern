import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const result = await axios.get("http://localhost:3001/getUsers");
            setUsers(result.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const result = await axios.delete(`http://localhost:3001/deleteUser/${id}`);
                console.log("Deleted:", result.data);
                
                // Update local state first for immediate feedback
                setUsers(prevUsers => {
                    const updatedUsers = prevUsers.filter(user => user._id !== id);
                    console.log("Updated Users:", updatedUsers);
                    return updatedUsers;
                });

            } catch (err) {
                console.error(err);
                setError("Failed to delete user");
            }
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
                    <div className="col-12 col-lg-10">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h2 className="card-title mb-0 text-primary">User Management</h2>
                                    <Link to="/create" className="btn btn-primary">
                                        <i className="bi bi-plus-lg me-2"></i>Add New User
                                    </Link>
                                </div>

                                {error && (
                                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                        {error}
                                    </div>
                                )}

                                {users.length === 0 ? (
                                    <div className="text-center py-5">
                                        <i className="bi bi-people display-1 text-muted mb-3"></i>
                                        <p className="lead text-muted">No users found</p>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover align-middle">
                                            <thead className="table-light">
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Age</th>
                                                    <th scope="col" className="text-end">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user) => (
                                                    <tr key={user._id}>
                                                        <td className="fw-medium">{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.age}</td>
                                                        <td className="text-end">
                                                            <Link 
                                                                to={`/update/${user._id}`} 
                                                                className="btn btn-outline-primary btn-sm me-2"
                                                            >
                                                                <i className="bi bi-pencil me-1"></i>Edit
                                                            </Link>
                                                            <button 
                                                                onClick={() => handleDelete(user._id)} 
                                                                className="btn btn-outline-danger btn-sm"
                                                            >
                                                                <i className="bi bi-trash me-1"></i>Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;
