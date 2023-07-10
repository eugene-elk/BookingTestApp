import React, { useEffect } from 'react';
import {Button} from "react-native";

interface ButtonProps {
    name: string,
    onPress: () => void,
}

const CustomButton: React.FC<ButtonProps> = ({ name, onPress }) => {

    return (
        <Button title={name} onPress={onPress}/>
    )
}

export default CustomButton;