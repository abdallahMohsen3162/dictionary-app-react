'use client';
import { use, useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { Socket, io } from "socket.io-client";
import { deleteCookie, getCookie, setCookie } from '../../helpers/helpers';
import Navbar from './components/navbar';
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Addword from "./components/Addword";
import Wordblock from "./components/Wordblock";
import { Word } from "../../types";

let arr: Word[] = [];

export default function Home() {
  const [logged , setLogged] = useState(false);
  const [name , setName] = useState("");
  const [categ, setCateg] = useState("");
  const [cnt, setcnt] = useState(0);
  const [load, sload] = useState(true);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/getAllwords",
    {
      headers: {Authorization: `Bearer ${getCookie("authToken")}`}
    }
    ).then((res) => {
      arr = res.data.words
      
      setcnt(cnt + 1);
      sload(false);
    })
  }, [])

  useEffect(() => {
    
    axios.get("http://127.0.0.1:8000/api/getusers")
    .then((res) => {
      
    })

   
  })
  
  const r = useRouter();
  useEffect(() => {
    if(!getCookie("authToken")){
      r.push("usersUI")
    }

  }, [])


  
  return (
      
    
    <div>
      {
        getCookie("authToken")?(
          < Navbar />
        ):(
          ''
        )

      }
      
      
      <h1>Welcome</h1>

        {
          load?(
            <div className="loading-spinner" style={{display:"inline-block"}}> </div>
          ):(
            ''
          )
        }

        <div className="d-flex flex-wrap gap-1 align-items-star justify-content-start">
        {
          (cnt) ? (
            arr.map((el, idx) => {

              return <div key={`${idx}-user-word`}>
                < Wordblock params={el}/>
              </div>
            })
          ):(
            ''
          )
        }
        
        </div>
        

        

   

    </div>
  )

 
}


