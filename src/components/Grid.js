import React, { useEffect, useState} from "react";
import "./Grid.less";
import {Columns, Rows} from "../Constants";
import Tile from "./Tile";
import {setIntervalX} from "../Utils";

const GridRow = ({guess, hints, completedAnim, shakeAnim, onShakeAnimEnd}) => {
    const [animated, setAnimated] = useState(0);
    useEffect(() => {
        if(completedAnim && hints && hints.length === Columns && hints.every(hint => hint === "correct")){
            setIntervalX(() => {
                setAnimated(animated => animated + 1);
            }, 100, Columns);
        }
    }, [completedAnim]);
    useEffect(() => {
        if(shakeAnim){
            setTimeout(onShakeAnimEnd, 700);
        }
    }, [shakeAnim])
    let tiles;
    if(guess == null) {  // This row is not filled yet
        tiles = [...Array(Columns)].map((x, i) => <Tile key={i}/>)
    }else if(hints == null){  // This row is where the next guess will be
        tiles = [...Array(Columns)].map((x, i) => {
            if(i < guess.length){
                return <Tile key={i} letter={guess[i]} style={shakeAnim ? { animation: "shake 0.7s forwards" } : {}} />;
            }else{
                return <Tile key={i}/>
            }
        });
    }else{  // This row contains guess with hints
        tiles = [...Array(Columns)].map((x, i) => {
            return <Tile key={i} letter={guess[i]} hint={hints[i]} style={(completedAnim && animated > i) ? {animation: "correct-reveal 0s forwards, dance 0.8s forwards"} : {}}/>
        });
    }
    return <div className="grid-row">{tiles}</div>;
}

export default function Grid({ guesses, hints, input, completedAnim, shakeAnim, onShakeAnimEnd }){
    return <div className="content-root">
        {[...Array(Rows)].map((x, i) => {
            if(i < guesses.length){
                return <GridRow key={i} completedAnim={completedAnim} guess={guesses[i]} hints={hints[i]}/>
            }else if(i === guesses.length){
                return <GridRow shakeAnim={shakeAnim} onShakeAnimEnd={onShakeAnimEnd} key={i} guess={input}/>
            }else{
                return <GridRow key={i}/>
            }
        })}
    </div>

}