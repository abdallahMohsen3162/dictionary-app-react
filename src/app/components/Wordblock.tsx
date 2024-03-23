import React, { useEffect, useState } from 'react'
import "../../styling/word.css"
import { getCookie } from '../../../helpers/helpers';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Word } from '../../../types';

let shortcut = "";

export default function Wordblock(params: {params: Word}) {
   console.log("mine",params);
   const [show, setshow] = useState(false);
   const router = useRouter();
   useEffect(() => {
      let sz = params.params.eng.length;
      if(sz >= 20){
         shortcut = params.params.eng.slice(0, 20);
         shortcut+='...';
      }else{
         shortcut = params.params.eng;
      }
      console.log(shortcut);
      
   }, [])
  
   const fire = () => {
      let wordID = params.params.id , myToken = getCookie("authToken");
      let headers = {
         'Authorization': `Bearer ${myToken}`
      };
      axios.delete("http://127.0.0.1:8000/api/deleteWord", {
      headers: headers,
      params: {
         "wordId": wordID
      }
   }).then(response => {
      console.log(response.data);
      if(response.status == 200){window.location.href = '';}
   })
      
   }

   const hadleDelete = () => {
      
      Swal.fire({
         title: "Delete ?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#d33",
         cancelButtonColor: "#3085d6",
         confirmButtonText: "YES"
       }).then((result) => {
         if (result.isConfirmed) {
           fire();
         }
       });

   }
  return (
    <div className={`box ${show? 'fly':''}`} >
      <h4 onClick={() => setshow(!show)}>
         {
            show?(
               <>{params.params.eng}</>
            ):(
               <>
               {params.params.eng.slice(0, Math.min(20,params.params.eng.length)) + '....'}
               </>
            )
         }
         
         </h4>
      <br style={{backgroundColor:"white"}}/>
      {  
         (show) ? (
            <div className='popup'>
               <h6>{params.params.ar}</h6>
               <p className='text-white-50'>{params.params.description}</p>
               <h6>category: {params.params.category}</h6>
               <button onClick={hadleDelete} className='btn btn-danger'>Del</button>
            </div>
         ):(
            ''
         )
      }
    </div>
  )
}
