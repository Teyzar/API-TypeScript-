import express, { json, Request, Response } from "express";

import * as db from './config/db';
import Routes from "./routes/router";

db.ConnectDB();


const client = express().use(json());


client.use('/api/router', Routes );

const port = process.env.PORT || 3000;

client.listen(port, () => {
    console.log(`listening on port:${port}...`);
})