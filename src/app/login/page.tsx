"use client"
import React, { useState } from 'react';
import { setCookie } from '../../../helpers/helpers';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
export default function login() {
  const [username, setusername] = useState("");
  const [password, setpass] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setloading] = useState(false);
  const r = useRouter();

  const logger = () => {
    if(!username || !password) {
      return;
    }
    setloading(true);
    axios.post("http://127.0.0.1:8000/api/login",{"email":username, "password":password})
    .then((res) => {
      console.log(res);
      setloading(false);
      if(res.status == 200){
        setCookie('authToken', res.data.token, 60);
        setErr(false);
        r.push("/");
      }else{
        setErr(true);
      }
      
    })
    
    
  }
  console.log(username, password);
  
  return (
    <div>
      <h1 className='text-center bg-dark'>
        login
      </h1>


      <div className='text-center'>
        <br />
        <input 
        type="text" 
        placeholder='mail'
        className='p-1'
        onChange={(e) => setusername(e.target.value)}
        required
        />

        <br />
        <input 
        type="password" 
        placeholder='Password'
        className='p-1'
        onChange={(e) => setpass(e.target.value)}
        required
        />

        <br /> <br />
        <button className='btn btn-success' onClick={logger}>login</button>
        <Link href="/register" className='p-2'>
          Create new acount
        </Link>
        <Link href={"/forgot"}>
          Forgot the password
        </Link>
      </div>
      
      
      {
        (err)?(
          <h4 className='text-danger text-center'>Error</h4>
        ):(
          ''
        )
      }

      {
        (loading)?(
          <div className="loading-spinner" style={{margin:"auto"}}>

      </div>
        ):(
          ''
        )
      }
      
      
    </div>
  )
}
