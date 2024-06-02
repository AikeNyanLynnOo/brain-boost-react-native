import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Tabs, Redirect } from "expo-router";
import TabIcon from "@/components/TabIcon";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { icons, styles } from "../../constants";
const TabLayout = () => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: styles.colors.secondary.DEFAULT,
          tabBarInactiveTintColor: styles.colors.gray[100],
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: styles.colors.primary,
            borderTopWidth: 1,
            borderTopColor: styles.colors.primary,
            height: 84 + insets.bottom,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                name={"Home"}
                icon={icons.home}
                focused={focused}
              />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                name={"Create"}
                icon={icons.plus}
                focused={focused}
              />
            ),
          }}
        /> */}
        <Tabs.Screen
          name="my-courses"
          options={{
            title: "My Courses",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                name={"My Courses"}
                icon={icons.bookmark}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                name={"Profile"}
                icon={icons.profile}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
