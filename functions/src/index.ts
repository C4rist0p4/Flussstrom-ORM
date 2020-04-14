import * as functions from "firebase-functions";
import { connect } from "./config";
import { Meldungen } from "./entity/Meldungen";
import { Benutzer } from "./entity/Benutzer";
const auth = require("./validateFirebaseIdToken");
//umschreiben
export const getMeldung = functions.https.onRequest(async (req, res) => {
  const result = await auth(req, res);
  if (result === false) {
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

export const checkUsers = functions.https.onCall(async (req) => {
  const name = req.name;
  const password = req.password;

  const connection = await connect();
  const usersRepo = connection.getRepository(Benutzer);

  const user = await usersRepo.findOne({
    Anmeldename: name,
    Passwort: password,
  });

  if (user === undefined) {
    return { message: "false" };
  } else {
    return { message: "true" };
  }
});
//testen
export const setIdDevice = functions.https.onCall(async (req, res) => {
  if (!res.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  } else {
    const { name, idDevice } = req.body.data;
    const connection = await connect();
    const usersRepo = connection.getRepository(Benutzer);

    const user = await usersRepo.findOne({
      Anmeldename: name,
    });

    user.idDevice = idDevice;
    await usersRepo.save(user);

    return { message: "Id Device set", idBenutzer: user.idBenutzer };
  }
});
