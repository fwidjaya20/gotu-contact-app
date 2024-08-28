import Error from "@/components/Error";
import { IconedInformation } from "@/components/IconedInformation";
import { Information } from "@/components/Information";
import Loading from "@/components/Loading";
import {
  Address,
  useContactFavorite,
  useGetContactDetail,
} from "@/modules/contacts";
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

  const { favorite, toggle } = useContactFavorite();
  const {
    contact,
    failure,
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
                  {favorite === id ? (
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
                <Information title="Full Name" value={contact?.fullName} />
              </View>
              <View>
                <Text className="font-semibold text-base">Phone Numbers</Text>
                {contact?.phoneNumbers.length ? (
                  <View className="flex flex-col gap-y-2">
                    {contact?.phoneNumbers?.map(({ id, label, number }) => (
                      <View key={id}>
                        <IconedInformation
                          icon={<Ionicons name="call-outline" size={20} />}
                          title={label}
                          value={number}
                        />
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text className="text-lg">-</Text>
                )}
              </View>
              <View>
                <Text className="font-semibold text-base">Emails</Text>
                {contact?.emails.length ? (
                  <View className="flex flex-col gap-y-2">
                    {contact?.emails?.map(({ id, label, email }) => (
                      <View key={id}>
                        <IconedInformation
                          icon={<Ionicons name="mail-outline" size={20} />}
                          title={label}
                          value={email}
                        />
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text className="text-lg">-</Text>
                )}
              </View>
              <View>
                <Text className="font-semibold text-base">Addresses</Text>
                {contact?.addresses.length ? (
                  <View className="flex flex-col gap-y-2">
                    {contact?.addresses?.map((it) => (
                      <View key={it.id}>
                        <IconedInformation
                          icon={<Ionicons name="home-outline" size={20} />}
                          title={it.label}
                          value={Address.toStdAddress(it)}
                        />
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text className="text-lg">-</Text>
                )}
              </View>
              <View className="border-b px-6 border-gray-300" />
              <View>
                <Information title="Company" value={contact?.company} />
              </View>
              <View>
                <Information title="Job Title" value={contact?.jobTitle} />
              </View>
            </View>
          </Fragment>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
