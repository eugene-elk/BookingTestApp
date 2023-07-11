import React, {useEffect, useState} from "react";
import {Dimensions, StyleSheet, TextInput, View, Text} from "react-native";
import Animated, {
    interpolate,
    interpolateColor,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";

const { height, width } = Dimensions.get('window');

interface InputProps {
    name: string,
    warningMessage: string,
    checkCorrect: (input: string) => boolean,
}

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(Text);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const Input: React.FC<InputProps> = ({name, warningMessage, checkCorrect }) => {

    const [currentInput, setCurrentInput] = useState<string>("");

    const [focused, setFocused] = useState<boolean>(false);
    const movePlaceholder = useSharedValue(0);
    const activeInput = useSharedValue(0);

    const [isCorrect, setIsCorrect] = useState<boolean>(true);
    const warningAnimated = useSharedValue(1);

    useEffect(()=>{
        if ((currentInput === "") && (!focused)) {
            movePlaceholder.value = withTiming(0, { duration: 100 });
        }
        else {
            movePlaceholder.value = withTiming(1, { duration: 100 });
        }
        warningAnimated.value = withTiming(Number(isCorrect), { duration: 100 });

        if ((currentInput !== "") && (!isCorrect)) {
            activeInput.value = withTiming(1, { duration: 100 });
        }
        else {
            activeInput.value = withTiming(Number(focused), { duration: 100 });
        }

    },[focused, currentInput, isCorrect]);

    const onChangeText = (input: string) => {
        setIsCorrect(checkCorrect(input));
        setCurrentInput(input);
    }

    const animatedPlaceholder = useAnimatedStyle(() => {
        const animatedTop = interpolate(
            movePlaceholder.value,
            [0, 1],
            [16, 8]
        );
        const animateColor = interpolateColor(
            movePlaceholder.value,
            [0, 1],
            ["#1E1E20", "#60626D"]
        )
        const animateSize = interpolate(
            movePlaceholder.value,
            [0, 1],
            [15, 12]
        )
        const animateLineHeight = interpolate(
            movePlaceholder.value,
            [0, 1],
            [20, 16]
        )

        return {
            top: animatedTop,
            color: animateColor,
            fontSize: animateSize,
            lineHeight: animateLineHeight,
        };
    });

    const animatedBorder = useAnimatedStyle(()=>{
        const animatedColor = interpolateColor(
            activeInput.value,
            [0, 1],
            ["#FFFFFF", isCorrect ? "#413DFF" : "#FF450B"]
        );

        return {
            borderColor: animatedColor,
        }
    })

    const animatedWarning = useAnimatedStyle(() => {
        const animatedMargin = interpolate(
            warningAnimated.value,
            [1, 0],
            [0, 8]
        )
        const animatedHeight = interpolate(
            warningAnimated.value,
            [1, 0],
            [16, 18 + 16]
        )
        const animatedOpacity = interpolate(
            warningAnimated.value,
            [1, 0],
            [0, 1]
        )

        return {
            marginTop: animatedMargin,
            height: animatedHeight,
            opacity: animatedOpacity,
        }
    })

    return (
        <View style={styles.container}>
            <AnimatedTextInput
                onChangeText={onChangeText}
                value={currentInput}
                style={[styles.textInput, animatedBorder]}
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
                disableFullscreenUI={true}
                keyboardType={name === "E-mail" ? 'email-address' : 'default'}
            />
            <AnimatedText style={[styles.name, animatedPlaceholder]}>
                {name}
            </AnimatedText>
            <AnimatedView style={[styles.containerText, animatedWarning]}>
                <Text style={styles.textWarning}>
                    {warningMessage}
                </Text>
            </AnimatedView>
        </View>
    )
};

const styles= StyleSheet.create({
    container: {

    },
    textInput: {
        paddingLeft: 16,
        width: width - 16 * 2,
        height: 56,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingTop: 14,
        borderWidth: 1,
    },
    name: {
        position: 'absolute',
        top: 16,
        left: 16,
        lineHeight: 20,
        fontSize: 15,
    },
    containerText: {
        paddingLeft: 16,
    },
    textWarning: {
        letterSpacing: -0.08,
        color: "#FF450B",
    }
});

export default Input;