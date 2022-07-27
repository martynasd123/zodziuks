import React, {useEffect, useState} from "react";
import "./Modal.less";
import {BsXLg as CloseIcon} from "react-icons/bs";

export default function Modal({children, open = true, onCloseClick}) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (open)
            setVisible(true)
    }, [open])
    return (
        <div onAnimationEnd={() => !open && setVisible(false)} style={visible ? {} : {display: "none"}}
             className={`${open ? "modal-root-visible" : "modal-root-hidden"}`}>
            <div className="modal-content-wrapper">
                <div className="modal-header-row">
                    <div className="modal-header-close-btn" onClick={() => onCloseClick()}>
                        <CloseIcon/>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}

const test = {
    "lastOpenDate": "2022-07-25T05:05:38.765Z",
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
    }, {
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
    }, {
        "firstOpened": "2022-07-25T05:05:38.769Z",
        "solved": false,
        "completed": false,
        "inputHintKeyMap": {},
        "guesses": [],
        "hints": []
    }]
}