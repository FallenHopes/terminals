import React, { useContext } from 'react'
import { miniContext } from '../context/miniContext'

export const Passcheck = () => {
    const { loginForm, setLoginForm, setFocused } = useContext(miniContext)
    return(
        <div className='passcheck'>
            <input type='text' 
                placeholder='Card ID'
                value={loginForm.id} 
                onChange={e => setLoginForm({ ...loginForm, id: e.target.value })}
                onFocus={() => setFocused('id')}
            /> <br />
            <input type='password' 
                placeholder='Enter your pincode' 
                maxLength={4} 
                value={loginForm.pincode} 
                onChange={e => setLoginForm({ ...loginForm, pincode: e.target.value })}
                onFocus={() => setFocused('pincode')}
            />
        </div>
    )
}