import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons, styles } from "../constants";

export interface FormFieldPropType {
  title: string;
  value: string;
  type?: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  [key: string]: any;
}

const FormField = ({
  title,
  value,
  type = "text",
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: FormFieldPropType) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="w-full h-14 px-4 bg-black-100 rounded-2xl border border-black-200 focus:border-secondary-200 flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          autoCapitalize="none"
          placeholder={placeholder || "Pleaes enter input"}
          placeholderTextColor={styles.colors.gray[200]}
          onChangeText={handleChangeText}
          secureTextEntry={type === "password" && !showPassword}
          {...props}
        />

        {type === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
