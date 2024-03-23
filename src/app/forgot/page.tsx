"use client";
import React, { useState } from 'react'

export default function forgot() {
   const [counter, setcounter] = useState(0);
   const [email , setmail] = useState("");
   const handleCode = () => {
      setcounter(p => p + 1)

   }
   console.log(email);
   
  return (
    <div>
      {
         counter == 0?(
            <div>
               <input type="email" placeholder='Email' onChange={(e)=>setmail(e.target.value)}/>

               <button className='btn btn-danger' onClick={() => handleCode()}>send code</button>
            </div>
         ):(
            <div>
               <input type="text" placeholder='code' />
            </div>
         )
      }

      
    </div>
  )
}
