import express, { json, Request, Response } from "express";
import * as db from "../config/db";
import { ObjectId } from "mongodb";
import * as bcrypt from 'bcrypt';

import Info from "../model/detail";
import { exit } from "process";

const router = express.Router();

router.get("/info", async (req: Request, res: Response) => {
  const collection = db.collections.details;
  try {
    const detail = await collection?.find({}).toArray();
    res.status(200).send(detail);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/info/:_id", async (req: Request, res: Response) => {
    const collection = db.collections.details;

    const id = req.params._id;

    try {
      const queryId = {_id: new ObjectId(id)};

      const data = await collection?.findOne(queryId) as Info;

      if (data) res.status(200).send(data);

    } catch (error) {
      res.status(404).send(`Failed to find matching _id with the id of ${id}`);
    }
  });


router.post("/info", async (req: Request, res: Response) => {
  const collection = db.collections.details;

  try {
    const input = req.body;
    const salt = await bcrypt.genSalt(10);

    input.Password = await bcrypt.hash(input.Password, salt);

    const data = input as Info;

    const result = await collection?.insertOne(data);

    result
      ? res.status(200).send(result)
      : res.status(500).send("Failed to create Info");
      
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req: Request, res: Response) => {
    const collection = db.collections.details;
    const input = req.body;

        if (typeof input.Email !== 'string') {
            throw res.status(500).send('property [email] must be type string'); 
        } else if (typeof input.Password !== 'string') {
            throw res.status(500).send('property [password] must be type string'); 
        }

    try {
        const infos = await collection?.find({}).toArray();
        infos?.map((value, index, array) => {
            if (input.Email === value.Email && input.Password === value.Password) {
                res.status(200).json({id: array[index]._id, status: "OK"});
                // console.log(array[index]);
            }
        })
    } catch(error) {
        return res.status(500).json({error: error});
    }
});




export default router;
