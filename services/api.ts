/* This code snippet is defining a constant `TMDB_CONFIG` that holds configuration settings for interacting with The Movie Database (TMDb) API.

It sets the base URL, pulls the API key from environment variables, and prepares HTTP headers including a Bearer token for authorization.

A Bearer token is a type of access token used in HTTP authentication. It tells the server, "I have the right to access this resource."
Authorization: Bearer YOUR_TOKEN_HERE

*/
export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  // I extract my own API key from .env file in the root.
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  // everything starts with template literal and BASE_URL to make sure the http is valid.
  // if there's query (user's input) = then we will get this dynamic query, which is in the first statement. We apply encodeURIComponent to it, which encodes a text string as a valid component of a Uniform Resource Identifier (URI). It's better no encode when you pass plain strings into URL to ensure that there's no weird symbols or characters and browser can process it.
  // otherwise this endpoint will give us the most popular movies by descending; could've be called request (as I did req, res in React)

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
    // response/result of fetching endpoint with it's URL, of GET method and headers described in CONFIG
  });

  if (!response.ok) {
    // ts-ignore allows us to ignore response.statusText type error
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();
  /* `const data = await response.json();` is a statement that is asynchronously parsing the JSON response body of the `response` object obtained from fetching the specified endpoint. The `await` keyword is used to wait for the response to be converted to JSON before proceeding with the execution of the code. */

  return data.results;
  // return contains actual movies that we want to get out of this function
};

// /discover/movie
