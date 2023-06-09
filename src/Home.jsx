import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page of Mobiles</h1>
      <LoginForm />
    </div>
  );
}

function LoginForm() {

  const navigate = useNavigate();
  const [formState, setFormState] = useState("success");

  const {values, handleChange, handleSubmit} = useFormik({
    initialValues: {username: "", password: ""},
    onSubmit: async (values) => {
      console.log(values)

      const data = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values)
      })

      if(data.status === 401) {
        console.log("Error")
        setFormState("error")
      }
      else {
        const result = await data.json()
        console.log("Success", result)
        localStorage.setItem("token", result.token)
        navigate('/mobiles')
      }
    }
  })

  return (
    <form onSubmit={handleSubmit} className='login-form'>

      <h3>Login</h3>
      <div className='login-form-container'>
        <TextField 
          value={values.username}
          onChange={handleChange}
          name="username"
          label="Username" 
          variant="outlined" />
        <TextField 
          value={values.password}
          onChange={handleChange}
          name="password"
          label="Password" 
          variant="outlined" />
        <Button color={formState} type="submit" variant="contained">
          {formState === "success" ? "Submit" : "Retry"}
        </Button>
      </div>
    </form>
  )
}