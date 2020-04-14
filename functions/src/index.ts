import * as functions from "firebase-functions";
import { connect } from "./config";
import { Meldungen } from "./entity/Meldungen";
import { Benutzer } from "./entity/Benutzer";
const auth = require("./validateFirebaseIdToken");

export const getMeldung = functions.https.onRequest(async (req, res) => {
  const result = await auth(req, res);
  if (result == false) {
    res.status(403).send("Unauthorized");
  } else {
    const { fk_anlagen } = req.body.data;
    const connection = await connect();
    const meldungenRepo = connection.getRepository(Meldungen);

    const allMeldungen = await meldungenRepo
      .createQueryBuilder("meldungen")
      .where("meldungen.fk_anlagen = :id", { id: fk_anlagen })
      .orderBy("meldungen.datum", "DESC")
      .take(3)
      .getMany();

    res.status(200).json({ data: allMeldungen });
  }
});

export const checkUsers = functions.https.onRequest(async (req, res) => {
  const { name, password } = req.body.data;

  const connection = await connect();
  const usersRepo = connection.getRepository(Benutzer);

  const user = await usersRepo.findOne({
    Anmeldename: name,
    Passwort: password,
  });

  if (user == null) {
    res.status(200).json({ data: "false" });
  } else {
    res.status(200).json({ data: "user true" });
  }
});

export const setIdDevice = functions.https.onRequest(async (req, res) => {
  const result = await auth(req, res);
  if (result == false) {
    res.status(403).send("Unauthorized");
  } else {
    const { name, idDevice } = req.body.data;
    const connection = await connect();
    const usersRepo = connection.getRepository(Benutzer);

    const user = await usersRepo.findOne({
      Anmeldename: name,
    });

    user.idDevice = idDevice;
    await usersRepo.save(user);

    res.status(200).json({ data: "Id Device set" });
  }
});
