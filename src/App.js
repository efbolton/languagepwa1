import React, { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import data from "./words.json";

let gameItems = [];

function App() {
  const [mainDivDisplay, setMainDivDisplay] = useState("hidden");
  const [pullDataStatus, setPullDataStatus] = useState(0);
  const [result, setResult] = useState("");
  const [pastWord, setPastWord] = useState("");
  const [pastMatch, setPastMatch] = useState("");
  const [cardDisabled, setCardDisabled] = useState(false);
  const [CardDisplay0, setCardDisplay0] = useState(true);
  const [CardDisplay1, setCardDisplay1] = useState(true);
  const [CardDisplay2, setCardDisplay2] = useState(true);
  const [CardDisplay3, setCardDisplay3] = useState(true);
  const [CardDisplay4, setCardDisplay4] = useState(true);
  const [CardDisplay5, setCardDisplay5] = useState(true);
  const [cards, setCards] = useState(0);
  const [gameButtonText, setGameButtonText] = useState("Start Game");
  const { width, height } = useWindowSize();
  const [confetti, setConfetti] = useState("none");

  let category = "",
    randomCatagories = [
      "color",
      "fruit",
      "country",
      "body",
      "places",
      "animal",
      "clothes",
      "veggies",
      "food",
      "drink",
      "job",
      "bathroom",
      "kitchen",
      "living room",
      "transportation",
      "family",
      "classroom",
      "numbers",
    ];

  function startGame() {
    setConfetti("none");
    setPullDataStatus(0);
    setCardDisplayFunc(true);
    setCardDisabled(false);
    setMainDivDisplay("");
    setResult("");
    setPastWord("");
    setPastMatch("");
    setCards(0);
    setGameButtonText("Reset Game");
  }

  const randomCatSelection = Math.trunc(Math.random() * 17);

  const pulldata = () => {
    const randomSelection = Math.trunc(Math.random() * 5);

    const randomTranslationSelection = Math.trunc(Math.random() * 2);

    let i = 0;
    let ii = 0;
    gameItems = [];

    category = randomCatagories[randomCatSelection];
    while (i < 5) {
      if (category == data[ii].cat) {
        if (i == randomSelection) {
          gameItems.push({
            word: data[ii].english,
            match: "x",
            key: ii.toString(),
          });
          gameItems.push({
            word: data[ii].french,
            match: "x",
            key: ii.toString(),
          });
        } else {
          if (randomTranslationSelection) {
            // multiple english / 1 french

            gameItems.push({
              word: data[ii].english,
              match: "",
              key: ii.toString(),
            });
          } else {
            // multiple french/ 1 english

            gameItems.push({
              word: data[ii].french,
              match: "",
              key: ii.toString(),
            });
          }
        }

        i++;
      }
      ii++;
    }
    console.log(1, data);

    const s = data.sort(func);
    data = s;

    function func(a, b) {
      return 0.5 - Math.random();
    }

    console.log(2, data);
  };

  if (pullDataStatus == 0) {
    setPullDataStatus(1);
    pulldata();
  }
  const handleClick = (number, word, match) => {
    //console.log(mainDivDisplay);
    // console.log(
    //   "card#:",
    //   number,
    //   "/ currentWord:",
    //   word,
    //   "/ pastWord:",
    //   pastWord,
    //   "/ current match:",
    //   match,
    //   "/ pastmatch",
    //   pastMatch,
    //   "#ofCards",
    //   cards
    // );

    //turn over card that was clicked
    if (number == 0) {
      setCardDisplay0(!CardDisplay0);
    } else if (number == 1) {
      setCardDisplay1(!CardDisplay1);
    } else if (number == 2) {
      setCardDisplay2(!CardDisplay2);
    } else if (number == 3) {
      setCardDisplay3(!CardDisplay3);
    } else if (number == 4) {
      setCardDisplay4(!CardDisplay4);
    } else if (number == 5) {
      setCardDisplay5(!CardDisplay5);
    }
    //**********************************************
    // check it match is the same as the past match
    if (match == "x" && pastMatch == match) {
      // we have a match!!!
      setCardDisabled(true);
      setResult("M A T C H!! 😁");
      setConfetti("block");
    } else {
      // NO match!!
      if (cards == 0) {
        // after 1st card selected
        setResult("🤔");
        setCards(1);
        setPastMatch(match);
        setPastWord(word);
      } else {
        // after 2nd card selected
        setResult("NO match!! 😔");
        setCardDisabled(true);
        setCards(0);
        setPastWord("");
        setPastMatch("");
        setTimeout(function () {
          setCardDisplayFunc(true);
          setCardDisabled(false);
          setResult("Try again! 🤪 ");
        }, 2000);
      }
    }
  };

  function setCardDisplayFunc(value) {
    setCardDisplay0(value);
    setCardDisplay1(value);
    setCardDisplay2(value);
    setCardDisplay3(value);
    setCardDisplay4(value);
    setCardDisplay5(value);
  }

  return (
    // main div
    // <div className="flex flex-col justify-center items-center w-full h-screen m-10">
    <div className="flex flex-col justify-center items-center w-full h-full">
      {/* div w/ start game button */}
      <div className="flex mt-5">
        <span
          className="px-7 py-3 bg-blue-600 text-white font-medium 
          text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 
          active:shadow-xl transition duration-150 ease-in-out"
          onClick={() => startGame()}
        >
          {gameButtonText}
        </span>
      </div>

      {/* confetti */}
      <div style={{ display: confetti }}>
        {/* 
           https://www.npmjs.com/package/react-confetti
          https://reactjsexample.com/confetti-without-the-cleanup/ 
          <Confetti width={width} height={height} /> 
          */}
        <Confetti width={width} height="1900px" />
      </div>

      {/* div containing result span */}
      <div className="flex m-5">
        <h1 className="font-medium leading-tight text-4xl mt-0 mb-2 text-blue-600">
          {result}
        </h1>
      </div>

      {/* div with cards (buttons) */}
      <div
        // https://stackoverflow.com/questions/70477538/tailwind-not-working-when-using-variables-react-js
        className={`flex flex-col ${mainDivDisplay}`}
      >
        <div className="flex flex-row">
          <button
            disabled={cardDisabled}
            onClick={() =>
              handleClick(0, gameItems[0].word, gameItems[0].match)
            }
          >
            {CardDisplay0 ? "🔐" : gameItems[0].word}
          </button>
          <button
            disabled={cardDisabled}
            onClick={() =>
              handleClick(1, gameItems[1].word, gameItems[1].match)
            }
          >
            {CardDisplay1 ? "🔐" : gameItems[1].word}
          </button>
        </div>
        <div className="flex flex-row">
          <button
            disabled={cardDisabled}
            onClick={() =>
              handleClick(2, gameItems[2].word, gameItems[2].match)
            }
          >
            {CardDisplay2 ? "🔐" : gameItems[2].word}
          </button>
          <button
            disabled={cardDisabled}
            onClick={() =>
              handleClick(3, gameItems[3].word, gameItems[3].match)
            }
          >
            {CardDisplay3 ? "🔐" : gameItems[3].word}
          </button>
        </div>
        <div className="flex flex-row">
          <button
            disabled={cardDisabled}
            onClick={() =>
              handleClick(4, gameItems[4].word, gameItems[4].match)
            }
          >
            {CardDisplay4 ? "🔐" : gameItems[4].word}
          </button>
          <button
            disabled={cardDisabled}
            onClick={() =>
              handleClick(5, gameItems[5].word, gameItems[5].match)
            }
          >
            {CardDisplay5 ? "🔐" : gameItems[5].word}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
