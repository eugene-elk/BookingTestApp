import React from 'react';
import {StyleSheet, View} from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import colors from '../assets/colors/colors';

const CodeInput: React.FC = () => {

    const countries = [
        '+7',
        '+44',
        '+1',
        '+49',
        '+33',
        '+39',
        '+34',
        '+86',
        '+81',
        '+91',
    ];

    return (
        <View style={styles.container}>
            <SelectDropdown
                data={countries}
                defaultValue={'+7'}
                onSelect={(selectedItem, index) => {
                    //console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                buttonTextStyle={styles.buttonTextStyle}
                buttonStyle={styles.buttonStyle}
                dropdownStyle={styles.dropdownStyle}
            />
        </View>
    )
};

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    buttonStyle: {
        height: 56,
        width: 64,
        backgroundColor: 'white',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextStyle: {
        fontSize: 17,
        fontFamily: 'DMSans-Medium',
        //lineHeight: 20,
        letterSpacing: -0.24,
        color: colors.textMain,
    },
    dropdownStyle: {
        marginTop: -36,
        height: 300,
        borderRadius: 12,
        borderTopLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
    }
});

export default CodeInput;