import React, { useState } from 'react'
import { Terminal } from './components/Terminal'
import { Context } from './context/Context'

function App() {
  const [cards, setCards] = useState([
    {id: '0', money: 5000, pincode: '0000' },
    {id: '1', money: 6000, pincode: '1111' },
    {id: '2', money: 7000, pincode: '2222' },
    {id: '3', money: 8000, pincode: '3333' }
  ])
  const [terms] = useState([ 1, 2, 3 ])
  console.log('app rendered')
  return (
    <div className='content'>
      <Context.Provider value={{ cards, setCards }}>
        {terms.map(term => <Terminal key={term}/>)}
      </Context.Provider>
    </div>
  );
}

export default App;
