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
      <Stack.Screen name="personalData" options={{ headerTintColor: "#A55CCF", title: t('personalData') }} />
      <Stack.Screen name="paymentsMethods" options={{ headerTintColor: "#A55CCF", title: t('paymentsMethods') }} />
      <Stack.Screen name="settings" options={{ headerTintColor: "#A55CCF", title: t('settings') }} />
      <Stack.Screen name="myCars" options={{ headerTintColor: "#A55CCF", title: t('myCars') }} />
      <Stack.Screen name="security" options={{ headerTintColor: "#A55CCF", title: t('security') }} />
      <Stack.Screen name="feedback" options={{ headerTintColor: "#A55CCF", title: t('feedback') }} />
      <Stack.Screen name="logout" options={{ headerTintColor: "#A55CCF", title: t('logout') }} />
    </Stack>
  );
}
