// const toNumericalValue = (str: string) => {
//   if (/[ABRN]{25}/.test(str)) {
//     return -1;
//   }
//   return Number(
//     (str.split("") as Array<"A" | "B" | "R" | "N">).reduceRight((acc, v) => {
//       const index = { A: 0, B: 1, R: 2, N: 3 } as const;
//       return acc + index[v].toString();
//     }, "")
//   );
// };

import { GetServerSideProps } from "next";
import { colorClasses } from "../../utils/colorClasses";

// const toCode = (n: number, code = ""): string => {
//   if (n <= 0) {
//     return code;
//   }
//   const remainder = n % 26;
//   const nextN = Math.floor(n / 26);
//   console.log(remainder, nextN, String.fromCharCode(remainder + 65));
//   return toCode(nextN, String.fromCharCode(remainder + 65) + code);
// };

// const fromCode = (code: string, n = 0): number => {
//   if (code === "") {
//     return n;
//   }
//   const value = code[0].charCodeAt(0) - 65;

//   return fromCode(code.slice(1), n + value * 26 ** code.length);
// };

// const fromNumericalValue = (n:number) => {

//   return Number(
//     (str.split("") as Array<"A" | "B" | "R" | "N">).reduceRight((acc, v) => {
//       const index = { A: 0, B: 1, R: 2, N: 3 } as const;
//       return acc + index[v].toString();
//     }, "")
//   );
// }

// console.log(fromCode(toCode(toNumericalValue("ARBBNBRBAN"))));

const getIndex = (letter: "A" | "B" | "N" | "R") => {
  const letterMap = { A: 3, B: 1, R: 0, N: 2 };
  const index = letterMap[letter];
  return index != null ? index + 1 : 0;
};

export const Page = ({ code }: { code: string }) => {
  return (
    <div
      className="grid"
      style={{
        display: "grid",
        gap: "0.25rem",
        padding: "0.25rem",
        minHeight: "20rem",
        gridTemplateColumns: "repeat(5,auto)",
      }}
    >
      {code.split("").map((space, i) => {
        const index = getIndex(space as "A");
        return <div key={i} className={colorClasses[index]}></div>;
      })}
    </div>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps<{
  code: string;
}> = async ({ params }) => {
  // console.log(params.id);
  const spaces = [
    "A",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    Math.random() < 0.5 ? "B" : "R",
    "B",
    "B",
    "B",
    "B",
    "B",
    "B",
    "B",
    "B",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
  ];

  const shuffledSpaces: string[] = [];

  for (const space of spaces) {
    let looking = true;
    let index = Math.floor(Math.random() * spaces.length);
    console.log(space);
    while (looking) {
      console.log(index, shuffledSpaces[index] == null);
      if (shuffledSpaces[index] == null) {
        shuffledSpaces[index] = space;
        looking = false;
      }
      index = Math.floor(Math.random() * spaces.length);
    }
  }
  return { props: { code: shuffledSpaces.join("") } };
};
