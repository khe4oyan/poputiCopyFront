import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Link href="/add">login</Link>
      <Link href="/messages">messages</Link>
      <Link href="/notifications">notifications</Link>
      <Link href="/profile">profile</Link>
      <Link href="/traffics">traffics</Link>
      <Link href="/auth/login">login</Link>
      <Link href="/auth/register">register</Link>
    </View>
  );
}
