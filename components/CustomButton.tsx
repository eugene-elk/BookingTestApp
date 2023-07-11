import React, { useEffect } from 'react';
import {Button, Dimensions, Pressable, StyleSheet, View, Text, TouchableOpacity} from "react-native";

const { height, width } = Dimensions.get('window');

interface ButtonProps {
    name: string,
    active?: boolean,
    onPress: () => void,
}

const CustomButton: React.FC<ButtonProps> = ({ name, active=true, onPress }) => {

    useEffect(() => {

    }, [active]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.text}>{name}</Text>
            </TouchableOpacity>
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