//@ts-nocheck
import WebSocket from "ws";
import { deleteMessage } from "./functions/deleteMessage";
const ws = new WebSocket("wss://gateway.discord.gg/?v=9&encoding=json");
let interval = 0,
  token = "",
  payload = {
    op: 2,
    d: {
      token: token,
      intents: 513,
      properties: {
        $os: "Linux",
        $browser: "chrome",
        $device: "chrome",
      },
    },
  };
ws.on("open", function open() {
  ws.send(JSON.stringify(payload));
}).on("message", async function incoming(data) {
  payload = JSON.parse(data);
  let { t, d, event, op } = payload;
  switch (op) {
    case 10:
      const { heartbeat_interval } = d;
      interval = heartbeat(heartbeat_interval);
      break;
  }
  switch (t) {
    case "MESSAGE_CREATE":
      console.log(d.author.username, ":", d.content);
      deleteMessage(token, d.channel_id, d.id)
        .then((res) => {
          console.log("then", res);
        })
        .catch((res) => {
          console.log("catch", res);
        });
  }
});
const heartbeat = (ms) => {
  return setInterval(() => {
    ws.send(JSON.stringify({ op: 2, d: null }));
  }, ms);
};
