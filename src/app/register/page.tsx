"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { setCookie } from '../../../helpers/helpers';
import { useRouter } from 'next/navigation';

export default function register() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const r = useRouter();
  const HandleRegister = () => {
    console.log("HNDL");
    
    if(!username || !password || !email)
    console.log("after");
    
    axios.post("http://127.0.0.1:8000/api/register",{"email":email, "password":password, "name":username})
    .then((res) => {
      console.log(res);
      console.log(res.data);
      setCookie('authToken', res.data.token, 60);
      r.push("/");
    })
  }
  
  return (
    <div>
      <h1 className='text-center bg-dark'>
        Register
      </h1>


      <div className='text-center'>
        <br />
        <input 
        type="username" 
        placeholder='username'
        className='p-1'
        onChange={(e) => setusername(e.target.value)}
        />
        <br />
        <input 
        type="text" 
        placeholder='mail'
        className='p-1'
        onChange={(e) => setemail(e.target.value)}
        />
        <br />
        <input 
        type="password" 
        placeholder='Password'
        className='p-1'
        onChange={(e) => setpassword(e.target.value)}
        />



        <br /> <br />
        <button className='btn btn-danger' onClick={HandleRegister}>Register</button>

        <Link href="/login" className='p-3'>
          login
        </Link>
      </div>
      
    </div>
  )
}
