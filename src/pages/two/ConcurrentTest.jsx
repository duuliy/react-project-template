import { useState, useEffect, useRef } from 'react'

//如何验证优先级？
const ConcurrentTest = () => {
  const [count, setCount] = useState(0)
  const buttonRef = useRef()

  const handleButtonClick = () => {
    setTimeout(() => setCount(count + 2), 1000)
    // setCount(count + 2)
  }

  useEffect(() => {
    setTimeout(() => setCount(1), 1)
    buttonRef.current.click()
    // setTimeout(() => buttonRef.current.click(), 501)
  }, [])

  return (
    <div className="hhh">
      <button ref={buttonRef} onClick={handleButtonClick}>
        增加2
      </button>
      <div>
        {Array.from(new Array(8000)).map((v, index) => (
          <span key={index}>{count}</span>
        ))}
      </div>
    </div>
  )
}

export default ConcurrentTest
