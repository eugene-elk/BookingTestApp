import React, { useEffect, useState } from 'react';
import {Button, Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import CustomButton from "../components/CustomButton";
import CustomCheckbox from "../components/CustomCheckbox";
import Header from "../components/Header";
import {SafeAreaView} from 'react-native-safe-area-context';
import Input from "../components/Input";
import InputPhone from "../components/InputPhone";
import {useDeepEffect} from "../hooks/useDeepEffect";
import CodeInput from "../components/CodeInput";

const { height, width } = Dimensions.get('window');
export default function FormScreen({navigation}) {

    const [buttonActive, setButtonActive] = useState<boolean>(false);

    const [ready, setReady] = useState({
        name: false,
        email: false,
        phone: false,
        checkbox: false,
    });

    useDeepEffect(() => {
        console.log(ready);
        let result: boolean = true;
        for (let key in ready) {
            result = result && ready[key];
        }
        console.log(result);
        setButtonActive(result);
    }, [ready])

    const buttonPressed = () => {
        navigation.navigate("ResultScreen");
    }

    const checkCorrectName = (input: string, setState: React.Dispatch<React.SetStateAction<string>>): boolean => {

        if (input.length > 10) {
            input = input.slice(0, 10);
        }

        const regexFull = /^[\u0400-\u04FF]([\u0400-\u04FF ]*[\u0400-\u04FF])?$/;
        const regexSymbols = /^[\u0400-\u04FF ]*$/i;
        const testRegexFull = regexFull.test(input);
        const testRegexSymbols = regexSymbols.test(input);

        if (testRegexSymbols) {
            setState(input);
        }

        setReady({
            ...ready,
            name: testRegexFull,
        });

        return testRegexFull;
    }

    const checkCorrectEmail = (input: string, setState: React.Dispatch<React.SetStateAction<string>>): boolean => {

        if (input.length > 30) {
            input = input.slice(0, 30);
        }

        const regexFull = /^[A-Za-z0-9._-]{1,30}@[A-Za-z0-9.-]+\.[A-Za-z]{1,}$/;
        const regexSymbols = /^[A-Za-z0-9._ @-]*$/;
        const testRegexFull = regexFull.test(input);
        const testRegexSymbols = regexSymbols.test(input);

        if (testRegexSymbols) {
            setState(input);
        }

        setReady({
            ...ready,
            email: testRegexFull,
        });

        return testRegexFull;
    }

    const checkCorrectPhone = (input: string, setState: React.Dispatch<React.SetStateAction<string>>): boolean => {

        if (input.length > 13) {
            input = input.slice(0, 13);
        }

        const regexFull = /^[0-9]{7,13}$/;
        const regexSymbols = /^[0-9]*$/;
        const testRegexFull = regexFull.test(input);
        const testRegexSymbols = regexSymbols.test(input);

        if (testRegexSymbols) {
            setState(input);
        }

        setReady({
            ...ready,
            phone: testRegexFull,
        });

        return testRegexFull;
    }

    const checkboxPressed = (value: boolean) => {
        console.log("checkbox pressed");
        setReady({
            ...ready,
            checkbox: value,
        });
    }

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
            <View style={styles.container}>
                <ScrollView
                    scrollEnabled={true}
                    contentContainerStyle={styles.contentContainer}
                >
                    <Header
                        active={false}
                    />
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
                        <View style={styles.inputWrapper}>
                            <InputPhone
                                warningMessage={"Введите корректный номер телефона"}
                                checkCorrect={checkCorrectPhone}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.containerBottom}>
                    <CustomButton
                        name={"Отправить"}
                        onPress={buttonPressed}
                        active={buttonActive}
                    />
                    <CustomCheckbox
                        text={"Я даю согласие на обработку своих данных."}
                        onChange={checkboxPressed}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    textContainer: {
        marginTop: 8,
        width: width - 24 * 2,
        justifyContent: "center",
        alignItems: "center",
    },
    inputsContainer: {
        flex: 1,
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
        width: width,
        height: 120,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
    }
});