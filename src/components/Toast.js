import React, {useEffect, useState} from "react";
import "./Toast.less";

export default function Toast({text, open = true}) {
    const [visible, setVisible] = useState(null);
    useEffect(() => {
        if (open)
            setVisible(text)
    }, [open])
    return (
        <div onAnimationEnd={() => !open && setVisible(null)} style={visible ? {} : {display: "none"}}
             className={`${open ? "toast-root-visible" : "toast-root-hidden"}`}>
            {visible}
        </div>
    );
}