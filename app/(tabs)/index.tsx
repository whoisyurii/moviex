import { Image, ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  // hooks are the same as in React - start with useXXXXX

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        /* `showsVerticalScrollIndicator={false}` is a prop used in the ScrollView component to hide the vertical scroll indicator that appears on the right side of the scroll view when content overflows. */
        showsVerticalScrollIndicator={false}
        /* The `contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}` in the ScrollView component is setting the styling for the content container within the ScrollView. */
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <View className="flex-1 mt-5">
          <SearchBar />
        </View>
      </ScrollView>
    </View>
  );
}
