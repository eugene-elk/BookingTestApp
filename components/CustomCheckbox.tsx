import React, { useEffect, useState } from 'react';
import {Dimensions, StyleSheet, View, Text, Pressable} from "react-native";

const { height, width } = Dimensions.get('window');

interface CustomCheckboxProps {
    text: string,
    onChange: () => void,
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ text, onChange }) => {

    const [pressed, setPressed] = useState<boolean>(false);

    const onPress = () => {

    }

    return (
        <View style={styles.container}>
            <Pressable onPress={onPress}>
                {pressed ?
                    <View style={styles.pressed}>

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
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressed: {

    },
    unpressed: {

    },
    text: {

    }
});

export default CustomCheckbox;