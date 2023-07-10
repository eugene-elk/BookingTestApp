import React, { useEffect } from 'react';
import {Button, TextInput} from "react-native";

interface CustomInputProps {
    name: string,
}

const CustomInput: React.FC<CustomInputProps> = ({ name }) => {



    return (
        <TextInput onChangeText={(text) => {console.log(text)}}/>
    )
}

export default CustomInput;