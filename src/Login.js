import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
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

    if(!hasError) {
      axios.post('http://localhost:8089/login', {
        email: values.email,
        password: values.password
      })
      .then(res=>{
         // Lưu token hoặc thông tin đăng nhập vào localStorage 
         localStorage.setItem('token', values.token);
        navigate('/home')
      })
      .catch((error) => {
        // Xử lý lỗi khi đăng nhập không thành công
        console.error('Lỗi đăng nhập:', error);
        // Hiển thị thông báo lỗi cho người dùng
        alert('Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.');
      });
    }else{
      console.log('Submitted values:', values);
    }
  };
  
  

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign-In</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'> 
            <label htmlFor='email'><strong>Email</strong></label>
            <input type='email' name='email'  placeholder='Enter email' 
            onChange={handleInput}
            className='form-control rounded-0' />
           {error.email && <span className='text-danger'>{error.email}</span>}
          </div>

          <div className='mb-3'> 
            <label htmlFor='password'><strong>Password</strong></label>
            <input type='password' name='password'  placeholder='Enter password'
             onChange={handleInput} className='form-control rounded-0' />
               {error.email && <span className='text-danger'>{error.email}</span>}
          </div>
          <button type='submit' className='btn btn-primary btn-success w-100 rounded-0'>Login</button>
          <p>You are agree aour terms and policies</p>
          <Link to="/signup" className='btn btn-default border w-100 bg-light'>Create Account </Link>
         
        </form>
        </div>
    </div>
  )
}

export default Login;
