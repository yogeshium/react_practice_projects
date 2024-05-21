
import {useCallback, useState, useEffect, useRef} from "react";

function App() {

  let [passwordLength,setpasswordLength]=useState(8);
  let [alphaCharAllowed,setAlphaCharAllowed]=useState(false);
  let [numberAllowed,setNumberAllowed]=useState(false);
  let [password,setPassword]=useState("");
  let passwordRef=useRef(null);

  const copyToClipBoard = ()=>{
    // console.log(passwordRef);
    passwordRef.current?.select();
    navigator.clipboard.writeText(passwordRef.current.value);
  }

  const generatePassword = useCallback(()=>{
          let pass="";
          let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          if(numberAllowed)
              str+="0123456789"
          if(alphaCharAllowed)
              str+="*&_#@%!"
          for(let i=0;i<passwordLength;i++)
          {
            let ch=str[Math.floor(Math.random() * str.length)];
            pass+=ch
          }
          setPassword(pass);
      },[passwordLength,alphaCharAllowed,numberAllowed])


      
  useEffect(()=>{generatePassword()},[passwordLength,alphaCharAllowed,numberAllowed,setPassword])


  return (
    <>
      <div className="w-[500px] rounded-md border">
        <div className="p-6">
          <h1 className="text-lg font-semibold mb-4">Password Generator</h1>
          <input
            className="flex h-10 w-full rounded-md mb-2 border border-black/30 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-100"
            type="text" 
            readOnly
            value={password}
            ref={passwordRef}
          />
          
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/50 active:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={copyToClipBoard}
          >
            Copy
          </button>

          <div className="flex mb-2">
                <h1 className="text-sm mr-4">Size:</h1>
                <input type="range" min="8" max="16" className="slider mr-2" id="passwordLength" 
                  onChange={(e)=>{
                    setpasswordLength(parseInt(e.target.value))
                  }
                }
                  value={passwordLength} 
                ></input>
                <label>{passwordLength}</label>
            </div>
          <div className="flex mb-2">
              <h1 className="text-sm mr-4">Alphanumeric Characters:</h1>
              <input type="checkbox" id="alphaCharAllowed" name="alphaCharAllowed"
                onChange={(e)=>{
                  setAlphaCharAllowed((prevAlphaCharAllowed)=>!prevAlphaCharAllowed)
                }
              }
              ></input>
          </div>
          <div className="flex mb-2">
              <h1 className="text-sm mr-4">Numbers: </h1>
              <input type="checkbox" id="numberAllowed" name="numberAllowed"
                onChange={(e)=>{
                  setNumberAllowed((prevNumberAllowed)=>!prevNumberAllowed)  
                }
              }
              ></input>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
