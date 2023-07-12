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
        if (focused || optionsOpen || currentInput !== "") {
            activeInput.value = withTiming(1, { duration: 100 });
        }
        else {
            activeInput.value = withTiming(0, { duration: 100 });
        }
    }, [focused]);

    const onChangeText = (input: string) => {
        setCurrentInput(input);
    }

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

    return (
        <View style={styles.container}>
            <AnimatedView style={[styles.codeInputContainer, animatedCodeContainer]}>
            </AnimatedView>
            <AnimatedTextInput
                onChangeText={onChangeText}
                value={currentInput}
                style={[styles.textInput, animatedTextInput]}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                disableFullscreenUI={true}
                keyboardType={"phone-pad"}
            />
            <AnimatedText style={[styles.name, animatedPlaceholder]}>
                {"Номер телефона"}
            </AnimatedText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: 'row',
        marginBottom: 8,
    },
    codeInputContainer: {
        flex: 1,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        backgroundColor: 'white',
    },
    textInput: {
        backgroundColor: 'white',
        height: 56,
        borderBottomRightRadius: 12,
        borderTopRightRadius: 12,
        paddingLeft: 16,
    },
    name: {
        position: 'absolute',
        top: 16,
        left: 16,
        lineHeight: 20,
        fontSize: 15,
    }
})

export default InputPhone;