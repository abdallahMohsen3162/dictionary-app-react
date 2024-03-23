"use client"
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import "../../styling/generate.css"
import { getCookie } from '../../../helpers/helpers'
import Navbar from '../components/navbar'
import axios from 'axios'
import { Word } from '../../../types'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

// 
let st = new Set<string>();
let arr = new Array<Word>();
let newst = new Set<string>();
export default function Generate() {
  const [loading, setloading] = useState(true);
  const [sz, setsz] = useState<number|string>(0);
  const router = useRouter();
  const params = useParams();
  console.log(router);
  
  useEffect(() => {
  
    axios.get("http://127.0.0.1:8000/api/getAllwords",
    {
      headers: {Authorization: `Bearer ${getCookie("authToken")}`}
    }
    ).then((res) => {
      arr = res.data.words
      console.log(arr);
      for(const word of arr){
        st.add(word.category);
      }
      console.log(st);
      if(res.status === 200){
        setloading(false);
      }
    })
  }, [])

  const handleChange = (str: string) : void => {
    if(newst.has(str)){
      newst.delete(str);
    } else{
      newst.add(str);
    }
    

    
  }

  const handleShoot = () => {
    if(newst.size === 0){
      st.forEach((el, idx) => {
        newst.add(el);
      })
    }

    let s = `${sz}-`;
    newst.forEach((el, idx) => {
      s += el;
      s += '-'
    })
    console.log(s);
    if(!sz||sz==0){
      return;
    }
    router.push(`quiz/${s}`)

  }
  return (
    <>
      
        {
        getCookie("authToken")?(
          < Navbar />
        ):(
          ''
        )
      }
    <h1 className='text-center display-5'>Quiz details</h1>
    <div className='generator'>
      
      {
        (!loading)?(
          <>
          <div >
           <input onChange={(e) => setsz(e.target.value)} type="number" placeholder='Number of questsions' />
          </div>

          <div className='checkbox'>
            <h4>Categories</h4>
           {
            Array.from(st).map((el:string, idx) => {
              return(

                <div>
                  <label htmlFor="">{el}</label>
                  <input
                    name={el} 
                    type="checkbox" 
                    key={`${el}-123`}
                    onChange={()=>handleChange(el)}
                   />
                </div>
              )
            })
           }
          </div>
          </>
        ):(
          <div className="loading-spinner"></div>
        )
      }
      
      <button className='btn btn-dark border w-25' onClick={handleShoot}>Go</button>
    </div>
    </>
  )
}
