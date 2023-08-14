import React from "react";
import MyGames from "./MyGames";
import TopDiceGame from "./TopGames";

export default function DiceGame() {
  return (
    <main>
      <TopDiceGame />
      <MyGames />
    </main>
  );
}
