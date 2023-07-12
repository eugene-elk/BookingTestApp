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
import CodeInput from "./CodeInput";

const { height, width } = Dimensions.get('window');

interface InputPhoneProps {
    warningMessage: string,
    checkCorrect: (input: string, setState: React.Dispatch<React.SetStateAction<string>>) => boolean,
}

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(Text);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const InputPhone: React.FC<InputPhoneProps> = ({ checkCorrect, warningMessage }) => {

    const [currentInput, setCurrentInput] = useState<string>("")
    const [focused, setFocused] = useState<boolean>(false);
    const activeInput = useSharedValue(0);

    const [isCorrect, setIsCorrect] = useState<boolean>(true);
    const warningAnimated = useSharedValue(1);

    const [optionsOpen, setOptionsOpen] = useState<boolean>(false);

    useEffect(() => {
        console.log("isCorrect:", isCorrect);

        if (focused || optionsOpen || currentInput !== "") {
            activeInput.value = withTiming(1, { duration: 100 });
        }
        else {
            activeInput.value = withTiming(0, { duration: 100 });
        }

        if ((currentInput === "") && (focused)) {
            warningAnimated.value = withTiming(0, { duration: 100 });
        }
        else {
            warningAnimated.value = withTiming(Number(isCorrect), { duration: 100 });
        }
    }, [focused, isCorrect]);

    const onChangeText = (input: string) => {
        setIsCorrect(checkCorrect(input, setCurrentInput));
    }

    const onFocus = () => {
        setIsCorrect(checkCorrect(currentInput, setCurrentInput));
        setFocused(true);
    }

    const animatedTextInput = useAnimatedStyle(() => {
        const widthAnimated = interpolate(
            activeInput.value,
            [0, 1],
            [width - (16 * 2), width - (16 * 2) - 64 - 4]
        )
        const borderRadiusLeftAnimated = interpolate(
            activeInput.value,
            [0, 1],
            [12, 0]
        )
        const animatedColor = interpolateColor(
            activeInput.value,
            [0, 1],
            ["#FFFFFF", isCorrect ? "#413DFF" : "#FF450B"]
        );
        //console.log(widthAnimated);

        return {
            width: widthAnimated,
            borderTopLeftRadius: borderRadiusLeftAnimated,
            borderBottomLeftRadius: borderRadiusLeftAnimated,
            borderColor: animatedColor,
        }
    })

    const animatedCodeContainer = useAnimatedStyle(() => {
        const marginRightAnimated = interpolate(
            activeInput.value,
            [0, 1],
            [0, 4]
        )

        return {
            marginRight: marginRightAnimated,
        }
    })

    const animatedPlaceholder = useAnimatedStyle(() => {
        const opacityAnimated = interpolate(
            activeInput.value,
            [0, 1],
            [1, 0]
        )

        return {
            opacity: opacityAnimated,
        }
    });

    const animatedWarning = useAnimatedStyle(() => {
        const animatedMarginTop = interpolate(
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
        const animatedMarginLeft = interpolate(
            activeInput.value,
            [0, 1],
            [16, 16 + 64]
        )

        return {
            marginLeft: animatedMarginLeft,
            marginTop: animatedMarginTop,
            height: animatedHeight,
            opacity: animatedOpacity,
        }
    })

    return (
        <View>
            <View style={styles.container}>
                <AnimatedView style={[styles.codeInputContainer, animatedCodeContainer]}>
                    <CodeInput />
                </AnimatedView>
                <AnimatedTextInput
                    onChangeText={onChangeText}
                    value={currentInput}
                    style={[styles.textInput, animatedTextInput]}
                    onFocus={onFocus}
                    onBlur={() => setFocused(false)}
                    disableFullscreenUI={true}
                    keyboardType={"phone-pad"}
                />
                <AnimatedText style={[styles.name, animatedPlaceholder]}>
                    {"Номер телефона"}
                </AnimatedText>
            </View>
            <AnimatedView style={[styles.containerText, animatedWarning]}>
                <Text style={styles.textWarning}>
                    {warningMessage}
                </Text>
            </AnimatedView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: 'row',
    },
    codeInputContainer: {
        flex: 1,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    textInput: {
        backgroundColor: 'white',
        height: 56,
        borderBottomRightRadius: 12,
        borderTopRightRadius: 12,
        paddingLeft: 16,
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

    },
    textWarning: {
        letterSpacing: -0.08,
        color: "#FF450B",
        lineHeight: 18,
        fontSize: 13,
    }
})

export default InputPhone;