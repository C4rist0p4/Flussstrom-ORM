import * as functions from "firebase-functions";
import { connect } from "./config";
import { Meldungen } from "./entity/Meldungen";
import { Benutzer } from "./entity/Benutzer";
import { Ansicht } from "./entity/Ansicht";
import { Anlagen } from "./entity/Anlagen";

export const getMeldung = functions.https.onCall(async (req, res) => {
  if (!res.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
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

export const getMachinery = functions.https.onCall(async (req, res) => {
  if (!res.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  } else {
    const idAnlage = req.idAnlage;
    const connection = await connect();
    const anlagenRepo = connection.getRepository(Anlagen);

    const anlage = await anlagenRepo
      .createQueryBuilder("anlagen")
      .innerJoinAndSelect("anlagen.fk_anlagentyp", "fk_anlagentyp")
      .where("anlagen.idAnlagen = :id", { id: idAnlage })
      .getOne();

    return anlage;
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

//iduser und FK_Anlage in andren funkrion abfragen
export const setIdDevice = functions.https.onCall(async (req, res) => {
  if (!res.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
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

    return {
      message: "Id Device set",
    };
  }
});

export const getUserData = functions.https.onCall(async (req, res) => {
  if (!res.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  } else {
    const name = req.name;
    const connection = await connect();
    const usersRepo = connection.getRepository(Benutzer);

    const user = await usersRepo.findOne({
      Anmeldename: name,
    });

    const iduser = user.idBenutzer;

    const ansichtRepo = connection.getRepository(Ansicht);
    const ansicht = await ansichtRepo.find({
      select: ["FK_Anlage"],
      where: {
        FK_Benutzer: iduser,
      },
    });

    return {
      message: "Userdata",
      idBenutzer: iduser,
      anlage: ansicht,
    };
  }
});
