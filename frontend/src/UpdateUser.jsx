import React, { useState, useEffect } from "react";

function UpdateUser() {
    // Simulated existing user data (normally this would come from props or API)
    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        Age: ""
    });

    // Simulate data fetching with useEffect
    useEffect(() => {
        // This would be replaced by real API call
        const existingUser = {
            Name: "John Doe",
            Email: "johndoe@email.com",
            Age: 25
        };
        setFormData(existingUser);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated User:", formData);
        // Send updated data to backend or state
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className="w-50 bg-white p-3 rounded">
                <h2>Update User</h2>
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
                    <button className="btn btn-primary" type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
