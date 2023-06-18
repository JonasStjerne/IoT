import io = require("socket.io-client");
export function socketConnection(
	{ backendHost, backendPort }: { backendHost: string; backendPort: number },
	{ hubId, hubSecret }: { hubId: string; hubSecret: string }
) {
	console.log("connecting to backend");
	const socket = io.connect(`${backendHost}:${backendPort}`, {
		reconnection: true,
		extraHeaders: {
			Authorization: `Basic ${hubId}.${hubSecret}`,
		},
	});
	return socket;
}
