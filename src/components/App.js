import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import Header from "./Header";
import Grid from "./Grid";
import {Charset, Columns, GameDate, Rows} from "../Constants";
import Keyboard from "./Keyboard";
import StatisticsModal from "./StatisticsModal";
import {BoardStateContext} from "../contexts/BoardStateProvider";
import {datesAreOnSameDay, setIntervalX} from "../Utils";
import {IoIosStats as StatisticsIcon} from "react-icons/io";
import {BsInfoCircle as HelpIcon} from "react-icons/bs";
import TutorialModal from "./TutorialModal";
import ConfettiGenerator from "confetti-js";
import Wordlist from "./Wordlist";
import Word from "../Word";
import ToastContext from "../contexts/ToastContext";
import Toast from "./Toast";
import {EVENT_TYPE, recordEvent} from "../Analytics";
const heart_img = require("../assets/img/heart.svg");

const App = () => {
    const {boardStatePersistent, setBoardStatePersistent} = useContext(BoardStateContext);
    const [board, setBoard] = useState({
        hints: [],
        guesses: []
    });
    const [input, setInput] = useState("");
    const [inputEasterEgg, setInputEasterEgg] = useState("");
    const [hintKeyMap, setHintKeyMap] = useState({});
    const [dialogOpen, setDialogOpen] = useState(null);
    const [completedAnim, setCompletedAnim] = useState(false);
    const [shakeAnim, setShakeAnim] = useState(false);
    const {setToast, toast} = useContext(ToastContext);

    // A ref to track whether the initial board data has been loaded
    const boardLoaded = useRef(false);
    const confetti = useRef(null);

    const hintsRevealed = boardLoaded.current && !board.hints.some(hint => hint.filter(Boolean).length !== Columns);

    const gameCompleted = (board.guesses.length === Rows && board.hints.every(hint => hint.filter(Boolean).length === Columns)) || (board.hints.find(hints => hints.length === Columns && hints.every(hint => hint === "correct")));
    const typingAllowed = !gameCompleted && boardLoaded && boardLoaded.current && !dialogOpen && hintsRevealed;

    useEffect(() => {
        if(!confetti.current && (inputEasterEgg.includes(window.atob("RU1JTElKQU1BUklKQQ==")) || inputEasterEgg.includes(window.atob("TUFSVFlOVUtBUw==")))){
            const confetti_local = new ConfettiGenerator({
                target: 'confetti-canvas',
                start_from_edge: true ,
                props: [
                    { type: "svg", src: heart_img }
                ],
                size: 2,
                rotate: true,
                max: 15
            });
            confetti_local.render();
            confetti.current = confetti_local;
            return () => confetti_local.current && confetti_local.current.clear();
        }
    }, [inputEasterEgg]);

    // Load initial board from local storage
    useEffect(() => {
            if (boardStatePersistent == null || setHintKeyMap == null || setBoard == null || setBoardStatePersistent == null) {
                return;
            }
            const {games} = boardStatePersistent;
            if (!boardLoaded.current) {
                boardLoaded.current = true;
                // Update last open date
                setBoardStatePersistent(boardState => {
                    return {...boardState, lastOpenDate: new Date()};
                });
                if(!games || games.length === 0)
                    setDialogOpen("tutorial");
                const todaysBoard = games && games.find(boardState =>
                    boardState.firstOpened &&
                    datesAreOnSameDay(new Date(boardState.firstOpened), GameDate)
                );
                if (!todaysBoard) {
                    // User has not opened today's board yet
                    setBoardStatePersistent(boardState => {
                        const games = [...(boardState.games || []), {
                            firstOpened: new Date(),
                            solved: false,
                            completed: false
                        }];
                        return {...boardState, games};
                    });
                } else {
                    // User has already started today's game
                    const {hints, guesses, inputHintKeyMap} = todaysBoard;
                    setBoard({hints: [...Array((hints || []).length)].fill([]), guesses: guesses || []});
                    setTimeout(() => setIntervalX((i) => {
                        setBoard(boardState => {
                            const hintsPrev = boardState.hints.map((hint, index) => {
                                if (hint.length <= i) {
                                    return [...hint, hints[index][i]];
                                } else return hint;
                            });
                            return {...boardState, hints: hintsPrev};
                        });
                    }, 250, Columns), 250);
                    setHintKeyMap(inputHintKeyMap || {});
                }
            }
        }
        ,
        [boardStatePersistent, setBoard, setHintKeyMap, setBoardStatePersistent]
    );

    // Update hint keymap in local storage
    useEffect(() => {
        if (!boardLoaded.current || !hintsRevealed)
            return;
        setBoardStatePersistent(boardState => {
            const games = [...boardState.games].map(game => {
                    if (game.firstOpened && datesAreOnSameDay(new Date(game.firstOpened), GameDate)) {
                        return {...game, inputHintKeyMap: hintKeyMap};
                    }
                    return game;
                }
            );
            return {
                ...boardState,
                games
            };
        });
    }, [hintKeyMap, boardLoaded, board]);

    const showCompletedToast = (solved, numGuesses) => {
        if(solved){
            if(numGuesses === 1){
                setToast("Genijus!");
            }else if(numGuesses === 2){
                setToast("Valio!");
            }else if(numGuesses === 3){
                setToast("Šaunu!");
            }else if(numGuesses === 4){
                setToast("Puiku!");
            }else if(numGuesses === 5){
                setToast("Neblogai!");
            }else if(numGuesses === 6){
                setToast("Vos vos...");
            }
        }else{
            setToast(Word);
        }
    }

    const solved = board.hints.length > 0 && board.hints[board.hints.length - 1].every(hint => hint === "correct");
    const persistedGame = boardStatePersistent.games.find(game => game.firstOpened && datesAreOnSameDay(new Date(game.firstOpened), GameDate));
    const newlyCompleted = persistedGame && !persistedGame.completed && gameCompleted;

    // Update board state in local storage
    useEffect(() => {
        if (!boardLoaded.current || !hintsRevealed || !boardStatePersistent.games)
            return;

        if(newlyCompleted){
            showCompletedToast(solved, board.guesses.length);
            setCompletedAnim(true);
            if (solved) {
                recordEvent(EVENT_TYPE.SOLVED, { numGuesses: board.guesses.length } );
            } else {
                recordEvent(EVENT_TYPE.FAILED);
            }

        }
        setBoardStatePersistent(boardState => {
            const games = [...boardState.games].map(game => {
                    if (game.firstOpened && datesAreOnSameDay(new Date(game.firstOpened), GameDate)) {
                        return {
                            ...game, guesses: board.guesses, hints: board.hints, ...(newlyCompleted ? {
                                solved,
                                completed: true,
                                completedDate: new Date(),
                            } : {})
                        };
                    }
                    return game;
                }
            );
            return {
                ...boardState,
                games
            };
        });
    }, [board])

    useEffect(() => {
        if(gameCompleted && solved && hintsRevealed && !confetti.current){
            const confettiSettings = {
                target: 'confetti-canvas',
                start_from_edge: true
            };
            confetti.current = new ConfettiGenerator(confettiSettings);
            confetti.current.render();
            return () => confetti.current && confetti.current.clear();
        }
    }, [board]);

    const handleKeyPressEvent = (event) => {
        handleKeyPress(event.key.toUpperCase());
    };

    const handleKeyPress = /*useCallback(*/(key) => {
        if (!typingAllowed)
            return;
        setInputEasterEgg(input => input + key);
        if (Charset.includes(key) && input.length < Columns) {
            setInput(input => input + key);
        } else if (key === "BACKSPACE") {
            // Backspace
            setInput(input => input.substring(0, Math.max(0, input.length - 1)));
        } else if (key === "ENTER" && input.length === Columns) {
            // Return
            setInput("");
            handleGuess(input);
        }
    }/*, [input, typingAllowed]);*/

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPressEvent);
        return () => {
            document.removeEventListener('keydown', handleKeyPressEvent);
        };
    }, [handleKeyPressEvent]);

    const handleGuess = (guess) => {
        if(board.guesses.includes(guess)){
            setToast("Šį žodį jau išbandei");
            setInput(guess);
            return;
        }
        if(Wordlist[guess.toLowerCase()] == null){
            setToast("Žodžio nėra žodyne");
            setInput(guess);
            setShakeAnim(true);
            return;
        }
        setBoard((prev) => {
            return {hints: [...prev.hints, [...Array(Columns)]], guesses: [...prev.guesses, guess]};
        });
        const revealHint = (column) => setBoard((prev) => {
            const idx = prev.guesses.indexOf(guess);
            const hints = prev.hints[idx];
            const letter = guess[column];
            // Number of repetitions of 'letter' in target word
            const numSameLetters = [...Word].filter(x => x === letter).length
            if (letter === Word[column]) {
                hints[column] = "correct";
                setHintKeyMap(keyMap => {
                    const copy = {...keyMap,}
                    copy[letter] = "correct";
                    return copy;
                });
            } else if (Word.includes(letter) &&
                // There is at least one of this letter that:
                // 1) will not be revealed as correct and
                // 2) hasn't been marked as in the wrong position yet
                ([...Word].filter((x, index) => (guess[index] === x && x === letter) || //1)
                    (index < column && guess[index] === letter)).length) < numSameLetters //2)
            ) {
                hints[column] = "wrong_position";
                setHintKeyMap(keyMap => {
                    const copy = {...keyMap,}
                    if (copy[letter] !== "correct")
                        copy[letter] = "wrong_position";
                    return copy;
                });
            } else {
                hints[column] = "non_existent";
                setHintKeyMap(keyMap => {
                    const copy = {...keyMap,}
                    if(copy[letter] == null)
                        copy[letter] = "non_existent";
                    return copy;
                });
            }
            const hintsNew = [...prev.hints];
            hintsNew[idx] = hints;
            return {...prev, hints: hintsNew};
        });
        setIntervalX((x) => {
            revealHint(x);
        }, 300, Columns);
    }

    useEffect(() => {
        if (boardLoaded.current && gameCompleted) {
            setTimeout(() => setDialogOpen("statistics"), 2500);
        }
    }, [board])

    return (
        <>
            {useMemo(() => <Header>
                <HelpIcon className="header-icon" size={24} onClick={() => setDialogOpen("tutorial")}/>
                <StatisticsIcon className="header-icon" size={32} onClick={() => setDialogOpen("statistics")}/>
            </Header>, [setDialogOpen])}
            <canvas id="confetti-canvas"/>
            <div style={{position: "relative", left: "50%"}}>
                <Toast open={toast} text={toast}/>
            </div>
            <div className="content-wrapper">
                <Grid shakeAnim={shakeAnim} onShakeAnimEnd={() => setShakeAnim(false)} completedAnim={completedAnim} input={input} guesses={board.guesses} hints={board.hints}/>
            </div>
            <StatisticsModal open={dialogOpen === "statistics"} data={boardStatePersistent}
                             onCloseClick={() => setDialogOpen(null)}/>
            <TutorialModal open={dialogOpen === "tutorial"} onCloseClick={() => setDialogOpen(null)}/>
            {useMemo(() => <Keyboard hintkeymap={hintKeyMap} keyPress={handleKeyPress}/>, [hintKeyMap, handleKeyPress])}
        </>
    );
};

export default App;