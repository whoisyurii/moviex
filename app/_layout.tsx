import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      {/* <StatusBar hidden={true} /> */}
      <StatusBar translucent backgroundColor="transparent" />

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
        {/* These Stack Screen components hide the group header bar which appears on the top. So it's like overall header. */}
      </Stack>
    </>
  );
}

// First I've used StatusBar hidden prop and wrapped whole view area into Fragment, but then my bottom routing bar moved downwards.
// But it's not responsive for someone who uses android with buttons down there in navigation.
// Tried safeareview with provider - it didn't work
// LEFT IT TRANSLUCENT (temporary?)
// using StatusBar translucent={true} does affect layout — it allows your content to render under the status bar, making the status bar appear transparent. But this means you must manually add padding at the top to avoid your content being hidden behind it.
