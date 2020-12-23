import React, { useContext } from 'react'
import { Context } from '../../context/Context'
import { miniContext } from '../../context/miniContext'

export const Balance = () => {
    const { cards } = useContext(Context)
    const { auth } = useContext(miniContext)
    const card = cards.filter(card => card.id === auth)
    return(
        <div>Ваш баланс: {card[0].money}</div>
    )
}