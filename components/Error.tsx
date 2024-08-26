import { ReactNode } from "react";
import { Text, View } from "react-native";

type Props = {
  title: string;
};

export default function Error({ title }: Props): ReactNode {
  return (
    <View className="flex mx-6 min-h-full items-center justify-center">
      <Text>{title}</Text>
    </View>
  );
}
