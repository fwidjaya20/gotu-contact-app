import { ReactNode } from "react";
import { Text, View } from "react-native";

type Props = {
  title: string;
  value?: string;
};

export function Information({ title, value = "-" }: Props): ReactNode {
  return (
    <View>
      <Text className="font-semibold text-base">{title}</Text>
      <Text className="text-lg">{value}</Text>
    </View>
  );
}
