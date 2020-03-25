import * as functions from "firebase-functions";
import { connect } from "./config";
import { Meldungen } from "./entity/Meldungen";
import { Between } from "typeorm";
const auth = require("./validateFirebaseIdToken");

export const getMeldung = functions.https.onRequest(async (req, res) => {
  const result = await auth(req, res);
  if (result == false) {
    res.status(403).send("Unauthorized");
  } else {
    const connection = await connect();
    const meldungenRepo = connection.getRepository(Meldungen);
    // all rows
    const allMeldungen = await meldungenRepo.find({
      datum: Between(new Date("2018-04-05"), new Date("2018-04-07"))
    });

    res.status(200).json({ data: allMeldungen });
  }
});
