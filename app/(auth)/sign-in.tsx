import { BACKEND_BASE_URL } from "@env";

import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import Toast from "react-native-toast-message";
import { ResponseType, makeRequest } from "../../utils/makeRequest";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onToastHide = () => {
    router.replace("/home");
  };

  const handleSignIn = () => {
    // setSubmitting(true);
    // console.log("URL>>", `${BACKEND_BASE_URL}/auth/login`);
    try {
      makeRequest({
        method: "post",
        maxBodyLength: Infinity,
        url: `${BACKEND_BASE_URL}/auth/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(form),
      }).then((res) => {
        if (res && res.success) {
          Toast.show({
            type: "success",
            text1: `Sign in successfully`,
          });
        }
      });
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "90%",
        }}
      >
        <View className="w-full h-full justify-center items-center px-4">
          <Image
            source={images.ownLogoNoBg}
            resizeMode="contain"
            className="h-[100px] w-[100px]"
          />
          <Text className="text-2xl font-psemibold text-center text-white">
            Sign In
          </Text>
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
          <CustomButton
            title="Sign In"
            handlePress={handleSignIn}
            isLoading={submitting}
            containerStyles="w-full mt-10"
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-sm text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-sm font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
        <Toast
          onHide={onToastHide}
          position="bottom"
          visibilityTime={1500}
          bottomOffset={20}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
