import * as functions from "firebase-functions";
import { connect } from "./config";
import { Meldungen } from "./entity/Meldungen";
import { Benutzer } from "./entity/Benutzer";
import { Ansicht } from "./entity/Ansicht";
import { Anlagen } from "./entity/Anlagen";
import { Messwerte } from "./entity/Messwerte";
import { Bilder } from "./entity/Bilder";

export const getMeasuring = functions.https.onCall(async (req, res) => {
  if (!res.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  } else {
    const fk_anlagen = req.idAnlage;
    const connection = await connect();
    const messwertenRepo = connection.getRepository(Messwerte);

    const alltMeasuring = await messwertenRepo
      .createQueryBuilder("messwerte")
      .select("messwerte.messwert")
      .addSelect("messwerte.datum")
      .addSelect("messwerte.timestamp_device")
      .where("messwerte.fk_anlagen = :id", { id: fk_anlagen })
      .orderBy("messwerte.datum", "DESC")
      .take(15)
      .getMany();

    return { measuring: alltMeasuring };
  }
});

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
      .innerJoinAndSelect("meldungen.fk_meldungstyp", "fk_meldungstyp")
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
    const a = JSON.stringify(req);
    const data = JSON.parse(a);
    let anlagen = [];

    const connection = await connect();
    const anlagenRepo = connection.getRepository(Anlagen);

    for (const item of data.idAnlagen) {
      anlagen.push(
        await anlagenRepo
          .createQueryBuilder("anlagen")
          .innerJoinAndSelect("anlagen.fk_anlagentyp", "fk_anlagentyp")
          .where("anlagen.idAnlagen = :id", { id: item.id })
          .getOne()
      );
    }
    return anlagen;
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

export const getPictures = functions.https.onCall(async (req, res) => {
  if (!res.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  } else {
    const fk_anlagen = req.fk_anlagen;

    const connection = await connect();
    const bilderRepo = connection.getRepository(Bilder);

    const picture = await bilderRepo
      .createQueryBuilder("bilder")
      .where("bilder.fk_anlagen = :id", { id: fk_anlagen })
      .orderBy("bilder.datum", "DESC")
      .getOne();

    return { pictureURL: picture.url };
  }
});
