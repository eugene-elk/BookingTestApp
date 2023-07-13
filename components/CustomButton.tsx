import React, { useEffect } from 'react';
import {Dimensions, StyleSheet, View, Text} from "react-native";
import {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import {AnimatedTouchableOpacity} from "./AnimatedComponents";
import colors from '../assets/colors/colors';

const { height, width } = Dimensions.get('window');

interface ButtonProps {
    name: string,
    active?: boolean,
    onPress: () => void,
}

const CustomButton: React.FC<ButtonProps> = ({ name, active=true, onPress }) => {

    const activeButton = useSharedValue(0);

    useEffect(() => {
        activeButton.value = withTiming(Number(active), { duration: 100 });
    }, [active]);

    const animatedTextInput = useAnimatedStyle(() => {
        const colorAnimated = interpolateColor(
            activeButton.value,
            [0, 1],
            [colors.inactive, colors.success]
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
        borderRadius: 12,
        tintColor: 'green',
    },
    text: {
        fontSize: 15,
        fontFamily: 'Raleway-Medium',
        color: '#FCFCFC',
    }
});

export default CustomButton;