import io from "socket.io-client";
import { SOCKET_BASE_API } from "../../configs/configs";

let socket;

export const initiateSocket = (token, cb) => {
  try {
    const url = `${SOCKET_BASE_API}moon`;
    socket = io(url, token);
    if (socket.active) {
      cb(true);
    } else {
      cb(false);
    }
  } catch (error) {
    console.log("socket io connecting", error);
  }
};

export const socketSubscriber = (cb, type = "MOON.PLAYERS") => {
  if (!socket) return true;
  socket.on(type, (res) => {
    return cb(null, res);
  });
};

export const socketEmitter = (token, cb) => {
  if (!socket) return true;
  socket.emit("MOON.FORCE_STOP", token, (err) => {
    return cb(err);
  });
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
