import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSignIn = () => {
    // if (form.email === "" || form.password === "") {
    //   Alert.alert("Error", "Please fill in all fields");
    // }

    setSubmitting(true);

    try {
      setTimeout(() => {
        Alert.alert("Success", "User signed up successfully");
        router.replace("/sign-in");
      }, 1000);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          minHeight: "100%",
        }}
        // alwaysBounceHorizontal={false}
        // alwaysBounceVertical={false}
        // bounces={false}
      >
        <View className="w-full m-h-[90vh] justify-center items-center px-4">
          <Image
            source={images.ownLogoNoBg}
            resizeMode="contain"
            className="h-[100px] w-[100px]"
          />
          <Text className="text-2xl font-psemibold text-center text-white">
            Sign Up
          </Text>
          <FormField
            title="First Name"
            placeholder="Enter first name"
            value={form.firstName}
            handleChangeText={(e) => setForm({ ...form, firstName: e })}
            otherStyles="mt-5"
          />
          <FormField
            title="Last Name"
            placeholder="Enter last name"
            value={form.lastName}
            handleChangeText={(e) => setForm({ ...form, lastName: e })}
            otherStyles="mt-5"
          />
          <FormField
            title="Email"
            placeholder="Enter email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-5"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            placeholder="Enter password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
            type="password"
          />
          <FormField
            title="Confirm Password"
            placeholder="Enter confirm password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mt-5"
            type="password"
          />
          <CustomButton
            title="Sign Up"
            handlePress={handleSignIn}
            isLoading={submitting}
            containerStyles="w-full mt-10"
          />
          <View className="flex justify-center pt-5 flex-row gap-2 pb-10">
            <Text className="text-sm text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-sm font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
