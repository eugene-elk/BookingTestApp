import React, { useState } from 'react';
import {Dimensions, StyleSheet, View, Text, Pressable} from "react-native";
import CheckSVG from "../assets/svg/Check";
import colors from '../assets/colors/colors';

const { height, width } = Dimensions.get('window');

interface CustomCheckboxProps {
    text: string,
    onChange: (value: boolean) => void,
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ text, onChange }) => {

    const [pressed, setPressed] = useState<boolean>(false);

    const onPress = () => {
        setPressed((value) => {
            onChange(!value);
            return !value;
        });
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={onPress} style={styles.pressable}>
                {pressed ?
                    <View style={styles.pressed}>
                        <CheckSVG/>
                    </View>
                    :
                    <View style={styles.unpressed}/>
                }
            </Pressable>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Math.min(width, height) - 16 * 2,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 8,
    },
    pressable: {
        width: 40,
        height: 40,
        marginRight: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressed: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.success,
        borderRadius: 8,
    },
    unpressed: {
        width: 24,
        height: 24,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.textSecond,
    },
    text: {
        fontSize: 13,
        fontFamily: 'Raleway-Regular',
        letterSpacing: -0.08,
        color: colors.textSecond
    }
});

export default CustomCheckbox;