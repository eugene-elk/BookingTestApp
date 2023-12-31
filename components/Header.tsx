import React from 'react';
import {Dimensions, StyleSheet, View, TouchableOpacity} from "react-native";
import BackSVG from "../assets/svg/Back";

const { height, width } = Dimensions.get('window');

interface HeaderProps {
    active: boolean,
    onPress?: () => void,
}

const Header: React.FC<HeaderProps> = ({active = false, onPress = () => null}) => {
    return (
        <View style={styles.container}>
            {active ?
                <TouchableOpacity onPress={onPress}>
                    <BackSVG/>
                </TouchableOpacity>
                :
                <BackSVG/>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: Math.min(width, height),
        height: 56,
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 8,
    }
});

export default Header;