import axios from "axios";
import { SessionResponse, Circuit } from "./circuit.model.js";

export const getCircuitsForYear = async (year: number) => {
  const { data } = await axios.get(
    `https://api.openf1.org/v1/sessions?date_start>=${year}-01-01&date_end<=${year}-12-31`
  );

  const uniqueCircuits = data.reduce(
    (acc: Circuit[], session: SessionResponse) => {
      if (
        !acc.some(
          (circuit: Circuit) => circuit.circuitKey === session.circuit_key
        )
      )
        acc.push({
          circuitKey: session.circuit_key,
          circuitShortName: session.circuit_short_name,
          location: session.location,
          countryKey: session.country_key,
          countryCode: session.country_code,
          countryName: session.country_name,
          meetingKey: session.meeting_key,
        });
      return acc;
    },
    []
  );

  return uniqueCircuits;
};
