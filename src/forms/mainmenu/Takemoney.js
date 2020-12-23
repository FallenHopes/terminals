import React, { useContext } from 'react'
import { miniContext } from '../../context/miniContext'

export const Takemoney = () => {
    const { takem, setTakem } = useContext(miniContext)
    return(
        <div className='takemoney'>
            <input 
                type='text' 
                placeholder='Сумма вывода' 
                maxLength={5}
                value={takem}
                onChange={e => setTakem(e.target.value)}
            />
        </div>
    )
}