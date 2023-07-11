import { createStackNavigator } from '@react-navigation/stack';
import FormScreen from "../screens/FormScreen";
import ResultScreen from "../screens/ResultScreen";

const Stack = createStackNavigator();

function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="FormScreen"
                component={FormScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ResultScreen"
                component={ResultScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

export default AppStack;