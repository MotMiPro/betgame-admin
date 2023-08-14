import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  disconnectSocket,
  initiateSocket,
} from "../../../../services/sockets/moonSocket";
import GameConfig from "./GameConfig";
import LastGames from "./LastGames";

export default function GameAllConfig() {
  const [isconnected, setIsconnected] = useState(false);
  const [isShowLatestGame, setIsShowLatestGame] = useState(true);
  const { authHeader } = useSelector((state) => state.authentication);

  useEffect(() => {
    initiateSocket(authHeader, (status) => {
      setIsconnected(status);
    });
    return () => disconnectSocket();
  }, []);

  function handleViewLatestGame(status) {
    setIsShowLatestGame(status);
  }

  return (
    isconnected && (
      <main>
        <GameConfig handleViewLatestGame={handleViewLatestGame} />
        {isShowLatestGame && (
          <section style={{ marginTop: 30 }}>
            <LastGames />
          </section>
        )}
      </main>
    )
  );
}
