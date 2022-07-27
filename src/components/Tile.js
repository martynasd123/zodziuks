import React, {useEffect, useState} from "react";

export default function Tile({letter, hint, style}) {
    const [animating, setAnimating] = useState(false);
    useEffect(() => {
        if(letter){
            setAnimating(true);
        }
    }, [letter]);
    let classes = [];
    if(animating){
        classes.push("pop-anim");
    }
    if(hint === "correct"){
        classes.push("correct-anim");
    }else if(hint === "non_existent"){
        classes.push("non-existent-anim");
    }else if(hint === "wrong_position"){
        classes.push("wrong-position-anim");
    }
    classes.push("tile-root");
    if(letter != null && hint == null){
        classes.push("tile-focused");
    }
    return(
        <div className={classes.join(' ')} style={style} onAnimationEnd={() => setAnimating(false)}>
            {letter || ""}
        </div>
    )
}