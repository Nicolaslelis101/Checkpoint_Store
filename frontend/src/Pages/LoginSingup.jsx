import React, { useState } from 'react';
import './CSS/LoginSignup.css';

export const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [loginAttempts, setLoginAttempts] = useState(0);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const login = async () => {
    console.log("Login Executado!", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
      setLoginAttempts(loginAttempts + 1);

      if (loginAttempts >= 2) {
        alert("Muitas tentativas de login falharam. Por favor, tente novamente mais tarde.");
        setTimeout(() => setLoginAttempts(0), 30000);  // Atraso de 30 segundos após 3 tentativas falhadas
      }
    }
  }

  const signup = async () => {
    console.log("Signup Executado!", formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  }

  return (
    <div>
      <div className="loginsingnup">
        <div className="loginsignup-container">
          <h1>{state}</h1>
          <div className="loginsignup-fields">
            {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Seu Nome Completo' /> : <></>}
            <input name='email' value={formData.email} type="email" onChange={changeHandler} placeholder='Seu Email' />
            <input name='password' value={formData.password} type="password" onChange={changeHandler} placeholder='Sua Senha' />
          </div>
          <button onClick={() => { state === "Login" ? login() : signup() }}>Continuar</button>
          {state === "Sign Up"
            ? <p className='loginsignup-login'>Já tem uma conta? <span onClick={() => { setState("Login") }}>Faça o Login aqui!</span></p>
            : <p className='loginsignup-login'>Quer criar uma conta? <span onClick={() => { setState("Sign Up") }}>Clique aqui!</span></p>
          }
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>Para continuar aceite a política de termos de uso e privacidade</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup;
