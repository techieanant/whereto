WhereTo Backend Engineering Test
Candidate: Anant Upad 
Date: Nov 1st 2024
Objective:
We will build a simple website backend for searching for flights.

Tasks:
Understand the requirements below.
Outline a design for the described system.
Implement code to perform the query. 
Describe the interface for the service.
Describe how you might approach the requested improvements.

Requirements:
The user must be able to search for a flight based on any combination of the following:
Acceptable departure time range (min/max date+time)
Maximum acceptable flight duration (in hours)
Preferred airline carrier
The system must query a data provider and return a list of matching flights.
The results must be scored according to the following algorithm and sorted:
(flight duration in hours) * (carrier preference) + (distance in miles between airports)
Lower scores are better
Carrier preference score is 0.9 for preferred carriers and 1.0 for other carriers
The data for the available flights should be queried from this URL: https://gist.githubusercontent.com/bgdavidx/132a9e3b9c70897bc07cfa5ca25747be/raw/8dbbe1db38087fad4a8c8ade48e741d6fad8c872/gistfile1.txt
You may assume the following function exists:
async function getDistanceBetweenAirports(code1: string, code2: string): Promise<number>
Bonus: Implement this function using Haversine distance and an airport lookup API such as the one found at https://openflights.org/data
The system must expose an HTTP API to provide this service.

Improvements:
Design a way to store a user’s flight selections in a database.
Design a way to improve the performance of the system.
How else might the project be made better?

