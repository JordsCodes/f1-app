import axios from "axios";
import { DriverResponse } from "./lap-position.model.js";

export const generateLapPositions = async (
  sessions: { session: string; key: string }[]
) => {
  const sessionPositions: Record<
    string,
    {
      key: string;
      drivers: Record<
        string,
        {
          driverDetails: any;
          positions: { lap: number; position: number }[];
        }
      >;
    }
  > = {};

  for (const session of sessions) {
    sessionPositions[session.session] = {
      key: session.key,
      drivers: {},
    };

    const { data: lapData } = await axios.get(
      `https://api.openf1.org/v1/laps?session_key=${session.key}`
    );
    const { data: positionData } = await axios.get(
      `https://api.openf1.org/v1/position?session_key=${session.key}`
    );
    const { data: driverData } = await axios.get(
      `https://api.openf1.org/v1/drivers?session_key=${session.key}`
    );

    // Build driver laps
    const allDriverLaps: Record<
      string,
      { driverDetails: any; laps: { lapStart: number; lapNumber: number }[] }
    > = {};

    for (const lap of lapData) {
      const driver = driverData.find(
        (d: any) => d.driver_number === lap.driver_number
      );

      const lapStart = lap.date_start
        ? new Date(lap.date_start).getTime()
        : new Date("2020-01-01T00:00:00.000Z").getTime();

      if (!allDriverLaps[driver.driver_number]) {
        allDriverLaps[driver.driver_number] = {
          driverDetails: driver,
          laps: [{ lapStart, lapNumber: lap.lap_number }],
        };
      } else {
        allDriverLaps[driver.driver_number].laps.push({
          lapStart,
          lapNumber: lap.lap_number,
        });
      }
    }

    // Build driver positions
    const allDriverPositions: Record<
      string,
      { position: number; date: number }[]
    > = {};
    for (const pos of positionData) {
      if (!allDriverPositions[pos.driver_number])
        allDriverPositions[pos.driver_number] = [];

      const posDate = new Date(pos.date).getTime();

      allDriverPositions[pos.driver_number].push({
        position: pos.position,
        date: posDate,
      });
    }

    // Iterate over each driver's laps
    for (const [
      driverNumberStr,
      { driverDetails, laps: driverLaps },
    ] of Object.entries(allDriverLaps)) {
      const driverNumber = driverNumberStr;
      const driverPositions = allDriverPositions[driverNumber];
      sessionPositions[session.session].drivers[driverNumber] = {
        driverDetails,
        positions: [],
      };
      const driverSession =
        sessionPositions[session.session].drivers[driverNumber];

      // For each lap, pick the latest possible position and add it to the driver's session
      for (let i = 0; i < driverLaps.length; i++) {
        const lap = driverLaps[i];
        const nextLapStart = driverLaps[i + 1]?.lapStart || Infinity;

        const positionsThisLap = driverPositions.filter(
          (p) => p.date >= lap.lapStart && p.date < nextLapStart
        );

        if (positionsThisLap.length === 0) continue;

        const latest = positionsThisLap[positionsThisLap.length - 1];

        driverSession.positions.push({
          lap: lap.lapNumber,
          position: latest.position,
        });
      }
    }
  }

  return sessionPositions;
};
