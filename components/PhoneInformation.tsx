import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Text, View } from "react-native";

type Props = {
  title: string;
  value: string;
};

export function PhoneInformation({ title, value }: Props): ReactNode {
  return (
    <View className="flex flex-row flex-1 items-center justify-start gap-3">
      <View className="border rounded-lg w-8 h-8 flex items-center justify-center">
        <Ionicons name="call-outline" size={20} />
      </View>
      <View>
        <Text className="uppercase text-sm font-semibold text-gray-500">
          {title}
        </Text>
        <Text className="text-lg">{value}</Text>
      </View>
    </View>
  );
}
