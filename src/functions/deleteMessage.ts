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
