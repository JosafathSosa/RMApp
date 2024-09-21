import { Stack } from "expo-router";
import React from "react";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="pregnantStatus" options={{ headerShown: false }} />
      <Stack.Screen name="allPregnantMares" options={{ headerShown: false }} />
    </Stack>
  );
}
