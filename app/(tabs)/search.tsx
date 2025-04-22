import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(
    () =>
      fetchMovies({
        query: searchQuery,
        // if query: '' (doesn't exist) then it returns most popular movies, as we set it in fetchMovies endpoint query.
      }),
    false
    // by defining this false we disable autoFetch from useFetch hook, which is set to true by default
  );

  // Trigger refetch whenever searchQuery changes
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      // set debouncing and async function with 500ms of timeout to load
      if (searchQuery.trim()) {
        // We use .trim() to remove extra spaces from the beginning and end of the searchQuery. This prevents calling refetch() when the user types only spaces (like " "), which isn't a valid search.
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
        // resizeMode - determines how to resize the image when the frame doesn't match the raw image dimensions.
      />
      <FlatList
        data={movies} // the array of items to display.
        renderItem={({ item }) => <MovieCard {...item} />} // how each item should be rendered.
        keyExtractor={(item) => item.id.toString()} // gives each item a unique key.
        className="px-5" // applies padding via Tailwind.
        numColumns={3} // shows items in 3 columns (for grid layout).
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }} // styling for each row (like centering, gap between items).
        contentContainerStyle={{ paddingBottom: 100 }} // adds padding at the bottom of the list.
        ListHeaderComponent={
          // The ListHeaderComponent is a special prop of FlatList in React Native. It allows you to add a component at the top of the list. This is useful for logos, titles, or any content that should appear before the list items.
          // Even if you write ListHeaderComponent at the bottom of your component code, React Native's FlatList will render its content at the top of the list, because that’s what this prop is designed to do.
          // It’s not about where you place it in the JSX code, but how FlatList uses it internally.

          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              // trim() removes spaces from the start and end of a string.
              // The ! after length in movies?.length! > 0 is a non-null assertion operator in TypeScript. It tells TypeScript: "Trust me, length is not null or undefined here."
              // It's used because movies might be undefined or null, so the optional chaining (?.) is used — but once accessed, length! asserts that it’s definitely a number.
              <Text className="text-xl text-white font-bold">
                Search result for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
      />
    </View>
  );
};

export default Search;

// You can put a regular <View> above the FlatList, outside of it. But using ListHeaderComponent has advantages:
// Why use ListHeaderComponent instead of a regular <View>:
// - Scrolls together: Anything in ListHeaderComponent scrolls with the list. If you place a separate <View> above, it stays fixed.
// - Part of the list layout: It's included in the list's measurement, so layout and spacing are more predictable.
// - Helps with filtering: If you include a TextInput in ListHeaderComponent, it stays visible and scrolls up naturally — very useful for search/filter bars.
