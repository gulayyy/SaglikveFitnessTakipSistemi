// src/components/Register.jsx
import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form verilerini backend'e gönderme
    fetch("http://localhost:5250/api/User", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserName: formData.userName,
        Email: formData.email,
        PasswordHash: formData.password,
        Age: parseInt(formData.age),
        Height: parseFloat(formData.height),
        Weight: parseFloat(formData.weight),
        Gender: formData.gender,
        CreatedAt: new Date().toISOString(), // Varsayılan olarak atandı
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Kayıt başarılı!");
          setFormData({
            userName: "",
            email: "",
            password: "",
            age: "",
            height: "",
            weight: "",
            gender: "",
          });
        } else {
          alert("Kayıt başarısız!");
        }
      })
      .catch((error) => {
        console.error("Kayıt hatası:", error);
        alert("Bir hata oluştu.");
      });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-lg border border-purple-300">
        <h1 className="text-2xl font-extrabold text-purple-600 text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-purple-700">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-purple-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-purple-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-purple-700">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-purple-700">
              Height (cm)
            </label>
            <input
              type="number"
              step="0.01"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-purple-700">
              Weight (kg)
            </label>
            <input
              type="number"
              step="0.01"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-purple-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-purple-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default Register;