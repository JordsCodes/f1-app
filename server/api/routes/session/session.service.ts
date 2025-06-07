import axios from "axios";
import { SessionResponse, Circuit } from "./session.model.js";

export const getSessionsForYear = async (year: number) => {
  const { data } = await axios.get(
    `https://api.openf1.org/v1/sessions?date_start>=${year}-01-01&date_end<=${year}-12-31`
  );

  const isPreSeasonTesting = (session: SessionResponse) => {
    const duration =
      (Number(new Date(session.date_end)) -
        Number(new Date(session.date_start))) /
      (1000 * 60 * 60);

    return duration >= 2;
  };

  const practice1 = data.filter(
    (session: SessionResponse) =>
      session.session_name === "Practice 1" && !isPreSeasonTesting(session)
  );

  const practice2 = data.filter(
    (session: SessionResponse) =>
      session.session_name === "Practice 2" && !isPreSeasonTesting(session)
  );

  const practice3 = data.filter(
    (session: SessionResponse) =>
      session.session_name === "Practice 3" && !isPreSeasonTesting(session)
  );

  const sprintShootout = data.filter(
    (session: SessionResponse) => session.session_name === "Sprint Shootout"
  );

  const sprint = data.filter(
    (session: SessionResponse) => session.session_name === "Sprint"
  );

  const qualifying = data.filter(
    (session: SessionResponse) => session.session_name === "Qualifying"
  );

  const race = data.filter(
    (session: SessionResponse) => session.session_name === "Race"
  );

  const circuits = data.reduce((acc: Circuit[], session: SessionResponse) => {
    if (
      !acc.some(
        (circuit: Circuit) => circuit.circuitKey === session.circuit_key
      ) &&
      !isPreSeasonTesting(session)
    )
      acc.push({
        circuitKey: session.circuit_key,
        circuitShortName: session.circuit_short_name,
        location: session.location,
        countryKey: session.country_key,
        countryCode: session.country_code,
        countryName: session.country_name,
        practice1Key: practice1.find(
          (sr: SessionResponse) => sr.meeting_key === session.meeting_key
        )?.session_key,
        practice2Key: practice2.find(
          (sr: SessionResponse) => sr.meeting_key === session.meeting_key
        )?.session_key,
        practice3Key: practice3.find(
          (sr: SessionResponse) => sr.meeting_key === session.meeting_key
        )?.session_key,
        sprintShootoutKey: sprintShootout.find(
          (sr: SessionResponse) => sr.meeting_key === session.meeting_key
        )?.session_key,
        sprintKey: sprint.find(
          (sr: SessionResponse) => sr.meeting_key === session.meeting_key
        )?.session_key,
        qualifyingKey: qualifying.find(
          (sr: SessionResponse) => sr.meeting_key === session.meeting_key
        )?.session_key,
        raceKey: race.find(
          (sr: SessionResponse) => sr.meeting_key === session.meeting_key
        )?.session_key,
      });
    return acc;
  }, []);

  return {
    circuits,
    practice1,
    practice2,
    practice3,
    sprintShootout,
    sprint,
    qualifying,
    race,
  };
};
