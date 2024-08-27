import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ComponentType } from "react";

type NavigationMockProps = {
  controller: ComponentType<any>;
  params?: any;
};
export const NavigationMock = ({ controller, params }: NavigationMockProps) => {
  const stack = createNativeStackNavigator<any>();

  return (
    <NavigationContainer independent>
      <stack.Navigator initialRouteName="TestRoute">
        <stack.Screen
          name="TestRoute"
          component={controller}
          initialParams={params}
          options={{ header: () => null }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};
