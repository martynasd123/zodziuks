import React, {useEffect, useState} from "react";
import "./Timer.less";
import {getDateTomorrow, getTimeRemaining} from "../Utils";

const trailingZero = (num) => {
    if(num > 9){
        return num;
    }else{
        return `0${num}`;
    }
}

export default function Timer({until}){
    const [{seconds, minutes, hours}, setTimeLeft] = useState(getTimeRemaining(getDateTomorrow()));
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeRemaining(getDateTomorrow()));
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);
    return(
        <div className="timer-root">
            {trailingZero(hours)}:{trailingZero(minutes)}:{trailingZero(seconds)}
        </div>
    )
}