import sys
import random
import os
import shutil

def main(args):
    with open(args[1], "r") as listr:
        count = sum(1 for _ in listr)
        listr.seek(0)
        with open("tmp", "w") as tmp:
            word_chosen_index = random.randint(0, count - 1)
            word_chosen = ""
            idx = 0
            for word in listr:
                if idx == word_chosen_index:
                    print("Today's word: " + word[:-1])
                    word_chosen = word[:-1]
                else:
                    tmp.write(word)
                idx += 1
            cwd = os.getcwd()
            shutil.move(os.path.join(cwd, "tmp"), os.path.join(cwd, args[1]))
    with open(os.path.dirname(__file__) + "/../src/Word.js", "w") as file:
        file.write("const Word = \"" + word_chosen.upper() + "\"; export default Word;")

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python3 update_word.py [path-to-wordlist]")
        exit(1)
    main(sys.argv)