import { Client, Databases, Query } from "react-native-appwrite";
import { compatibilityFlags } from "react-native-screens";

//// track the searches made by a user
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

//// setup new AppWrite client
const client = new Client()
  // set default AppWrite endpoint
  .setEndpoint("https://cloud.appwite.io/v1")
  // then choose our project / pass an ID of it
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

//// setup DataBase instance belonging to this AppWrite Client

// initialize new database and pass the client that we wanna initialize this database on:
const database = new Databases(client);

//// updateSearchCount is being passed to search page search.tsx
export const updateSearchCount = async (query: string, movie: Movie) => {
  const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal("searchTerm", query),
    // in listDocuments we pass:
    // -- DATABASE_ID within which we want to list documents
    // -- COLLECTION_ID within which exactly collection we wanna fetch it
    // -- the actual Query, where we want to match the searchTerm with the query, that the user is currently passing in (be sure to pass it within the [array], not {object}, because there can be multiple queries or criteria in future)
  ]);
  if (result.documents.length > 0) {
    const existingMovie = result.documents[0];

    await database.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      existingMovie.$id,
      {
        count: existingMovie.count + 1,
      }
    );
  }
};

// check if a record of that search has already been stored
// if a document is found - increment the searchCount field
// if no document is found (new search term)---
// --- create a new document in Appwrite database => initialize count +1
