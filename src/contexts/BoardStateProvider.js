import React, {createContext, useEffect, useState} from "react";

const initial = {
    lastOpenDate: new Date(),
    games: [
        // {
        //     solvedDate: new Date(),
        //     firstOpened: new Date(),
        //     solved: true,
        //     guesses: [],
        //     hints: [],
        //     solution: "",
        //     inputHintKeyMap: {}
        // }
    ]
}
/*const initial = {
    "lastOpenDate": "2022-07-25T05:02:03.526Z",
    "games": [{
        "firstOpened": "2022-07-20T12:38:28.582Z",
        "solved": true,
        "completed": true,
        "inputHintKeyMap": {
            "L": "non_existent",
            "A": "correct",
            "I": "correct",
            "K": "non_existent",
            "S": "correct",
            "Ž": "correct",
            "B": "correct"
        },
        "guesses": ["LAIKAS", "ŽAIBAS"],
        "hints": [["non_existent", "correct", "correct", "non_existent", "correct", "correct"], ["correct", "correct", "correct", "correct", "correct", "correct"]],
        "solvedDate": "2022-07-20T12:38:42.908Z"
    }, {
        "firstOpened": "2022-07-21T12:42:05.461Z",
        "solved": true,
        "completed": true,
        "inputHintKeyMap": {
            "Ž": "correct",
            "O": "non_existent",
            "L": "non_existent",
            "Y": "non_existent",
            "N": "non_existent",
            "E": "non_existent",
            "I": "correct",
            "R": "non_existent",
            "G": "non_existent",
            "A": "correct",
            "S": "correct",
            "B": "correct"
        },
        "guesses": ["ŽOLYNE", "ŽIRGAS", "ŽAIBAS"],
        "hints": [["correct", "non_existent", "non_existent", "non_existent", "non_existent", "non_existent"], ["correct", "wrong_position", "non_existent", "non_existent", "correct", "correct"], ["correct", "correct", "correct", "correct", "correct", "correct"]],
        "solvedDate": "2022-07-21T12:42:32.484Z"
    }, {
        "firstOpened": "2022-07-22T12:43:31.956Z",
        "solved": true,
        "completed": true,
        "inputHintKeyMap": {
            "Ž": "correct",
            "A": "correct",
            "B": "correct",
            "I": "correct",
            "S": "correct",
            "D": "non_existent",
            "Ę": "non_existent",
            "L": "non_existent",
            "E": "non_existent"
        },
        "guesses": ["ŽABAIS", "ŽAIDĘS", "ŽAILES", "ŽAIBAS"],
        "hints": [["correct", "correct", "wrong_position", "wrong_position", "wrong_position", "correct"], ["correct", "correct", "correct", "non_existent", "non_existent", "correct"], ["correct", "correct", "correct", "non_existent", "non_existent", "correct"], ["correct", "correct", "correct", "correct", "correct", "correct"]],
        "solvedDate": "2022-07-22T12:44:02.917Z"
    }, {
        "firstOpened": "2022-07-23T12:43:31.956Z",
        "solved": true,
        "completed": true,
        "inputHintKeyMap": {
            "Ž": "correct",
            "A": "correct",
            "B": "correct",
            "I": "correct",
            "S": "correct",
            "D": "non_existent",
            "Ę": "non_existent",
            "L": "non_existent",
            "E": "non_existent"
        },
        "guesses": ["ŽABAIS", "ŽAIDĘS", "ŽAILES", "ŽAIBAS"],
        "hints": [["correct", "correct", "wrong_position", "wrong_position", "wrong_position", "correct"], ["correct", "correct", "correct", "non_existent", "non_existent", "correct"], ["correct", "correct", "correct", "non_existent", "non_existent", "correct"], ["correct", "correct", "correct", "correct", "correct", "correct"]],
        "solvedDate": "2022-07-23T12:44:02.917Z"
    },{
        "firstOpened": "2022-07-24T05:01:24.831Z",
        "solved": true,
        "completed": true,
        "inputHintKeyMap": {
            "L": "non_existent",
            "A": "correct",
            "I": "correct",
            "K": "non_existent",
            "S": "correct",
            "Ž": "correct",
            "B": "correct"
        },
        "guesses": ["LAIKAS", "ŽAIBAS"],
        "hints": [["non_existent", "correct", "correct", "non_existent", "correct", "correct"], ["correct", "correct", "correct", "correct", "correct", "correct"]],
        "solvedDate": "2022-07-25T05:01:32.937Z"
    }]
}*/

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