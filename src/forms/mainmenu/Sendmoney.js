import React, { useContext } from 'react'
import { miniContext } from '../../context/miniContext'

export const Sendmoney = () => {
    const { sendForm , setSendForm, setFocused } = useContext(miniContext)
    
    return(
        <div className='sendmoney'>
            <input 
                type='text' 
                placeholder='Счёт получателя'
                value={sendForm.id}
                onChange={e => setSendForm({ ...sendForm, id: e.target.value })}
                onFocus={() => setFocused('sendID')}
            /> <br />
            <input
                type='text'
                placeholder='Сумма перевода'
                value={sendForm.money}
                onChange={e => setSendForm({ ...sendForm, money: e.target.value })}
                onFocus={() => setFocused('sendMoney')}
            />
        </div>
    )
}