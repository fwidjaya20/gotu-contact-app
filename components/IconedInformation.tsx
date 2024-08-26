import { ReactNode } from "react";
import { Text, View } from "react-native";

type Props = {
  icon: ReactNode;
  title: string;
  value: string;
};

export function IconedInformation({ icon, title, value }: Props): ReactNode {
  return (
    <View className="flex flex-row flex-1 items-center justify-start gap-3">
      <View className="border rounded-lg w-8 h-8 flex items-center justify-center">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="uppercase text-sm font-semibold text-gray-500">
          {title}
        </Text>
        <Text className="text-lg">{value}</Text>
      </View>
    </View>
  );
}
