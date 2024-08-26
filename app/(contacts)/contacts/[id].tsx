import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { useGetContactDetail } from "@/modules/contacts";
import { Stack, useLocalSearchParams } from "expo-router";
import { Fragment, ReactNode, useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

type Params = {
  id: string;
};

export default function ContactDetailScreen(): ReactNode {
  const { id } = useLocalSearchParams<Params>();
  const {
    contact,
    failure,
    getContact,
    state: { hasError, isLoaded, isLoading },
  } = useGetContactDetail();

  useEffect(() => {
    if (id) {
      getContact(id);
    }
  }, [id]);

  return (
    <SafeAreaView>
      <ScrollView className="min-h-full">
        <Stack.Screen
          options={{
            title: contact?.fullName ?? "Contact Detail",
          }}
        />
        {isLoading && <Loading />}
        {hasError && <Error title={failure!.message} />}
        {!isLoaded && (
          <Fragment>
            <View className="bg-gray-300 w-24 rounded-full aspect-square mt-4 mx-auto flex items-center justify-center">
              <Text className="text-4xl font-semibold">
                {contact?.fullName[0]}
              </Text>
            </View>
          </Fragment>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
