import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="movie/[id]"
        options={{ headerShown: false }}
      ></Stack.Screen>
      {/* These Stack Screen components hide the group header bar which appears on the top. So it's like overall header. */}
    </Stack>
  );
}
