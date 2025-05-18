import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Users.css';

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
            <div className="spinner-border loading-spinner" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    return (
        <div className="page-container">
            <div className="container">
                <h1 className="app-title">User Management</h1>
                <p className="app-subtitle">A simple interface to view user data.</p>
                
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h2 className="mb-0">User List</h2>
                                <Link to="/create" className="btn btn-primary">
                                    <i className="bi bi-plus-lg me-2"></i>Add User
                                </Link>
                            </div>
                            
                            <div className="card-body p-0">
                                {error && (
                                    <div className="alert alert-danger m-3" role="alert">
                                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                        {error}
                                    </div>
                                )}

                                {users.length === 0 ? (
                                    <div className="empty-state">
                                        <i className="bi bi-people"></i>
                                        <p>No users found</p>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>NAME</th>
                                                    <th>EMAIL</th>
                                                    <th>AGE</th>
                                                    <th className="text-end">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user) => (
                                                    <tr key={user._id}>
                                                        <td className="user-name">{user.name}</td>
                                                        <td className="user-email">{user.email}</td>
                                                        <td>{user.age}</td>
                                                        <td>
                                                            <div className="action-buttons">
                                                                <Link 
                                                                    to={`/update/${user._id}`} 
                                                                    className="btn btn-outline-primary btn-sm"
                                                                >
                                                                    Update
                                                                </Link>
                                                                <button 
                                                                    onClick={() => handleDelete(user._id)} 
                                                                    className="btn btn-outline-danger btn-sm"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
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
