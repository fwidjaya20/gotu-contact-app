import { ContactEntity, useContactsModule } from "@/modules/contacts";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { ReactNode, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ContactsScreen(): ReactNode {
  const [contacts, setContacts] = useState<ContactEntity[]>([]);

  const { GetContacts } = useContactsModule();

  useEffect(() => {
    GetContacts({}).then((result) => {
      setContacts(result.contacts);
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView className="min-h-full">
        <Stack.Screen
          options={{
            headerTitle: "Contacts",
          }}
        />

        {contacts.map(({ fullName, id, phoneNumbers }) => {
          return (
            <View key={id} className="mx-6 border-b py-6 border-divider">
              <TouchableOpacity className="flex flex-row items-center gap-4 justify-start">
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
