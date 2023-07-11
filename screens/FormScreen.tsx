import React, { useEffect, useState } from 'react';
import {Button, Dimensions, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import CustomButton from "../components/CustomButton";
import CustomCheckbox from "../components/CustomCheckbox";
import Header from "../components/Header";
import {SafeAreaView} from 'react-native-safe-area-context';
import Input from "../components/Input";

const { height, width } = Dimensions.get('window');
export default function FormScreen({navigation}) {

    const [buttonActive, setButtonActive] = useState<boolean>(false);

    const buttonPressed = () => {
        navigation.navigate("ResultScreen");
    }

    const checkboxPressed = () => {
        setButtonActive(true);
    }

    const checkCorrectName = (input: string): boolean => {
        if (input.length > 3) {
            return true;
        }
        return false;
    }

    const checkCorrectEmail = (input: string): boolean => {
        if (input.length > 3) {
            return true;
        }
        return false;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                active={false}
            />
            <ScrollView
                scrollEnabled={true}
                contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.textBold}>
                        {"Забронировать слот"}
                    </Text>
                    <Text style={styles.textUsual}>
                        {"Оставьте контактные данные, и мы с вами свяжемся в ближайший час."}
                    </Text>
                </View>
                <View style={styles.inputsContainer}>
                    <View style={styles.inputWrapper}>
                        <Input
                            name={"Имя"}
                            warningMessage={"Введите корректное имя"}
                            checkCorrect={checkCorrectName}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Input
                            name={"E-mail"}
                            warningMessage={"Введите корректный e-mail"}
                            checkCorrect={checkCorrectEmail}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.containerBottom}>
                <CustomButton name={"Отправить"} onPress={buttonPressed} active={buttonActive}/>
                <CustomCheckbox text={"Я даю согласие на обработку своих данных."} onChange={checkboxPressed}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    textContainer: {
        marginTop: 8,
        width: width - 24 * 2,
        justifyContent: "center",
        alignItems: "center",
    },
    inputsContainer: {
        marginTop: 32,
    },
    inputWrapper: {
        //marginBottom: 16,
    },
    textBold: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 24,
        color: "#1E1E20",
        lineHeight: 34,
        marginBottom: 8,
    },
    textUsual: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "300",
        color: "#60626D",
        lineHeight: 22,
    },
    containerBottom: {
        position: 'absolute',
        bottom: 42,
    }
});
