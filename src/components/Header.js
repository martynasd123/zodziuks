import React from "react";
import "./Header.less";
import { IoIosStats as StatisticsIcon } from 'react-icons/io';

export default function Header({children}){
    return <div className="header-root">
        <div className="header-text-wrapper">Žodžiuks</div>
        <div className="header-icons-wrapper">
            {children}
        </div>
    </div>
}