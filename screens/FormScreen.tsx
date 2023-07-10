import React, { useEffect, useState } from 'react';
import {Button, TextInput} from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

export default function FormScreen({navigation}) {

    const buttonPressed = () => {
        navigation.navigate("ResultScreen");
    }

    return (
        <>
            <CustomInput name={"Флекс"}/>
            <CustomButton name={"Отправить"} onPress={buttonPressed}/>
        </>
    )
}
