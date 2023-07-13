import React from 'react';
import {View} from 'react-native';
import BackgroundCircle from '../assets/svg/BackgroundCircle';

const BackgroundComponent = ({children}) => {
    return (
        <View style={{flex: 1}}>
            <BackgroundCircle />
            {children}
        </View>
    );
};

export default BackgroundComponent;