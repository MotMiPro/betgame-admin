import React from "react";
import { defaultCurrency } from "../../../../configs/configs";
import TableGames from "../LayoutGame";

export default function TopSLotsGame() {
  const gainerParam = -1;
  const loserParam = 1;
  const loser = {
    limit: 5,
    page: 1,
    filterBy: {
      game: "Slot",
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
      game: "Slot",
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
      game: "Slot",
      currency: defaultCurrency["USDT"],
    },
    sortBy: {
      amount: -1,
    },
  };
  return (
    <TableGames
      title="game slots"
      loser={loser}
      gainer={gainer}
      player={topPlayQuery}
      currencyInit={defaultCurrency["USDT"]}
      string="Slot"
    />
  );
}
