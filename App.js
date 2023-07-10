import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FormScreen from "./screens/FormScreen";
import {NavigationContainer} from "@react-navigation/native";
import AppStack from "./navigation/AppStack";

export default function App() {
    return (
        <NavigationContainer>
            <AppStack/>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});