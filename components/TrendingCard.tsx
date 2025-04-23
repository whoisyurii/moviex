import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    // wrap entire Card component into Link, so the whole component will be clickable.
    // define asChild because we want entire touchable opacity to be clickable, it will inherit the Link properties.
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        {/* Touchable Opacity - a wrapper for making views respond properly to touches.  */}
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover" // Determines how to resize the image when the frame doesn't match the raw image dimensions.
        />
        <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
          <MaskedView
            // MaskedView in React Native lets you show part of one view through the shape of another — like a stencil or cut-out effect. Common use: text or images filled with gradients.
            maskElement={
              <Text className="font-bold text-white text-6xl">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text className="text-sm font-bold mt-2 text-light-200 numberOfLines={2}">
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;

// React Native MaskedView npm
// @react-native-masked-view/masked-view
// npm install --save @react-native-masked-view/masked-view
// import MaskedView from '@react-native-masked-view/masked-view';

// Example of usage MaskedView:
// Text appears with a gradient background only inside the letters.
