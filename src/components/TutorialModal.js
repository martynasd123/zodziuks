import React from "react";
import "./TutorialModal.less";
import Modal from "./Modal";
import Tile from "./Tile";

export default function TutorialModal(props) {
    const inactiveTileStyle = {color: "black", width: 50, height: 50};
    const activeTileStyle = {width: 50, height: 50};
    return (
        <Modal {...props}>
            <div className="tutorial-modal-root">
                <div className="tutorial-modal-header-text">
                    KAIP ŽAISTI
                </div>
                <div className="tutorial-modal-content">
                    <p>
                        Atspėk <b>Žodžiuką</b> iš šešių spėjimų.
                    </p>
                    <p>
                        Kiekvienas spėjimas turi būti teisingas šešių raidžių žodis vardininko linksniu.
                    </p>
                    <p>
                        Po kiekvieno spėjimo žodžio raidžių spalvos pasikeis, indikuodamos kiek jūsų spėjimas buvo arti
                        teisingo žodžio.
                    </p>
                    <div style={{height: 15}}/>
                    <div className="horizontal-separator"/>
                    <p><b>Pavyzdžiai</b></p>
                    <div style={{height: 8}}/>
                    <div className="tutorial-modal-tile-row">
                        <Tile letter={"L"} style={inactiveTileStyle}/>
                        <Tile letter={"A"} style={inactiveTileStyle}/>
                        <Tile letter={"I"} style={inactiveTileStyle}/>
                        <Tile letter={"V"} style={inactiveTileStyle}/>
                        <Tile letter={"A"} style={inactiveTileStyle}/>
                        <Tile letter={"S"} style={activeTileStyle} hint={"correct"}/>
                    </div>
                    <p>
                        Raidė „S“ yra žodyje ir jos vieta yra teisinga.
                    </p>
                    <div style={{height: 8}}/>
                    <div className="tutorial-modal-tile-row">
                        <Tile letter={"Ž"} style={inactiveTileStyle}/>
                        <Tile letter={"I"} style={inactiveTileStyle}/>
                        <Tile letter={"R"} style={inactiveTileStyle}/>
                        <Tile letter={"G"} style={activeTileStyle} hint={"wrong_position"}/>
                        <Tile letter={"A"} style={inactiveTileStyle}/>
                        <Tile letter={"S"} style={inactiveTileStyle}/>
                    </div>
                    <p>
                        Raidė „G“ yra žodyje, tačiau kitoje vietoje.
                    </p>
                    <div style={{height: 8}}/>
                    <div className="tutorial-modal-tile-row">
                        <Tile letter={"L"} style={inactiveTileStyle}/>
                        <Tile letter={"A"} style={inactiveTileStyle}/>
                        <Tile letter={"I"} style={inactiveTileStyle}/>
                        <Tile letter={"K"} style={activeTileStyle} hint={"non_existent"}/>
                        <Tile letter={"A"} style={inactiveTileStyle}/>
                        <Tile letter={"S"} style={inactiveTileStyle}/>
                    </div>
                    <p>
                        Žodis neturi „K“ raidės.
                    </p>
                    <div style={{height: 15}}/>
                    <div className="horizontal-separator"/>
                    <div style={{width: "100%", textAlign: "center"}}>
                        <p><b>Žodžiuką galima spręsti kartą per dieną</b></p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}