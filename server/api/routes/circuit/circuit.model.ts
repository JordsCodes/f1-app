export interface SessionResponse {
  location: string;
  country_key: number;
  country_code: string;
  country_name: string;
  circuit_key: number;
  circuit_short_name: string;
  session_type: string;
  session_name: string;
  date_start: string;
  date_end: string;
  gmt_offset: string;
  session_key: number;
  meeting_key: number;
  year: number;
}

export interface Circuit {
  circuitKey: number;
  circuitShortName: string;
  location: string;
  countryKey: number;
  countryCode: string;
  countryName: string;
  meetingKey: number;
}
