import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    let hasError = false;
  
    // Kiểm tra email
    if (values.email.trim() === '') {
      setError((prev) => ({ ...prev, email: 'Email is required' }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, email: '' }));
    }
  
    // Kiểm tra mật khẩu
    if (values.password.trim() === '') {
      setError((prev) => ({ ...prev, password: 'Password is required' }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, password: '' }));
    }
  
    // Kiểm tra xác nhận mật khẩu
    if (values.confirmPassword !== values.password) {
      setError((prev) => ({ ...prev, confirmPassword: 'Confirm password does not match' }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, confirmPassword: '' }));
    }
  
    if (!hasError) {
      axios
        .post('http://localhost:8089/signup', values)
        .then((res) => {
                // Lưu token hoặc thông tin đăng ký vào localStorage 
        localStorage.setItem('token', res.data.token);
      // Chuyển hướng đến trang login hoặc trang chủ
          navigate('/');
        })
        .catch((err) => {
          console.log('Loi tai khoan');
        });
    }
  };
  
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign-up</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'>
              <strong>Name</strong>
            </label>
            <input
              type='name'
              name='name'
              placeholder='Enter Name'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {error.name && <span className='text-danger'>{error.name}</span>}
          </div>
  
          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email</strong>
            </label>
            <input
              type='email'
              name='email'
              placeholder='Enter email'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {error.email && <span className='text-danger'>{error.email}</span>}
          </div>
  
          <div className='mb-3'>
            <label htmlFor='password'>
              <strong>Password</strong>
            </label>
            <input
              type='password'
              name='password'
              placeholder='Enter password'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {error.password && <span className='text-danger'>{error.password}</span>}
          </div>
  
          <div className='mb-3'>
            <label htmlFor='confirmPassword'>
              <strong>Confirm Password</strong>
            </label>
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm password'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {error.confirmPassword && (
              <span className='text-danger'>{error.confirmPassword}</span>
            )}
          </div>
  
          <button className='btn btn-primary btn-success w-100 rounded-0'>Sign up</button>
          <p>You are agree aour terms and policies</p>
          <Link to='/' className='btn btn-default border w-100 bg-light'>
            Login
          </Link>
        </form>
        </div>
    </div>
  )
};

export default Signup
