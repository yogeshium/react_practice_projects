import {useState} from 'react';
import Button from './components/Button.jsx'

function App() {
  
  let [color,setColor]=useState("black");

  const applyColor=(c)=>{
    setColor(c);
  }

  return (
     <div 
      className="h-screen"
      style={{background: color}}
     >
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2 gap-5">
        <Button colorName="rgb(30,64,175)" setColor={applyColor}/>
        <Button colorName="rgb(67,56,202)" setColor={applyColor}/>
        <Button colorName="rgb(109,40,217)" setColor={applyColor}/>
        <Button colorName="rgb(236,72,153)" setColor={applyColor}/>
        <Button colorName="rgb(190,18,60)" setColor={applyColor}/>
        <Button colorName="black" setColor={applyColor}/>
      </div>
     </div>
  )
}

export default App
