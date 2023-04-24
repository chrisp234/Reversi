import express from 'express';
const cookieParser = require("cookie-parser");

import { makeGameController } from './controllers/GameController';
import { makeSessionsController } from './controllers/SessionsController';
import { makeInvitationsController } from './controllers/InvitationsController';

const app = express()
const PORT = process.env['PORT'] ?? 3333
app.use(express.json())
app.use(cookieParser())


makeGameController(app);
makeSessionsController(app);
makeInvitationsController(app);

console.log(`Starting on port ${PORT}`);
app.listen(PORT)