// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { fireEvent, screen, waitFor } from "@testing-library/react-native";
// import { useRouter } from "expo-router";
// import React, { FunctionComponent } from "react";
// import { Provider } from "react-redux";
// import {
//   GetContactsResponse,
//   SetContacts,
//   SetContactsFailure,
//   SetContactsLoaded,
//   SetContactsLoading,
// } from "@/modules/contacts";
// import { UnknownFailure } from "@/shared/DataType";
// import { RootStore } from "@/Store";
// import ContactsScreen from "../index";
// import { render, renderRouter } from "expo-router/testing-library";

// const Stack = createNativeStackNavigator();

// const mockFnGetContactsUseCase = jest.fn();
// const mockFnRouterPush = jest.fn();

// jest.mock("@/modules/contacts", () => {
//   const original = jest.requireActual("@/modules/contacts");

//   return {
//     ...original,
//     useContactsModule: () => {
//       const originalModule = original.useContactsModule();
//       return {
//         ...originalModule,
//         GetContacts: mockFnGetContactsUseCase,
//       };
//     },
//   };
// });

// jest.mock("expo-router", () => {
//   const original =
//     jest.requireActual<typeof import("expo-router")>("expo-router");

//   return {
//     ...original,
//     useRouter: () => ({
//       push: mockFnRouterPush,
//     }),
//   };
// });

// describe("<ContactScreen />", () => {
//   let store: typeof RootStore;
//   let Screen: FunctionComponent;

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   beforeEach(() => {
//     store = RootStore;

//     Screen = () => (
//       <Provider store={store}>
//         <NavigationContainer>
//           <Stack.Navigator>
//             <Stack.Screen name="Contacts" component={ContactsScreen} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </Provider>
//     );
//   });

//   it("should show loading indicator", async () => {
//     mockFnGetContactsUseCase.mockResolvedValue({
//       contacts: [],
//       hasNextPages: false,
//       hasPreviousPages: false,
//     } as GetContactsResponse);

//     const MockComponent = jest.fn(() => (
//       <Provider store={store}>
//         <ContactsScreen />
//       </Provider>
//     ));

//     renderRouter(
//       {
//         "(contacts)/": MockComponent,
//       },
//       {
//         initialUrl: "/",
//       }
//     );

//     expect(screen).toHavePathname("/");

//     await waitFor(() => {
//       store.dispatch(SetContactsLoading(true));
//     });

//     expect(screen.getByTestId(/activity-indicator/)).toBeTruthy();
//   });

//   it("should show error indicator", async () => {
//     const failure = new UnknownFailure({
//       message: "this is error message",
//       name: "error",
//     });

//     mockFnGetContactsUseCase.mockImplementation(() => {
//       console.log("MOCKED");
//       return Promise.reject(failure);
//     });

//     const MockComponent = jest.fn(() => (
//       <Provider store={store}>
//         <ContactsScreen />
//       </Provider>
//     ));

//     renderRouter(
//       {
//         "(contacts)/": MockComponent,
//       },
//       {
//         initialUrl: "/",
//       }
//     );

//     expect(screen).toHavePathname("/");

//     await waitFor(() => {
//       store.dispatch(SetContactsFailure(failure));
//     });

//     expect(screen.getByText(/this is error message/)).toBeTruthy();
//   });

//   it("should show the contacts list", async () => {
//     const { rerender } = render(<Screen />);

//     await waitFor(() => {
//       store.dispatch(
//         SetContacts({
//           contacts: [
//             {
//               addresses: [],
//               company: "",
//               emails: [],
//               fullName: "John Doe",
//               id: "1",
//               isFavorite: false,
//               jobTitle: "Software Engineer",
//               phoneNumbers: [
//                 {
//                   id: "1",
//                   label: "home",
//                   number: "1234567890",
//                 },
//               ],
//             },
//           ],
//           hasNextPages: false,
//           hasPreviousPages: false,
//         })
//       );
//       store.dispatch(SetContactsLoaded(true));
//     });

//     rerender(<Screen />);

//     expect(mockFnGetContactsUseCase).toHaveBeenCalled();
//     expect(screen.getByText(/John Doe/)).toBeTruthy();
//     expect(screen.getByText(/1234567890/)).toBeTruthy();
//   });

//   it("should redirect to contact detail when contact item has been clicked", async () => {
//     const { push } = useRouter();
//     const { rerender } = render(<Screen />);

//     await waitFor(() => {
//       store.dispatch(
//         SetContacts({
//           contacts: [
//             {
//               addresses: [],
//               company: "",
//               emails: [],
//               fullName: "John Doe",
//               id: "1",
//               isFavorite: false,
//               jobTitle: "Software Engineer",
//               phoneNumbers: [
//                 {
//                   id: "1",
//                   label: "home",
//                   number: "1234567890",
//                 },
//               ],
//             },
//           ],
//           hasNextPages: false,
//           hasPreviousPages: false,
//         })
//       );
//       store.dispatch(SetContactsLoaded(true));
//     });

//     rerender(<Screen />);

//     expect(mockFnGetContactsUseCase).toHaveBeenCalled();

//     const listItem = screen.getByTestId("contact-item");

//     fireEvent.press(listItem);

//     await waitFor(() => {
//       expect(push).toHaveBeenCalledWith(`/contacts/1`);
//     });
//   });
// });
