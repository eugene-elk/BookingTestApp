import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import AppStack from "./navigation/AppStack";
import {enableScreens} from 'react-native-screens';
import 'react-native-gesture-handler';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {useState} from "react";

enableScreens();

async function loadFonts() {
    await Font.loadAsync({
        'Raleway-Medium': require('./assets/fonts/Raleway-Medium.ttf'),
        'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
        'Raleway-SemiBold': require('./assets/fonts/Raleway-SemiBold.ttf'),
        'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
    });
}

export default function App() {

    const [isFontLoaded, setFontLoaded] = useState(false);

    if (!isFontLoaded) {
        return (
            <AppLoading
                startAsync={loadFonts}
                onFinish={() => setFontLoaded(true)}
                onError={console.warn}
            />
        );
    }

    return (
        <NavigationContainer>
            <AppStack/>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}
