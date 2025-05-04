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
      <Stack.Screen name="personalData" options={{ headerTintColor: "#1C2A82", title: t('personalData') }} />
      <Stack.Screen name="paymentsMethods" options={{ headerTintColor: "#1C2A82", title: t('paymentsMethods') }} />
      <Stack.Screen name="settings" options={{ headerTintColor: "#1C2A82", title: t('settings') }} />
      <Stack.Screen name="myCars" options={{ headerTintColor: "#1C2A82", title: t('myCars') }} />
      <Stack.Screen name="security" options={{ headerTintColor: "#1C2A82", title: t('security') }} />
      <Stack.Screen name="feedback" options={{ headerTintColor: "#1C2A82", title: t('feedback') }} />
      <Stack.Screen name="logout" options={{ headerTintColor: "#1C2A82", title: t('logout') }} />
    </Stack>
  );
}
