import React, { useState } from "react";

function CreateUser() {
    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        Age: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Created:", formData);
        // Here you can send `formData` to your backend or update state in parent component
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className="w-50 bg-white p-3 rounded">
                <h2>Create User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            type="text"
                            name="Name"
                            className="form-control"
                            value={formData.Name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            name="Email"
                            className="form-control"
                            value={formData.Email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Age</label>
                        <input
                            type="number"
                            name="Age"
                            className="form-control"
                            value={formData.Age}
                            onChange={handleChange}
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
