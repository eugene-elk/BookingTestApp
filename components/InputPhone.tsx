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

interface InputPhoneProps {
  //checkCorrect: (input: string) => boolean,
}

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(Text);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const InputPhone: React.FC<InputPhoneProps> = ({  }) => {

    const [currentInput, setCurrentInput] = useState<string>("")
    const [focused, setFocused] = useState<boolean>(false);
    const [optionsOpen, setOptionsOpen] = useState<boolean>(false);

    const activeInput = useSharedValue(0);

    useEffect(() => {
        if (focused || optionsOpen) {
            activeInput.value = withTiming(1, { duration: 100 });
        }
        else {
            activeInput.value = withTiming(0, { duration: 100 });
        }
    }, [focused])

    const animatedTextInput = useAnimatedStyle(() => {
        const widthAnimated = interpolate(
            activeInput.value,
            [0, 1],
            [width - (16 * 2), width - (16 * 2) - 64]
        )
        const borderRadiusLeftAnimated = interpolate(
            activeInput.value,
            [0, 1],
            [12, 0]
        )

        return {
            width: widthAnimated,
            borderTopLeftRadius: borderRadiusLeftAnimated,
            borderBottomLeftRadius: borderRadiusLeftAnimated,
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.codeInputContainer}>

            </View>
            <AnimatedTextInput
                style={[styles.textInput, animatedTextInput]}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            >

            </AnimatedTextInput>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 56,
        backgroundColor: 'grey',
        flexDirection: 'row'
    },
    codeInputContainer: {
        flex: 1,
    },
    textInput: {
        backgroundColor: 'white',
        height: 56,
        borderBottomRightRadius: 12,
        borderTopRightRadius: 12,
    }
})

export default InputPhone;