import React, { useContext } from 'react'
import { miniContext } from '../context/miniContext'

export const Pinpad = ({ auth, page }) => {
    const { setPage, setLoginForm, loginForm, setAuth, donate, setDonate, takem, setTakem, passCheck, donateFunc,
    takeMoney, sendMoney, sendForm, setSendForm, focused, setFocused } = useContext(miniContext)

    const backHandler = () => { 
        setPage({ balance: false, donate: false, sendmoney: false, takemoney: false }) 
        setFocused('')
    }

    const correctionHandler = () => {
        setLoginForm({ id: '', pincode: '' })
        setDonate('')
        setTakem('')
        setSendForm({ id: '', money: '' })
        if (auth){
            let pageName = ''
            for (var key in page){
                if(page[key] === true){
                    pageName = key
                }
            }
            if (pageName === 'donate') setFocused('donate')
            else if (pageName === 'takemoney') setFocused('takem')
            else if (pageName === 'sendmoney') setFocused('sendID')
        }
        else setFocused('id')
    }

    const cancelHandler = () => { 
        setAuth(''); 
        correctionHandler()
    }

    const enterHandler = () => {
        if (auth){
            let pageName = ''
            for (var key in page){
                if(page[key] === true){
                    pageName = key
                }
            }
            if (pageName === 'donate') donateFunc()
            else if (pageName === 'takemoney') takeMoney()
            else if (pageName === 'sendmoney') sendMoney()
        }
        else passCheck()
    }

    const keyHandler = e => {
        if (focused === ''){
            return false
        }
        else{
            if (focused === 'id'){
                let str = loginForm.id
                if (str.length === 5){
                    return false
                }
                str += e.target.textContent
                setLoginForm({ ...loginForm, id: str })
            }
            else if (focused === 'pincode'){
                let str = loginForm.pincode
                if (str.length === 4){
                    return false
                }
                str += e.target.textContent
                setLoginForm({ ...loginForm, pincode: str })
            }
            else if (focused === 'donate'){
                let str = donate
                str += e.target.textContent
                setDonate(str)
            }
            else if (focused === 'takem'){
                let str = takem
                str += e.target.textContent
                setTakem(str)
            }
            else if (focused === 'sendID'){
                let str = sendForm.id
                if (str.length === 5){
                    return false
                }
                str += e.target.textContent
                setSendForm({ ...sendForm, id: str })
            }
            else if (focused === 'sendMoney'){
                let str = sendForm.money
                str += e.target.textContent
                setSendForm({ ...sendForm, money: str })
            }
        }
    }

    return(
        <div className='pinpad'>
            <div onClick={keyHandler} className='counts'>
                <div className='keyRow'>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </div>
                <div className='keyRow'>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                </div>
                <div className='keyRow'>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                </div>
                <span className='zeroKey'>0</span>
            </div>
            <div className='operations'>
                <span onClick={cancelHandler} className='cancelKey'>Cancel</span>
                <span onClick={correctionHandler} className='correctionKey'>Correction</span>
                <span onClick={backHandler} className='backKey'>Back</span>
                <span onClick={enterHandler} className='enterKey'>Enter</span>
            </div>
        </div>
    )
}