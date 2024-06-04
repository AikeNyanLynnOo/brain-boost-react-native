import { BACKEND_BASE_URL } from "@env";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import Toast from "react-native-toast-message";
import { makeRequest } from "../../utils/makeRequest";

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onToastHide = () => {
    success && router.replace("/sign-in");
  };

  const handleSignUp = () => {
    try {
      makeRequest({
        method: "post",
        maxBodyLength: Infinity,
        url: `${BACKEND_BASE_URL}/auth/register`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          password: form.password,
          confirm_password: form.confirmPassword,
        }),
      }).then((res) => {
        if (res && res.success) {
          setSuccess(true);
          return Toast.show({
            type: "success",
            text1: `Sign up successfully`,
          });
        }
        setSuccess(false);
        console.log(res);
        Toast.show({
          type: "error",
          text1: res?.statusText,
          text2: res?.message,
        });
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: `Sign Up Error`,
      });
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
            handlePress={handleSignUp}
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

export default SignUp;
