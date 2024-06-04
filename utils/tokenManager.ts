import * as SecureStore from "expo-secure-store";

export const setToken = async (tokenName: string, tokenValue: string) =>
  SecureStore.setItemAsync(tokenName, tokenValue);

export const getToken = async (tokenName: string) => {
  const token = await SecureStore.getItemAsync(tokenName);
  return token;
};

export const deleteToken = async (tokenName: string) =>
  SecureStore.deleteItemAsync(tokenName);
