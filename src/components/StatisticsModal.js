import React, {useContext} from "react";
import "./StatisticsModal.less";
import Modal from "./Modal";
import {GameDate, Rows} from "../Constants";
import {datesAreOnSameDay} from "../Utils";
import Timer from "./Timer";
import ToastContext from "../contexts/ToastContext";
import { recordEvent, EVENT_TYPE } from "../Analytics";

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
                const width = x * 100.0 / largest;
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
    const {setToast} = useContext(ToastContext);
    const {data} = props;
    if (data.games == null)
        return <div className="statistics-modal-guess-distribution-header-text">Kraunami duomenys</div>

    const completedTotal = data.games.filter(game => game.completed).length;
    const solvedTotal = data.games.filter(game => game.solved).length;
    const winPercentage = completedTotal ? Math.round(100.0 * solvedTotal / completedTotal) : 0;

    let longestStreak = 0;
    let firstStreak = data.games.reduce((prev, curr) => {
        if (curr.solved)
            return prev + 1;
        else {
            longestStreak = Math.max(longestStreak, prev);
            return 0
        }
    }, 0);
    longestStreak = Math.max(longestStreak, firstStreak);

    let currentStreak = 0;
    data.games.reverse().find(game => {
        if (game.solved) {
            currentStreak++;
        } else if (!game.completed && datesAreOnSameDay(new Date(game.firstOpened), GameDate)) {
            return false; //ignore today's game if it is unfinished and continue search
        } else {
            return true;
        }
    });

    const todaysGame = data.games.find(game => datesAreOnSameDay(new Date(game.firstOpened), GameDate));
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
                    <button className="statistics-modal-share-btn" onClick={() => {
                        const hintMap = todaysGame.hints
                            .map((row) => row.map(hint => {
                                if (hint === "correct") {
                                    return "🟩";
                                } else if (hint === "wrong_position") {
                                    return "🟨";
                                } else {
                                    return "⬜";
                                }
                            }).join('')).join('\n')
                        const caption = `Žodžiuks ${todaysGame.hints.length}/${Rows}`;
                        const link = "https://martynasd123.github.io/zodziuks/";
                        if (window.navigator.share) {
                            window.navigator
                                .share({
                                    text: caption + "\n" + hintMap + "\n" + link,
                                    // text: caption + "\n" + hintMap,
                                    // url: "https://zodziuks.lt",
                                }).finally(() => {
                                    recordEvent(EVENT_TYPE.SHARED);
                            })
                        } else {
                            window.navigator.clipboard.writeText(caption + "\n" + hintMap + "\n" + link)
                                .then(() => setToast("Nukopijuota į iškarpinę"))
                                .catch(() => setToast("Klaida - kopijavimas \n į iškarpinę neleidžiamas"))
                            recordEvent(EVENT_TYPE.SHARED_CLIPBOARD);
                        }
                    }
                    }>Dalintis</button>
                </>}
            </div>
        </Modal>
    )
}

