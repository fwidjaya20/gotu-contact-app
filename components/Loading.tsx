import { ReactNode } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Loading(): ReactNode {
  return (
    <View className="flex mx-6 min-h-full items-center justify-center">
      <ActivityIndicator />
    </View>
  );
}
