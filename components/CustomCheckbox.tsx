import React, { useEffect, useState } from 'react';
import {Dimensions, StyleSheet, View, Text, Pressable} from "react-native";
import CheckSVG from "../assets/svg/Check";

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
                    <View style={styles.unpressed}>

                    </View>
                }
            </Pressable>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width - 16 * 2,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: '#413DFF',
        borderRadius: 8,
    },
    unpressed: {
        width: 24,
        height: 24,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#60626D',
    },
    text: {
        backgroundColor: 'pink',
    }
});

export default CustomCheckbox;