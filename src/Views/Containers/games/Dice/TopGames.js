import React from "react";
import TableGames from "../LayoutGame";
import { defaultCurrency } from "../../../../configs/configs";

export default function TopDiceGame() {
  const gainerParam = -1;
  const loserParam = 1;
  const loser = {
    limit: 5,
    page: 1,
    filterBy: {
      game: "Dice",
      currency: defaultCurrency["USDT"],
    },
    sortBy: {
      amount: loserParam,
    },
  };
  const gainer = {
    limit: 5,
    page: 1,
    filterBy: {
      game: "Dice",
      currency: defaultCurrency["USDT"],
    },
    sortBy: {
      amount: gainerParam,
    },
  };
  const topPlayQuery = {
    limit: 5,
    page: 1,
    filterBy: {
      game: "Dice",
      currency: defaultCurrency["USDT"],
    },
    sortBy: {
      amount: -1,
    },
  };

  return (
    <TableGames
      title="dice game"
      loser={loser}
      gainer={gainer}
      player={topPlayQuery}
      currencyInit={defaultCurrency["USDT"]}
      string="Dice"
    />
  );
}
