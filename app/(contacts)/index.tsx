import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { useGetContacts } from "@/modules/contacts";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { ReactNode, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ContactsScreen(): ReactNode {
  const {
    contacts,
    failure,
    favorite,
    list,
    getContacts,
    ui: { isError, isLoaded, isLoading },
  } = useGetContacts();

  const { push } = useRouter();

  useEffect(() => {
    getContacts();
  }, []);

  const doPressContactItem = useCallback((id: string) => {
    push(`/contacts/${id}`);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView className="min-h-full">
        <Stack.Screen
          options={{
            headerTitle: "Contacts",
          }}
        />

        {isLoading && <Loading />}
        {isError && <Error title={failure!.message} />}
        {isLoaded &&
          [...favorite, ...list].map((it) => {
            const { fullName, id, phoneNumbers } = contacts[it];

            return (
              <View key={id} className="mx-6 border-b py-6 border-divider">
                <TouchableOpacity
                  className="flex flex-row items-center gap-4 justify-start"
                  onPress={() => doPressContactItem(id)}
                >
                  <View className="bg-gray-300 aspect-square w-10 rounded-lg flex items-center justify-center">
                    <Text className="font-medium text-lg">
                      {fullName.charAt(0)}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-base">{fullName}</Text>
                    <Text className="text-sm text-gray-600">
                      {phoneNumbers[0].number}
                    </Text>
                  </View>
                  <Ionicons
                    color="#9CA3AF"
                    name="chevron-forward-outline"
                    size={22}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}
