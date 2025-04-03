import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const route = useRouter();

  useEffect(() => {
    setTimeout(() => {
      route.push("/profileScreens/ridesHistory");
    }, 1000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Link href="/profile">profile</Link>
      <Link href="/messages">messages</Link>
      <Link href="/notifications">notifications</Link>
      <Link href="/traffics">traffics</Link>
      <Link href="/auth/login">login</Link>
      <Link href="/auth/register">register</Link>
    </View>
  );
}
