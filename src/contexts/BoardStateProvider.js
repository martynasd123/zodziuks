import React, {createContext, useEffect, useState} from "react";

const initial = {
    lastOpenDate: new Date(),
    games: [ ]
}

function getInitialState() {
    const boardState = localStorage.getItem('boardState')
    return boardState ? JSON.parse(boardState) : initial
}

export const BoardStateContext = createContext({});
export const BoardStateProvider = ({children}) => {
    const [boardState, setBoardState] = useState(getInitialState)
    useEffect(() => {
        localStorage.setItem('boardState', JSON.stringify(boardState))
    }, [boardState])
    return (
        <BoardStateContext.Provider value={{boardStatePersistent: boardState, setBoardStatePersistent: setBoardState}}>
            {children}
        </BoardStateContext.Provider>
    )
}