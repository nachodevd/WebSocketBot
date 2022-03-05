import fetch from "node-fetch";
export async function deleteMessage(
  token: string,
  channel: string,
  id: string
) {
  const response = await fetch(
    `https://discord.com/api/v9/channels/${channel}/messages/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bot ${token}`,
      },
    }
  );
  const data = await response.json();
  return data
}

{
  "name": "websocketbot",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "ts-node-dev src/index.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "node-fetch": "^2.6.7",
    "ws": "^8.5.0"
  },
  "devDependencies": {
    "ts-node-dev": "^1.1.8"
  }
}
