import express from 'express';
const cookieParser = require("cookie-parser");
const path = require('path');
import { makeGameController } from './controllers/GameController';
import { makeSessionsController } from './controllers/SessionsController';
import { makeInvitationsController } from './controllers/InvitationsController';
import { makeLeaderboardController } from './controllers/LeaderboardController';

const app = express()
const PORT = process.env['PORT'] ?? 3333
app.use(express.json())
app.use(cookieParser())
app.use(express.static('dist', {index: 'index.html'}))

makeGameController(app);
makeSessionsController(app);
makeInvitationsController(app);
makeLeaderboardController(app);

console.log(`Starting on port ${PORT}`);
app.get("*", (req, res, next) => {
    console.log("in catch all")
    res.sendFile(path.join(__dirname, "../dist/index.html"))
})
app.listen(PORT)
