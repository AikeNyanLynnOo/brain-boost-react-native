import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

interface TabIcon {
  color: string;
  icon: ImageSourcePropType;
  name?: string;
  focused?: boolean;
}

const TabIcon = ({ color, icon, name, focused }: TabIcon) => {
  return (
    <View className="justify-center items-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`text-xs ${focused ? "font-psemibold" : "font-pregular"}`}
        style={{
          color,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default TabIcon;

const styles = StyleSheet.create({});
