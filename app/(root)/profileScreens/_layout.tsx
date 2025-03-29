import { Stack } from "expo-router";

export default function ProfileScreenLayout() {
  return <Stack screenOptions={{
    headerShown: true,
    headerBackVisible: false,
  }}>
    <Stack.Screen name="personalData" options={{ headerTintColor: "#ff4e00", title: "Personal Data" }} />
    <Stack.Screen name="paymentsMethods" options={{ headerTintColor: "#ff4e00", title: "Payments Methods" }} />
    <Stack.Screen name="ridesHistory" options={{ headerTintColor: "#ff4e00", title: "Rides History" }} />
    <Stack.Screen name="settings" options={{ headerTintColor: "#ff4e00", title: "Settings" }} />
    <Stack.Screen name="myCars" options={{ headerTintColor: "#ff4e00", title: "My Cars" }} />
    <Stack.Screen name="security" options={{ headerTintColor: "#ff4e00", title: "Security" }} />
    <Stack.Screen name="feedback" options={{ headerTintColor: "#ff4e00", title: "Feedback" }} />
    <Stack.Screen name="logout" options={{ headerTintColor: "#ff4e00", title: "Logout" }} />
  </Stack>;
}
