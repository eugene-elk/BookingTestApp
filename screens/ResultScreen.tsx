import React, { useEffect, useState } from 'react';
import {Dimensions, StyleSheet, View, Text} from "react-native";
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import BackgroundComponent from "../components/BackgroundComponent";
import colors from '../assets/colors/colors';

const { height, width } = Dimensions.get('window');

export default function ResultScreen({navigation}) {

    const onPress = () => {
        //console.log("onPress");
    }

    const onPressHeader = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
            <BackgroundComponent>
                <View style={styles.container}>
                    <Header
                        active={true}
                        onPress={onPressHeader}
                    />
                    <View style={styles.content}>
                        <LottieView
                            autoPlay
                            loop={true}
                            style={styles.lottie}
                            source={require('../assets/lottie/successfully-done.json')}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.textBold}>
                                {"Готово!"}
                            </Text>
                            <Text style={styles.textUsual}>
                                {"Заявка отправлена. Мы с вами свяжемся в ближайший час."}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <CustomButton name={"Ок"} onPress={onPress}/>
                    </View>
                </View>
            </BackgroundComponent>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'transparent'
    },
    content: {
        height: 240 + 32,
        alignItems: "center",
        backgroundColor: 'transparent'
    },
    lottie: {
        width: 240,
        height: 240,
        color: "#22E17B"
    },
    textContainer: {
        marginTop: -(76 - 32),
        height: 76,
        width: Math.min(width, height) - 24 * 2,
        justifyContent: "center",
        alignItems: "center",
    },
    textBold: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 24,
        color: colors.textMain,
        lineHeight: 34,
        fontFamily: "Raleway-SemiBold"
    },
    textUsual: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "300",
        color: colors.textSecond,
        lineHeight: 22,
        fontFamily: "Raleway-Regular"
    },
    buttonContainer: {
        marginBottom: 32,
    }
});