import { GetServerSideProps, GetStaticProps } from "next";
import { useState, MouseEvent } from "react";
import { wordList } from "../utils/wordList";
import { colorClasses } from "../utils/colorClasses";

type BoardProps = { words: string[] };

export const Board = ({ words }: BoardProps) => {
  const [colors, setColors] = useState(words.map((_) => 0));

  const updateColorAtIndex =
    (i: number) => (e: MouseEvent<HTMLButtonElement>) => {
      setColors(([...colors]) => {
        const newColor = (colors[i] + 1) % colorClasses.length;
        colors[i] = newColor;
        return colors;
      });
    };
  return (
    <div className="board">
      {words.map((word, i) => {
        const updateColorTo = updateColorAtIndex(i);
        const colorClass = colorClasses[colors[i]];
        return (
          // <div key={word} className="card">
          <button
            key={word}
            className={`card ${colorClass}`}
            onClick={updateColorTo}
          >
            {colorClass === colorClasses[0] && word}
          </button>
          // </div>
        );
      })}
    </div>
  );
};

export default Board;

export const getServerSideProps: GetServerSideProps<
  BoardProps
> = async ({}) => {
  const words = Array(25)
    .fill(null)
    .map(() => Math.floor(Math.random() * wordList.length))
    .map((index) => wordList[index]);
  return {
    props: {
      words,
    },
  };
};
