import * as functions from "firebase-functions";
import { connect } from "./config";
import { Meldungen } from "./entity/Meldungen";
import { Benutzer } from "./entity/Benutzer";
import { Ansicht } from "./entity/Ansicht";

export const getMeldung = functions.https.onCall(async (req, res) => {
  if (!res.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  } else {
    const fk_anlagen = req.fk_anlagen;
    const connection = await connect();
    const meldungenRepo = connection.getRepository(Meldungen);

    const allMeldungen = await meldungenRepo
      .createQueryBuilder("meldungen")
      .where("meldungen.fk_anlagen = :id", { id: fk_anlagen })
      .orderBy("meldungen.datum", "DESC")
      .take(3)
      .getMany();

    return { allmeldungen: allMeldungen };
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

export const setIdDevice = functions.https.onCall(async (req, res) => {
  if (!res.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  } else {
    const name = req.name;
    const idDevice = req.idDevice;
    const connection = await connect();
    const usersRepo = connection.getRepository(Benutzer);

    const user = await usersRepo.findOne({
      Anmeldename: name,
    });

    user.idDevice = idDevice;
    await usersRepo.save(user);

    const iduser = user.idBenutzer;

    const ansichtRepo = connection.getRepository(Ansicht);
    const ansicht = await ansichtRepo.findOne({
      FK_Benutzer: iduser,
    });

    return {
      message: "Id Device set",
      idBenutzer: iduser,
      anlage: ansicht.FK_Anlage,
    };
  }
});
