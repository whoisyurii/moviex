import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  // framework-specific hook Next.js or Expo Router that retrieves URL search parameters (e.g., ?id=123).
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );
  // fetchMovieDetails(id as string) sends a request to fetch data about a movie using the given id.
  // id as string is a TypeScript type assertion that tells TypeScript to treat id as a string.

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
        <View
          className="flex-col items-start justify-center mt-5 px-5"
          // View for text elements under the poster image
        >
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {
                movie?.release_date?.split("-")[0]
                // .split('-'): splits the date string into an array: ["2023", "08", "15"].
                // [0]: takes the first part, which is the year.
              }
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

//// In Next.js or Expo Router project, a file named like [id].tsx is a dynamic route. --
// -- [id] is a placeholder for a variable part of the route. It can be changed.
// -- This file will handle URLs like /movies/123, /movies/abc, etc., once you visit them.
// -- The value from the URL (e.g., 123) is available as a parameter, usually params.id.

//// NativeWind notes:
// the syntax h-[550px] is used instead of h-550px because custom values (like 550px) must be wrapped in square brackets.
// Tailwind has predefined spacing values like h-4, h-10, etc. If you use a value that’s not in the default scale (like 550px), you need to write it in square brackets as a custom value:
// ✅ h-[550px] = custom height of 550 pixels
// ❌ h-550px = invalid, not recognized by Tailwind

// gap-x-1: adds horizontal spacing between child elements, in this case 1 = 4px (Tailwind’s spacing scale).

// px-2: horizontal padding = 8px left & right
// py-1: vertical padding = 4px top & bottom
// rounded-md: medium border radius, usually 6px – makes corners slightly rounded
