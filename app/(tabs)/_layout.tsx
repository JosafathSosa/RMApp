import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="/home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(horses)"
        options={{
          title: "Caballos",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="horse-head" size={27} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(inventary)"
        options={{
          title: "Inventario",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="archive" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(calendar)"
        options={{
          title: "Calendario",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="horseshoe" size={27} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
