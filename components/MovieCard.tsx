import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/600x400/1a1a1a/ffffff.png `,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text
          className="text-sm font-bold text-white mt-2"
          numberOfLines={1}
          // numberOfLines is the special prop to define number of lines in Text component, so it doesn't grow up and makes standardized view of text for each component.
        >
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Image
            source={icons.star}
            className="size-4"
            // the Image component requires a source prop, not src, and it must be an object with a uri string or a static require
          />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {
              release_date?.split("-")[0]
              // .split("-") — splits the string by "-" into an array. Example: "2023-11-04" → ["2023", "11", "04"].
              // [0] — gets the first element of the array, i.e., the year.
            }
          </Text>
          {/* <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
