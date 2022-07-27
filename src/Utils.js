import {GameDate} from "./Constants";

export const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

export const setIntervalX = (callback, delay, repetitions) => {
    let x = 1;
    callback(0);
    const intervalID = window.setInterval(function () {
        callback(x);
        if (++x === repetitions) {
            window.clearInterval(intervalID);
        }
    }, delay);
}

export function getTimeRemaining(endtime){
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );

    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

export function getDateTomorrow(){
    let date = new Date(GameDate);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 1);
    return date;
}