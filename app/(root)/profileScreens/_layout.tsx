import { Stack, useRouter } from "expo-router";
import { Button } from "react-native";
import { useTranslation } from "react-i18next";

export default function ProfileScreenLayout() {
  const { t } = useTranslation();
  const route = useRouter();

  return (
    <Stack screenOptions={{
      headerShown: true,
      headerLeft: () => <Button onPress={() => route.dismiss()} title={t('back')} />
    }}>
      <Stack.Screen name="personalData" options={{ headerTintColor: "#ff4e00", title: t('personalData') }} />
      <Stack.Screen name="paymentsMethods" options={{ headerTintColor: "#ff4e00", title: t('paymentsMethods') }} />
      <Stack.Screen name="settings" options={{ headerTintColor: "#ff4e00", title: t('settings') }} />
      <Stack.Screen name="myCars" options={{ headerTintColor: "#ff4e00", title: t('myCars') }} />
      <Stack.Screen name="security" options={{ headerTintColor: "#ff4e00", title: t('security') }} />
      <Stack.Screen name="feedback" options={{ headerTintColor: "#ff4e00", title: t('feedback') }} />
      <Stack.Screen name="logout" options={{ headerTintColor: "#ff4e00", title: t('logout') }} />
    </Stack>
  );
}
