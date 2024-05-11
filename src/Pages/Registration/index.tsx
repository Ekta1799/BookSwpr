import React, { useState } from "react";
import { ROUTES } from "../../utils/constants";
import { errorToastWrapper } from "../../utils";
import "./styles.css";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type KeyValuePair = {
  [key: string]: string;
};

export type RegistrationResponse = {
  message: string;
  token: string;
  success: boolean;
  name: string | null;
};

const Registration = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<KeyValuePair>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors: KeyValuePair = {};
    if (!formData.username) {
      errors.fullName = "username is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://localhost:8080/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          const data = await response.json();
          setRegistrationStatus(data.message); // Assuming the response contains a message indicating successful registration
        } else {
          setRegistrationStatus('Registration failed');
        }
      } catch (err: any) {
        errorToastWrapper("Error while registration");
      }
    }
  };

  return (
    <div className = "main">
    <div className="container">
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="username"
          required
        />
        {errors.fullName && <p>{errors.fullName}</p>}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {errors.password && <p>{errors.password}</p>}
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Register</button>
        {registrationStatus && <p>{registrationStatus}</p>}
      </form>
      <p className="login-text">
        Already have an account? <a href={ROUTES.LOGIN}>Login here</a>
      </p>
    </div>
    </div>
  );
};

export default Registration;
