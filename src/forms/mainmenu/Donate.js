import React, { useContext } from 'react'
import { miniContext } from '../../context/miniContext'

export const Donate = () => {
    const { donate, setDonate } = useContext(miniContext)
    return(
        <div className='donate'>
            <input 
                type='text' 
                placeholder='Сумма пополнения' 
                maxLength={5} 
                value={donate}
                onChange={e => setDonate(e.target.value)}
            />
        </div>
    )
}