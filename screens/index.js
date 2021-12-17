import OnboardingScreen from "./Onboarding";
import HomeScreen from "./HomeScreen";

const Stack = createStackNavigator();

function AppStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        option={{
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

export default AppStack;
