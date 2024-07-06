import { useState, useCallback, useEffect, useRef} from 'react'

function App() {
  const [length, setLenght] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*_-=~`"

    for( let i=1; i<=length; i++){
      let charIndex = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(charIndex)
    }
    setPassword(pass)
  }
    , [length,numberAllowed,charAllowed]) 

  useEffect(() => {passwordGenerator()}, [length,numberAllowed,charAllowed,passwordGenerator])

  const passwordRef = useRef(null)
  
  const copyToClipboard = ()=> {
    document.querySelector('button').innerHTML = 'copied'
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }
  const refreshBtn = ()=>{
    passwordGenerator()
    const btn = document.getElementById('copyBtn')
      btn.innerHTML=('copy');
  }

  return (
    <>
      
      <div className='text-orange-600 w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700'>
      <h1 className='text-3xl my-5 text-center text-white'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-2 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button id='copyBtn' className='hover:bg-blue-500 text-white outline-none px-3 bg-green-600'
          onClick={copyToClipboard}>copy</button> 
        </div>
        <div className='flex text-sm gap-x-2'>

          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={40} value={length} className='cursor-pointer'
            onChange={(e) => {setLenght(e.target.value)}} />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed}
                   id='numberInput'
                    onChange={() =>{
                      setNumberAllowed((prev) => !prev);
                    }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllowed}
                   id='charInput'
                    onChange={() =>{
                      setCharAllowed((prev) => !prev);
                    }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
          <button className='text-white block bg-blue-400 w-full my-3 mb-1 rounded-2xl ' onClick= {refreshBtn}>Refresh</button>
      </div>
    </>
  )
}

export default App
