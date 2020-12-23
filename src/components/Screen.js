import React, { useContext } from 'react'
import { Mainmenu } from '../forms/Mainmenu'
import { Passcheck } from '../forms/Passcheck'
import { miniContext } from '../context/miniContext'


export const Screen = ({ isAuth, setFocused, setVal, page, setPage }) => {
    const { message } = useContext(miniContext)
    return(
        <div className='screen'>
            <div className='msgbox'>{message}</div>
            {
                isAuth?
                <Mainmenu page={page} setPage={setPage}/>
                :
                <Passcheck setFocused={setFocused} setVal={setVal}/>
            }            
        </div>
    )
}
