import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { useContactFavorite, useGetContactDetail } from "@/modules/contacts";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { Fragment, ReactNode, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Params = {
  id: string;
};

export default function ContactDetailScreen(): ReactNode {
  const { id } = useLocalSearchParams<Params>();

  const { toggle } = useContactFavorite();
  const {
    contact,
    failure,
    favorite,
    getContact,
    ui: { isError, isLoaded, isLoading },
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
            headerRight() {
              return (
                <TouchableOpacity onPress={() => toggle(id)}>
                  {favorite[id] ? (
                    <Ionicons name="star" size={24} />
                  ) : (
                    <Ionicons name="star-outline" size={24} />
                  )}
                </TouchableOpacity>
              );
            },
          }}
        />
        {isError && <Error title={failure!.message} />}
        {isLoading && <Loading />}
        {isLoaded && (
          <Fragment>
            <View className="bg-gray-300 w-24 rounded-full aspect-square mt-4 mx-auto flex items-center justify-center">
              <Text className="text-4xl font-semibold">
                {contact?.fullName?.charAt(0)}
              </Text>
            </View>
            <View className="px-6 pt-8 flex flex-col gap-6">
              <View>
                <Text className="font-semibold text-base">Full Name</Text>
                <Text className="text-lg">{contact?.fullName}</Text>
              </View>
              <View>
                <Text className="font-semibold text-base">Phone Numbers</Text>
                <View className="flex flex-col gap-y-2">
                  {contact?.phoneNumbers?.map(({ id, label, number }) => (
                    <View
                      key={id}
                      className="flex flex-row flex-1 items-center justify-start gap-3"
                    >
                      <View className="border rounded-lg w-8 h-8 flex items-center justify-center">
                        <Ionicons name="call-outline" size={24} />
                      </View>
                      <View>
                        <Text className="uppercase text-sm font-semibold text-gray-500">
                          {label}
                        </Text>
                        <Text className="text-lg">{number}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
              <View className="border-b px-6 border-gray-300" />
              <View>
                <Text className="font-semibold text-base">Company</Text>
                <Text className="text-lg">{contact?.company || "-"}</Text>
              </View>
              <View>
                <Text className="font-semibold text-base">Job Title</Text>
                <Text className="text-lg">{contact?.jobTitle || "-"}</Text>
              </View>
            </View>
          </Fragment>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
