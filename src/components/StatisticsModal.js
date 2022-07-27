import React from "react";
import "./StatisticsModal.less";
import Modal from "./Modal";
import {GameDate, Rows} from "../Constants";
import {datesAreOnSameDay} from "../Utils";
import Timer from "./Timer";

const NumericStat = ({number, explanation}) => {
    return (
        <div className="statistics-modal-numeric-stat">
            <div className="statistics-modal-numeric-stat-number">
                {number}
            </div>
            <div className="statistics-modal-numeric-stat-explanation">
                {explanation}
            </div>
        </div>
    )
}

const GuessDistributionGraph = ({data}) => {
    const {games} = data;
    if (!games)
        return <></>;
    const game = games.find(game => datesAreOnSameDay(new Date(game.firstOpened), GameDate));
    if (!game)
        return <>Nėra duomenų</>;
    const numGuesses = game.guesses && game.guesses.length || -1;
    const distribution = [...Array(Rows)].map((x, index) => {
        return games.filter(game => game.solved && game.guesses.length === index + 1).length;
    });
    let largest = distribution.reduce((accumulatedValue, currentValue) => {
        return Math.max(accumulatedValue, currentValue);
    });
    return (
        <div className="guess-distribution-graph-wrapper">
            {distribution.map((x, index) => {
                const width = parseFloat(x) * 100.0 / parseFloat(largest);
                return (
                    <div key={index} className="guess-distribution-graph-element">
                        <div className="guess-distribution-graph-number">
                            {index + 1}
                        </div>
                        <div style={{
                            width: (x > 0 && `calc(${width}% - 16px)`) || "initial"
                        }}
                             className={`${index === numGuesses - 1 && game.solved ? "guess-distribution-graph-bar-active" : "guess-distribution-graph-bar-inactive"} ${x !== 0 && "guess-distribution-graph-bar-animated"}`}>
                            {x}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default function StatisticsModal(props) {
    const {data} = props;
    if (data.games == null)
        return <div className="statistics-modal-guess-distribution-header-text">Kraunami duomenys</div>

    const completedTotal = data.games.filter(game => game.completed).length;
    const solvedTotal = data.games.filter(game => game.solved).length;
    const winPercentage = completedTotal ? Math.round(100.0 * solvedTotal / completedTotal) : 0;
    const longestStreak = data.games.reduce((prev, curr, index, arr) => {
        if (curr.solved)
            return prev + 1;
        else return 0;
    }, 0);
    let currentStreak = 0;
    data.games.reverse().find(game => {
        if (game.solved) {
            currentStreak++;
        } else if(game.completed) {
            currentStreak = 0;
            return true;
        }
    });

    const completedToday = data.games.find(game => datesAreOnSameDay(new Date(game.firstOpened), GameDate) && game.completed) != null;
    return (
        <Modal {...props} >
            <div className="statistics-modal-root">
                <div className="statistics-modal-header-text">statistika</div>
                <div className="statistics-modal-numeric-stats-wrapper">
                    <NumericStat number={completedTotal} explanation={"Sužaista"}/>
                    <NumericStat number={winPercentage} explanation={"Laimėta %"}/>
                    <NumericStat number={currentStreak} explanation={"Laimėjimų serija"}/>
                    <NumericStat number={longestStreak} explanation={"Ilgiausia laimėjimų serija"}/>
                </div>
                <div className="statistics-modal-guess-distribution-header-text">spėjimų distribucija</div>
                {completedTotal ? <GuessDistributionGraph data={data}/> : "nėra duomenų"}
                {completedToday && <>
                    <div className="horizontal-separator"/>
                    <div className="statistics-modal-counter-header-text">Sekantis Žodžiuks</div>
                    <Timer/>
                    <button onClick={() => {
                        if (window.navigator.share) {
                            window.navigator
                                .share({
                                    title: "labass",
                                    text: `Check out asfasf`,
                                    url: document.location.href,
                                })
                                .then(() => {
                                    console.log('Successfully shared');
                                })
                                .catch(error => {
                                    console.error('Something went wrong sharing the blog', error);
                                });
                        }}
                    }>{JSON.stringify(window.navigator)}</button>
                </>}
            </div>
        </Modal>
    )
}

