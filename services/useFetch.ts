// useFetch(fetchMovies)

import { useEffect, useState } from "react";

// useFetch is a custom React hook.
// It takes two inputs:
// fetchFunction: a function that returns a promise (like an API call).
// autoFetch: a boolean. If true, it will fetch data automatically (default is true).
// It uses generics (<T>) to say: “the data we get can be of any type.”
// <T> is a generic function that allows us to later pass the specific data types that we want the function to return to be.
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
      // If an error happens, the catch block runs.
    } catch (err) {
      // @ts-ignore tells TypeScript: "Ignore type checking for the next line" — likely used here because err might not be of type Error.;
      // @ts-ignore
      setError(err instanceof Error ? err : new Error("An error occurred"));
      // setError(...) saves the error.
      // Is the caught thing a real Error object (with .message, .stack, etc.)? (In JavaScript, anything can be thrown — not just Error objects.)
      // If yes — use it.
      // If not — create a proper Error using new Error("An error occurred").
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);
  // useEffect runs once as soon as the component mounts/loads — because of the empty array [] (no dependencies).
  // Inside useEffect, it checks: if (autoFetch) — should we load data automatically?
  // If autoFetch === true, it calls fetchData(), which:
  // - sets loading to true
  // - clears any previous error
  // - runs the async fetchFunction() and stores the result with setData()
  // - catches and stores any errors
  // - sets loading to false at the end
  // So useEffect makes the hook fetch data automatically when the component is first rendered, only if autoFetch is true.
  return { data, loading, error, refetch: fetchData, reset };
  // refetch: fetchData --- this just renames the existing fetchData function to refetch when returning it.
  // So now in the component, you can call refetch() instead of fetchData() — it's just a more meaningful name for reloading data manually.
  // It’s a naming trick (alias), not a new function.
};

export default useFetch;
