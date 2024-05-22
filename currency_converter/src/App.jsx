import { useState,useEffect,useCallback } from "react";
import {Input} from "./components";
//index file by default call hoti hai - ./components/index.js - krna nahi pada
import useCurrencyInfo from "./hooks/useCurrencyInfo"

function App() {
  let [amount,setAmount]=useState(0)
  let [convertedAmount,setConvertedAmount]=useState(0)
  let [fromCurr,setFromCurr]=useState("inr")
  let [toCurr,setToCurr]=useState("usd")

  const currencyInfo = useCurrencyInfo(fromCurr);
  const currOptions = Object.keys(currencyInfo);

  const swap = ()=>{
    setAmount(convertedAmount);
    setFromCurr(toCurr);
    setToCurr(fromCurr);
  }

  const convert = useCallback(()=>{
    setConvertedAmount(amount*(currencyInfo[toCurr]?currencyInfo[toCurr]:0))
  },[amount,fromCurr,toCurr,swap])

 

  useEffect(convert,[fromCurr,toCurr,amount,swap]);

  return (
    <>
      <div className="w-[500px] rounded-md border">
        <div className="p-4">
          <h1 className="text-lg font-bold mb-2">Currency Converter</h1>
          
          <Input 
            label="From"
            amount={''+amount}
            selectedCurrency={fromCurr}
            currencyOption={currOptions}
            onAmountChange={(e)=>{setAmount(e)}}
            onCurrencyChange={(e)=>{setFromCurr(e)}}
          />
          <div className="flex max-w-2xl flex-col justify-center rounded-md md:flex-row">
            <button
              type="button"
              className="rounded-md border border-white px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={swap}
            >
              Swap
            </button>
          </div>

          
          <Input 
            label="To"
            amount={convertedAmount.toString()}
            selectedCurrency={toCurr}
            currencyOption={currOptions}
            onAmountChange={(e)=>{setConvertedAmount(e)}}
            onCurrencyChange={(e)=>{setToCurr(e)}}
          />

          {/* <div className="flex max-w-2xl flex-col justify-center rounded-md md:flex-row">
            <button
              type="button"
              className="rounded-md mt-2 mb-2 w-full bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              onClick={convert}
            >
              Convert
            </button>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default App
