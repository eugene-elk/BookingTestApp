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

interface InputProps {
    name: string,
}

const { height, width } = Dimensions.get('window');

const AnimatedText = Animated.createAnimatedComponent(Text);
const Input: React.FC<InputProps> = ({ name }) => {

    const [focused, setFocused] = useState<boolean>(false);
    const movePlaceholder = useSharedValue(0);

    useEffect(()=>{
        movePlaceholder.value = withTiming(Number(focused), { duration: 200 });
    },[focused]);

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

    return (
        <View>
            <TextInput
                style={styles.container}
                onBlur={()=>setFocused(false)}
                onFocus={()=>setFocused(true)}
            />
            <AnimatedText style={[styles.name, animatedPlaceholder]}>
                {name}
            </AnimatedText>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 16,
        width: width - 16 * 2,
        height: 56,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingTop: 14,
    },
    name: {
        position: 'absolute',
        top: 16,
        left: 16,
        lineHeight: 20,
        fontSize: 15,
    }
});

export default Input;