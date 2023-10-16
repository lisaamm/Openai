import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setInputText("")
      
    try {

      const response = await axios.post('http://localhost:3000/api/chat/', { query: inputText });
      console.log(inputText);
      console.log(response.data.data);
      setResponseText(response.data.data);
      
    } catch (error) {
      console.error(error);
      setResponseText("Une erreur s'est produite");
    }
  };

  return (
    <>
    <div className='w-full h-full'>
      {/* En tête */}
        <div className='w-full h-[100px] rounded-[10px] bg-amber-400 flex justify-center items-center'>
            <h1 className="text-6xl ">CHAT APP</h1>
        </div>
      
      {/* Zone de reponse  */}
      <div className='w-full h-[350px] flex p-2  mt-10'>
        {
          responseText?  
          <p>{responseText}</p>
           :
           <div className='w-full h-full flex justify-center items-center pb-[150px] text-5xl font-bold text-stone-700'>
              <p>ChatGPT-3.5</p>
           </div>
        }
      </div>

      {/* InputText et Button */}
      <div className="w-full h-[200px] flex  justify-center items-center">
        <form onSubmit={handleSubmit}  className='w-full flex items-center justify-evenly  '>
          <input    
          value={inputText}
          onChange={handleInputChange}
          type="text" className='px-[200px] py-[20px] bg-stone-700 rounded-[10px] '/>

          <div onClick={handleSubmit} className='w-[100px] py-[15px] rounded-[10px]  bg-orange-400 cursor-pointer'>Valider</div>

        </form>
      </div>

    </div>
    </>
  )
}

export default App
