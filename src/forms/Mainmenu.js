import React, { useState, useContext } from 'react'
import { Balance } from '../forms/mainmenu/Balance'
import { Donate } from '../forms/mainmenu/Donate'
import { Sendmoney } from '../forms/mainmenu/Sendmoney'
import { Takemoney } from '../forms/mainmenu/Takemoney'
import { miniContext } from '../context/miniContext'


export const Mainmenu = ({ page, setPage }) => {
    const { setFocused } = useContext(miniContext)
    const [pages] = useState({
        balance: <Balance />,
        donate: <Donate />,
        sendmoney: <Sendmoney />,
        takemoney: <Takemoney />
    })
    let pageName = ''
    for (var key in page){
        if(page[key] === true){
            pageName = key
        }
    }
    const changePage = pagename => {
        if (pagename === 'balance'){
            setPage({ ...page, balance: true})
        }
        else if(pagename === 'donate'){
            setPage({ ...page, donate: true})
            setFocused('donate')
        }
        else if(pagename === 'sendmoney'){
            setPage({ ...page, sendmoney: true })
            setFocused('sendID')
        }
        else if(pagename === 'takemoney'){
            setPage({ ...page, takemoney: true})
            setFocused('takem')
        }
    }
    return (
        <div className='mainmenu'>
            {
                pageName === '' ?
                <ul>
                    <li onClick={() => changePage('balance')}>Баланс</li>
                    <li onClick={() => changePage('donate')}>Пополнить</li>
                    <li onClick={() => changePage('sendmoney')}>Перевести</li>
                    <li onClick={() => changePage('takemoney')}>Снять</li>
                </ul>
                :
                pages[pageName]
            }
        </div>
    )
}