import express, { Request, Response } from "express";
import haversine from "haversine";

const app = express();
const PORT = 3001;

const Airports = new Map();

const getLocationData = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat"
  );
  const airportData = (await res.text()).split("\n");
  airportData.forEach((airport) => {
    const fields = airport.split(",");
    const code = fields[4];
    const latitude = fields[6];
    const longitude = fields[7];
    if (code && !isNaN(latitude) && !isNaN(longitude)) {
      const formattedCode = code.replace(/"/g, "");
      Airports.set(formattedCode, {
        latitude,
        longitude,
      });
    }
  });
};

interface Flight {
  departureTime: string;
  arrivalTime: string;
  carrier: string;
  origin: string;
  destination: string;
}

interface ScoredFlight extends Flight {
  score: Number;
  duration: Number;
  distance: Number;
}

app.get("/search", async (req: Request, res: Response) => {
  const { maxDuration, preferredCarrier, minDeparture, maxDeparture } =
    req.query;

  const ScoredFlights: ScoredFlight[] = [];

  const flightsResponse = await fetch(
    "https://gist.githubusercontent.com/bgdavidx/132a9e3b9c70897bc07cfa5ca25747be/raw/8dbbe1db38087fad4a8c8ade48e741d6fad8c872/gistfile1.txt"
  );

  if (!flightsResponse.ok) {
    return res.status(400);
  }

  const flights: Flight[] = await flightsResponse.json();

  await getLocationData();

  for (const flight of flights) {
    const flightDurationMs =
      new Date(flight.arrivalTime).getTime() -
      new Date(flight.departureTime).getTime();

    if (
      new Date(flight.departureTime) < new Date(maxDeparture) &&
      new Date(flight.departureTime) > new Date(minDeparture)
    )
      continue;

    const flightDurationHours = flightDurationMs / (60 * 60 * 1000);

    if (maxDuration && flightDurationHours > maxDuration) continue;

    const carrierPreference = preferredCarrier ? 0.9 : 1;
    const originCode = Airports.get(flight.origin);
    const destinationCode = Airports.get(flight.destination);
    const distanceInMiles = haversine(originCode, destinationCode, {
      unit: "mile",
    });

    const score = flightDurationHours * carrierPreference + distanceInMiles;

    const scoredFlight: ScoredFlight = {
      ...flight,
      score,
      duration: flightDurationHours,
      distance: distanceInMiles,
    };

    ScoredFlights.push(scoredFlight);
  }

  const sortedScoredFlights = ScoredFlights.sort((a, b) => a.score - b.score);
  res.json(sortedScoredFlights);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
