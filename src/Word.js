import seedrandom from 'seedrandom'
import Wordlist from "./components/Wordlist";
const now = new Date();
const rand = seedrandom(now.getFullYear().toString() + now.getMonth().toString() + now.getDay().toString())()
const words = Object.keys(Wordlist)
const Word = words[Math.floor(rand * words.length)].toUpperCase()
export default Word;