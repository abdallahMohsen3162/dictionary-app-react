"use client";
import React, { useEffect, useState } from 'react'
import { deleteCookie, getCookie, setCookie } from "../../../helpers/helpers";
import { faHouse, faQuestion, faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

let routes = ['profile'];

export default function Navbar() {
  const [cur, setcur] = useState('');
  const r = useRouter();
  

  useEffect(() => {
    for(let i = 0; i < routes.length; ++i){
      if(window.location.href.indexOf(routes[i]) > -1){
        setcur(routes[i]);
        break;
      }
    }
    
  }, [window.location])
  console.log(cur);
  
  const logout = () => {
    deleteCookie("authToken");
    r.push("/login");
  }

  const handleLogout = () => {
    Swal.fire({
      title: "Logout ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "YES"
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  }
  return (
    <div>
      <div className='nav bg-dark gap-3 p-1 container-fluid navbar'>
        <div>
        <button className='controller' onClick={()=> handleLogout()}>
           <FontAwesomeIcon icon={faRightToBracket} />
         </button>
        </div>

         <div className='d-flex gap-1'>
            <Link href="/profile" className={`controller `}>
                <FontAwesomeIcon icon={faUser} />
            </Link>

            <Link href="/" className={`controller `}>
                <FontAwesomeIcon icon={faHouse} />
            </Link>
            
            <Link href="/generatequiz" className={`controller `}>
                <FontAwesomeIcon icon={faQuestion} />
            </Link>

          
         </div>
      </div>
    </div>
  )
}
