import { Stack } from "expo-router";

const Rootlayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="transfer/banktransfer"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="transfer/banktransfer/wallet"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="transfer/banktransfer/bank"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="transfer/banktransfer/success"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="transfer/grouptranfer"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="transfer/grouptranfer/create"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="transfer/grouptranfer/add-member"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="transfer/grouptranfer/details"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="chat/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="fundme/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="kyc/index"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default Rootlayout;
