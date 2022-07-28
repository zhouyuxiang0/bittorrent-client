import { readFileSync } from "fs";
import { decode } from "bencode";
import { createSocket } from "dgram";
import { parse as urlParse } from "url";
const torrent = decode(readFileSync("./puppy.torrent"));
const url = urlParse(torrent.announce.toString("utf8"));
const socket = createSocket("udp4");
const myMsg = Buffer.from("hello?", "utf8");
socket.send(
	myMsg,
	0,
	myMsg.length,
	url.port ? +url.port : 0,
	url.host || void 0,
	(e, b) => {
		console.log(e);
		console.log(b);
	}
);
socket.on("message", (msg) => {
	console.log("message is", msg);
});
