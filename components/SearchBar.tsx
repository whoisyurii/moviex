import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface Props {
  // interface tells RN app what type Props should be
  placeholder: string;
  onPress?: () => void;
  /* The `?` indicates that this prop is optional, meaning it doesn't have to be provided when using the `SearchBar` component. () => void return means that we don't have to return nothing, rather to use router.push navigation functionality to push to a different URL*/
}

const SearchBar = ({ placeholder, onPress }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress} // comes from index.tsx to route
        placeholder={placeholder}
        value=""
        onChangeText={() => {}}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
        // The logic for input and search is going to be in index.tss component, we move it there like in usual React
      />
    </View>
  );
};

export default SearchBar;
