import { Client, Databases, ID, Query } from "react-native-appwrite";

//// track the searches made by a user

// access keys
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
//// setup new AppWrite client
const client = new Client()
  // set default AppWrite endpoint
  .setEndpoint("https://cloud.appwrite.io/v1")
  // then choose our project / pass an ID of it
  .setProject(PROJECT_ID);
//// setup DataBase instance belonging to this AppWrite Client

// initialize new database and pass the client that we wanna initialize this database on:
const database = new Databases(client);

//// updateSearchCount is being passed to search page search.tsx
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
      // in listDocuments we pass:
      // -- DATABASE_ID within which we want to list documents
      // -- COLLECTION_ID within which exactly collection we wanna fetch it
      // -- the actual Query, where we want to match the searchTerm with the query, that the user is currently passing in (be sure to pass it within the [array], not {object}, because there can be multiple queries or criteria in future)
    ]);
    if (result.documents.length > 0) {
      // check if a record of that search has already been stored ---
      // --- if a document is found - increment the searchCount field for the first element of the result array
      const existingMovie = result.documents[0];
      await database.updateDocument(
        // the list of options (createDocument, updateDocument, etc.) is coming from the database object. That object likely comes from an SDK (like Appwrite, Firebase, etc.), and these are its available methods you can use to interact with your database. I set these available methods in my Appwrite project settings.
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        // The $ sign is a naming convention used by Appwrite to mark special system properties of documents — like $id, $createdAt, etc. These are automatically included when you get a document from the database.
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      // if no document is found (new search term)---
      // --- create a new document in Appwrite database => initialize count 1
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//// defining function for showing Trending Movies, based on count from AppWrite DB
export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(3), // show the top 3 movies
      Query.orderDesc("count"),
      // put them in descending order based on 'count' property, taken from DB Appwrite
    ]);
    return result.documents as unknown as TrendingMovie[];
    // I've defined return as unknown or as TrendingMovie[] to match TypeScript expectations. Then it knows what exactly we are returning.
  } catch (error) {
    console.log("Error:", error);
    return undefined;
  }
};

//// Some side notes:
// .documents comes from a database query result. It’s a list (array) of matching records (documents). Each "document" is like a data object in a collection (like a row in SQL).
