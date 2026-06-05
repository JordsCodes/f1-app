type Circuit = {
  label: string;
  raceKey: string;
  sprintKey: string;
};

type LapPosition = {
  lap: number;
  position: number;
};

type DriverLapPositions = {
  driverDetails: {
    broadcast_name: string;
    team_colour: string;
    team_name: string;
  };
  positions: LapPosition[];
};

export type { Circuit, DriverLapPositions };
