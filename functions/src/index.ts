import * as functions from "firebase-functions";
import { connect } from "./config";
import { Meldungen } from "./entity/Meldungen";

export const getMeldung = functions.https.onRequest(async (req, res) => {
  const connection = await connect();
  const meldungenRepo = connection.getRepository(Meldungen);

  // Get all rows
  const allMeldungen = await meldungenRepo.find();

  res.status(200).send({ data: { allMeldungen } });
});
