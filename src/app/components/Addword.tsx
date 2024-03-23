"use client";
import "../../styling/newWord.css"
import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import { getCookie } from "../../../helpers/helpers";
let st = new Set<string>();
let arr: any[] = [];
export default function Addword() {
   const [ready, setready] = useState(false);
   const [load, setload] = useState(false);
   const [cnt, setcnt] = useState(0);
   //word params
   const [eng, seteng] = useState("");
   const [ar, setar] = useState("");
   const [desc, setdesc] = useState("");
   const [categ, setcateg] = useState("general");
   const [newcat, setnewcat] = useState('');

   useEffect(() => {
      axios.get("http://127.0.0.1:8000/api/getAllwords",
      {
        headers: {Authorization: `Bearer ${getCookie("authToken")}`}
      }
      ).then((res) => {
        arr = res.data.words
        for(let i = 0; i < arr.length; i++){
          st.add(arr[i].category)
        }
        console.log(st);

      
        setcnt(cnt + 1);
      })
    }, [])

   console.log(eng, ar, desc, categ);

   const Shoot = () => {
      
      if(!eng || !ar || !desc){
         return;
      }
      let category_ = "";
      if(newcat){
         category_ = newcat;
      }else{
         category_ = categ;
      }
      let postData = {
         "english":eng, "arabic":ar, "description":desc,"category":category_
      }

      let url = "http://127.0.0.1:8000/api/addWord";
      console.log(getCookie("authToken"));
      
      let headers = {
         'Authorization': `Bearer ${getCookie("authToken")}`
      };
      setload(true);
      axios.post(url, postData, { headers })
      .then(response => {

         if(response.status === 200){
            setload(false);
         }
         console.log('Response:', response.data);
      })
      .catch(error => {
         console.error('Error:', error);
      });
   }
   


  return (
    <div >
      <button onClick={() => setready(!ready)} className='btn btn-primary'>
            +
      </button>
      {  
      (ready) ? (
         <div className='newWord' >
            <input 
            type="text"
            placeholder='English'
            onChange={(e) => seteng(e.target.value)}
             />
            <input 
            type="text"
            placeholder='عربي'
            name="arabic-text"
            onChange={(e) => setar(e.target.value)}
             />

            <textarea placeholder="description" onChange={(e) => setdesc(e.target.value)}>
            </textarea>

            <input 
            type="text"
            placeholder='category'
            name="arabic-text"
            onChange={(e) => setnewcat(e.target.value)}
             />





            <select onChange={(e) => setcateg(e.target.value)}>
               {
                  (cnt) ? (
                     Array.from(st).map((el, idx) => {
                        return(
                           <option value={el} key={`${el}-opt`}>{el} </option>
                        )
                     })
                  ) : (
                     ''
                  )
               }
               
            </select>

            <button className="btn btn-primary" onClick={Shoot}>insert</button>
         </div>
      ):(
         ''
      )
      }
      {
         load?(
            <div className="loading-spinner" style={{margin:"auto"}}>

      </div>
         ):(
            ''
         )
      }
    </div>
  )
}
