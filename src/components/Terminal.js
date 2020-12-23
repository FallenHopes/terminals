import React, { useState, useContext } from 'react'
import { Screen } from './Screen'
import { Pinpad } from './Pinpad'
import { Context } from '../context/Context'
import { miniContext } from '../context/miniContext'

export const Terminal = () => {
    const [url, setUrl] = useState('passcheck')

    const { cards, setCards } = useContext(Context)
    const [loginForm, setLoginForm] = useState({ id: '', pincode: '' })
    const [donate, setDonate] = useState('')
    const [takem, setTakem] = useState('')
    const [sendForm, setSendForm] = useState({ id: '', money: '' })
    const [auth, setAuth] = useState('')
    const [page, setPage] = useState({ balance: false, donate: false, sendmoney: false, takemoney: false })
    const [message, setMessage] = useState('')

    const [focused, setFocused] = useState('id')

    const sendMsg = msg => {
        setMessage(msg)
        return setTimeout(() => {
            setMessage('')
        }, 3000)
    }

    const passCheck = () => {
        if (loginForm.id === '') {
            sendMsg('Пожалуйста, введите ID карты')
            setFocused('id')
        }
        else if (loginForm.pincode === ''){
            sendMsg('Пожалуйста, введите пинкод')
            setFocused('pincode')
        }
        else{
            const card = cards.filter(card => card.id === loginForm.id)
            if(card.length > 0){
                if(card[0].pincode === loginForm.pincode){
                    setAuth(card[0].id)
                    setUrl('mainmenu')
                    setFocused('')
                }
                else{
                    sendMsg('Неверный пинкод')
                    setFocused('pincode')
                }
            }
            else{
                sendMsg('Несуществующая карта')
                setFocused('id')
            }
        }
    }

    const donateFunc = () => {
        if(donate === '') sendMsg('Пожалуйста, введите сумму')
        else{
            const tmpDonate = parseInt(donate)
            let tmpCards = cards
            tmpCards.filter(card => card.id === auth).map(card => card.money += tmpDonate)
            setCards(tmpCards)
            setDonate('')
            sendMsg(`Баланс карты [${auth}] пополнен`)
        }
    }

    const takeMoney = () => {
        if(takem === '') sendMsg('Пожалуйста, введите сумму')
        else{
            const tmpTakem = -parseInt(takem)
            let tmpCards = cards
            tmpCards.filter(card => card.id === auth).map(card => {
                if (card.money < -tmpTakem){
                    sendMsg('Недостаточно средств')
                    setTakem('')
                }
                else{
                    card.money += tmpTakem
                    sendMsg('Средства успешно выведены')
                    setTakem('')
                }
            })
            setCards(tmpCards)
        }
    }

    const sendMoney = () => {
        if (sendForm.id === ''){
            sendMsg('Пожалуйста, введите счёт получателя')
            setFocused('sendID')
        }
        else if(sendForm.money === ''){
            sendMsg('Пожалуйста, введите сумму')
            setFocused('sendMoney')
        }
        else{
            let tmpCards = cards
            const tmpMoney = parseInt(sendForm.money)
            const myCard = tmpCards.filter(card => card.id === auth)
            if (tmpCards.filter(card => card.id === sendForm.id).length === 0){
                sendMsg('Получатель не существует')
                setSendForm({ id: '', money: '' })
                setFocused('sendID')
            }
            else if (myCard[0].money < tmpMoney){
                sendMsg('Недостаточно средств')
                setSendForm({ id: '', money: '' })
                setFocused('sendMoney')
            }
            else{
                tmpCards.filter(card => card.id === auth).map(card => card.money -= tmpMoney)
                tmpCards.filter(card => card.id === sendForm.id).map(card => card.money += tmpMoney)
                setCards(tmpCards)
                sendMsg('Операция выполнена успешно')
                setSendForm({ id: '', money: '' })
                setFocused('sendID')
            }
        }
    }

    return(
        <miniContext.Provider value={{ loginForm, setLoginForm, auth, donate, setDonate, takem,
        setTakem, message, setPage, setAuth, sendMsg, passCheck, url, setUrl, donateFunc,
        takeMoney, sendMoney, sendForm, setSendForm, focused, setFocused }}>
        <div className='terminal'>
            <Screen 
                isAuth={auth}
                page={page}
                setPage={setPage}
            />
            <Pinpad auth={auth} page={page}/>
        </div>
        </miniContext.Provider>
    )
}