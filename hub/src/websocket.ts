import io = require("socket.io-client");
export function socketConnection(
  { backendHost, backendPort }: { backendHost: string; backendPort: number },
  { hubId, hubSecret }: { hubId: string; hubSecret: string }
) {
  console.log("connecting");
  const socket = io.connect(`http://${backendHost}:${backendPort}`, {
    reconnection: true,
    extraHeaders: {
      Authorization: `Basic ${hubId}.${hubSecret}`,
    },
  });
  return socket;
}