"use client";
import React, { useEffect, useState } from 'react'
import { getCookie } from '../../../helpers/helpers';
import Navbar from '../components/navbar';
import axios from 'axios';
import { faQuestion, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Addword from '../components/Addword';
import Link from 'next/link';
import Generate from '../generatequiz/page';



export default function page() {
  const [name, setName] = useState("");
  const [load, seload] = useState(true);
  useEffect(() => {

    axios.get('http://127.0.0.1:8000/api/usersInfo', { 
      headers :{ Authorization: `Bearer ${getCookie("authToken")}` }
      
    }).then((res) => {
      console.log(res.data);
     setName(res.data.user.name)
     seload(false);
    })

   
  })
   
  return (
    <div>
      <Navbar />
      <h2 className='display-5 usernameStyle'>

        <span>
          Welcome, {name.toUpperCase()}
          {
            load?(
              <div className="loading-spinner" style={{display:"inline-block"}}> </div>
            ):(
              ''
            )
          }
          
        </span>
        </h2>

          <div className='m-5'>
          < Addword />
          </div>



  
    </div>
  )
}