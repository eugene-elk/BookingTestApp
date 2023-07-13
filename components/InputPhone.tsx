import React, {useCallback, useEffect, useState} from "react";
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
import {AnimatedMaskedTextInput, AnimatedText, AnimatedView} from "./AnimatedComponents";

const { height, width } = Dimensions.get('window');

interface InputPhoneProps {
    warningMessage: string,
    checkCorrect: (input: string, setState: React.Dispatch<React.SetStateAction<string>>) => boolean,
}

const InputPhone: React.FC<InputPhoneProps> = ({ checkCorrect, warningMessage }) => {

    const mask = "(***) - *** - ** - **"
    const minWidth = width - (16 * 2) - 64 - 4;
    const maxWidth = width - (16 * 2);

    const [currentInput, setCurrentInput] = useState<string>("");
    const [currentMaskedInput, setCurrentMaskedInput] = useState<string>("");

    const [inputPxLen, setInputPxLen] = useState<number>(0);
    const [maskEnd, setMaskEnd] = useState<string>(mask);

    const [focused, setFocused] = useState<boolean>(false);
    const activeInput = useSharedValue(0);

    const [isCorrect, setIsCorrect] = useState<boolean>(true);
    const warningAnimated = useSharedValue(1);
    const [optionsOpen, setOptionsOpen] = useState<boolean>(false);

    const [firstRender, setFirstRender] = useState<boolean>(true);

    useEffect(() => {
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
            [maxWidth, minWidth]
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
            <Text
                style={styles.hiddenText}
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    console.log(width);
                    setInputPxLen(width);
                    setMaskEnd(mask.slice(currentMaskedInput.length));
                }}
            >
                {currentMaskedInput}
            </Text>
            <View style={styles.container}>
                <AnimatedView style={[styles.codeInputContainer, animatedCodeContainer]}>
                    <CodeInput />
                </AnimatedView>
                <AnimatedMaskedTextInput
                    mask="(999) - 999 - 99 - 99 - 99 - 9"
                    onChangeText={(text, rawText) => {
                        if (firstRender) setFirstRender(false);
                        else {
                            onChangeText(rawText);
                            setCurrentMaskedInput(text);
                        }
                    }}
                    disableFullscreenUI={true}
                    onFocus={onFocus}
                    onBlur={() => setFocused(false)}
                    style={[styles.textInput, animatedTextInput]}
                    keyboardType={"phone-pad"}
                />
                <Text style={[styles.placeholderEnd, {left: inputPxLen + 64 + 4 + 16}]}>
                    {focused ? maskEnd : ""}
                </Text>
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
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
        fontSize: 15,
        lineHeight: 20
    },
    placeholderEnd: {
        fontSize: 15,
        lineHeight: 20,
        color: 'grey',
        position: 'absolute',
        top: 16,
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
    },
    hiddenText: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        color: 'transparent',
        fontSize: 15,
    }
})

export default InputPhone;