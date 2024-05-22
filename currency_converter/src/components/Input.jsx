import {useId} from 'react'

function Input({
    label,
    amount,
    selectedCurrency="usd",
    currencyOption=[],
    onAmountChange,
    onCurrencyChange,
}){
    // console.log(label,amount)
    const isNumeric = (str)=>{
      for (let i = 0; i < str.length; i++) {
        if(!((str.charCodeAt(i)>="0".charCodeAt(0) && str.charCodeAt(i)<="9".charCodeAt(0)||str[i]==='.')))
          return false;
      }
      return true;
    }
    const amountId = useId(); 
    const currId=useId();
    const listOptions = currencyOption.map((curr,idx)=>{
            return (<option key={idx} className="text-color-black" value={curr}>{curr.toUpperCase()}</option>)
    })

    return(
    <div className="p-2 rounded-md border">
            <div className="flex justify-between p-2">
              <label htmlFor={amountId} className='font-bold '>{label}</label>
              <label htmlFor={currId} className='font-bold'>Currency Type</label>
            </div>
            <div className="flex justify-between p-2">
              <input
                id={amountId}

                className="bg-transparent text-sm placeholder:text-white focus:border-none focus:outline-none disabled:opacity-50"
                type="text"
                value={amount.slice(0,10)}
                onChange={(e)=>{
                  if(isNumeric(e.target.value))
                    
                    onAmountChange && onAmountChange(Number(e.target.value))
                  }
                }
              />
              <select 
                name="currencyType" 
                id={currId} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedCurrency}
                onChange={(e)=>{onCurrencyChange && onCurrencyChange(e.target.value)}}
                >
                {listOptions}    
              </select>
            </div>
          </div>
    );
}

export default Input;