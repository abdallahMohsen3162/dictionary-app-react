'use client';
import { use, useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCoffee, faVolumeHigh, faVolumeOff } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { Word } from "../../../types";
import { useParams } from "next/navigation";
import Link from "next/link";

let engs: any[] = [];
let ar: any[] = [];



let arr : any = [];
let n : number = 0;
let categories = [];
export default function Quiz() {
  const [load, sload] = useState<boolean>(true);
  const [synth, setSynth] = useState<any>(null);
  const [utterance, setUtterance] = useState<any>(null);
  const [iterator, setIter] = useState(0);
  const [sol, setSol] = useState(false);
  const [mx, setmx] = useState(0);
  const [str, setstr] = useState<string>();
  
  const [sz, setsz] = useState(300);
  const p = useParams();

  useEffect(() => {

    if(!str) return;
    
    for(let i = 0; i < str?.length; i++){
      if(str[i] == '-'){
        n = parseInt(str.slice(0, i));
      }
    }
    setsz(n);
    console.log(str);
    categories = str.split('-');
   
    
  }, [str])

  useEffect(() => {

    setstr(`${p.params}`);
    
    if(n == 0) return;
    axios.get("http://127.0.0.1:8000/api/GenerateQuiz", {params:{sz:sz}}).then((res) => {
  
      arr = res.data.words;
      setmx(arr.length);
      for(let i = 0; i < arr.length; i++){
        engs.push(arr[i].eng)
        ar.push(arr[i].ar)
      }
      sload(false);
      setIter(0);
    })

  }, [sz])
  
  useEffect(() => {
    setSynth(window.speechSynthesis);
    setUtterance(new SpeechSynthesisUtterance(engs[iterator]));
    setSol(false);
  }, [iterator])

  const handleSpeach = () => {
    if (synth && utterance) {
      utterance.rate = 0.6;
      synth.speak(utterance);
    }
  }
  

  const Stopspeach = () => {
    synth.cancel();
  }
  

  return (
    <div>
      <Link href={"/"} className="text-light" >
      <FontAwesomeIcon icon={faCircleLeft} />
      </Link>
  
      <br />
      {
       <div className="box continer">
         <div>


        
            <div className="txt-para" >
                <div className="top-bar">
                  <button onClick={handleSpeach}>
                    <FontAwesomeIcon icon={faVolumeHigh} />
                  </button>

                  <button onClick={Stopspeach}>
                    <FontAwesomeIcon icon={faVolumeOff} />
                  </button>
                </div>

                <p onClick={() => setSol(!sol)} className={`text-en-ar text-light ltr`} style={{minHeight:"40vh"}}>
                  {
                    (sol && mx)?(
                      ar[iterator]
                    ):(
                      engs[iterator]
                    )

                  }
                </p>
            </div>

        </div>
              <div className="down-bar">
                <button onClick={()=>setIter(p => Math.max(p - 1, 0))}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <div>
                  {iterator+1} / {mx}
                </div>

                <button onClick={()=>setIter(p => Math.min(p + 1, mx - 1))}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
       </div>
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


