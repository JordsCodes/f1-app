type DriverDetails = {
  meeting_key: number;
  session_key: number;
  driver_number: number;
  broadcast_name: string;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  first_name: string;
  last_name: string;
  headshot_url: string;
  country_code: string;
};

export interface SessionResponse
  extends Record<
    string,
    {
      key: string;
      drivers: Record<
        string,
        {
          driverDetails: DriverDetails;
          positions: { lap: number; position: number }[];
        }
      >;
    }
  > {}
