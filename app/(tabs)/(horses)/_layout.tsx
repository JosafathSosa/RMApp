import { Stack } from "expo-router";
import React from "react";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="addHorseScreen"
        options={{ headerShown: false, navigationBarHidden: true }}
      />
      <Stack.Screen
        name="horseDetailsScreen"
        options={{ headerShown: false, navigationBarHidden: true }}
      />
    </Stack>
  );
}
