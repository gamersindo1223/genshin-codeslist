const express = require("express")
const path = require("path")
require("./scrap")
const app = express()
const cors = require("cors")
const port =  3000
const ratelimit = require("express-rate-limit")
const limiter = rateLimit({
	windowMs: 5000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true,
  message: `You requested the api toomany time wait 1-5 seconds before requesting`, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)
app.use(cors())
app.get('/codes-list', async(req,res) =>{
    res.sendFile(path.join(__dirname + "/tmp/codes.txt"))
})
app.get('/', (req, res) => {
const uptime = process.uptime();
const hours = Math.trunc(uptime / 3600).toString().padStart(2, "0");
const minutes = Math.trunc((uptime % 3600) / 60).toString().padStart(2, "0");
const seconds = Math.trunc(uptime % 60).toString().padStart(2, "0");
res.send(`The program has been running for 
${hours}:${minutes}:${seconds} \n Go to /api/genshin-codes to see the api`)
})
app.get('/api/genshin-codes', async(req,res) =>{
    var fs = require("fs");
var text = fs.readFileSync(path.join(__dirname + "/tmp/codes.txt"), "utf-8");
var textByLine = text.toString().split("\n")
  res.json({creator: "Gamers_indo1223" ,scrappedweb: "https://www.eurogamer.net/genshin-impact-codes-livestream-active-working-how-to-redeem-9026", hostedin: "cyclic", activecodes: textByLine})
})

app.listen(port, "127.0.0.1", () => {
console.log(`Example app listening on port ${port}`)
})