import React, { useEffect } from 'react';
import {Button, Dimensions, Pressable, StyleSheet, View, Text, TouchableOpacity, TextInput} from "react-native";
import Animated, {
    interpolate,
    interpolateColor,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";

const { height, width } = Dimensions.get('window');

interface ButtonProps {
    name: string,
    active?: boolean,
    onPress: () => void,
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const CustomButton: React.FC<ButtonProps> = ({ name, active=true, onPress }) => {

    const activeButton = useSharedValue(0);

    useEffect(() => {
        activeButton.value = withTiming(Number(active), { duration: 100 });
    }, [active]);

    const animatedTextInput = useAnimatedStyle(() => {
        const colorAnimated = interpolateColor(
            activeButton.value,
            [0, 1],
            ["#A09EFF", "#413DFF"]
        )

        return {
            backgroundColor: colorAnimated,
        }
    });

    return (
        <View style={styles.container}>
            <AnimatedTouchableOpacity
                style={[animatedTextInput, styles.button]}
                onPress={active ? onPress : () => null}
            >
                <Text style={styles.text}>{name}</Text>
            </AnimatedTouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: width - 16 * 2,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#413DFF',
        borderRadius: 12,
        tintColor: 'green',
    },
    text: {
        color: '#FCFCFC',
    }
});

export default CustomButton;