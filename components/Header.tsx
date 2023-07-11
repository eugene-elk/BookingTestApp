import React, { useEffect, useState } from 'react';
import {Dimensions, StyleSheet, View, Text, Pressable} from "react-native";
import BackSVG from "../assets/svg/Back";

const { height, width } = Dimensions.get('window');

const Header: React.FC = () => {
    return (
        <View style={styles.container}>
            <BackSVG/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 56,
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 8,
    }
});

export default Header;