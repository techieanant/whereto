# How to run the project

- Install Bun (https://bun.sh/)
- Run `bun install` in the project directory
- Run `bun index.ts` in the project directory

# Improvement Ideas

- Validate the query params using a schema validator like Yup or Zod
- Use csv-parse to parse the fetched airports csv and store geocoordinates it in a redis
- Use a logger like Winston to log errors and info
- Limit the number of results returned by the API using a query param
- Dockerize the application for easy deployment
