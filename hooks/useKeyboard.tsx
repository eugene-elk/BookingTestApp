import { useEffect } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

export const useKeyboard = () => {
    const keyboardHeight = useSharedValue<number>(0);
    const buttonBottom = useSharedValue<number>(0);

    function onKeyboardWillShow(e: KeyboardEvent) {
        // console.log('keyboard will show:', e.endCoordinates.height);
        keyboardHeight.value = e.endCoordinates.height;
        buttonBottom.value = withTiming(e.endCoordinates.height - 20, {
            duration: e.duration,
            easing: Easing.bezier(0.1, 0.76, 0.55, 0.9)
        });
    }

    function onKeyboardWillHide(e: KeyboardEvent) {
        //console.log('keyboard will hide');
        keyboardHeight.value = 0;
        buttonBottom.value = withTiming(0, {
            duration: 200,
            easing: Easing.bezier(0.1, 0.76, 0.55, 0.9)
        });
    }

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardWillShow', onKeyboardWillShow);
        const hideSubscription = Keyboard.addListener('keyboardWillHide', onKeyboardWillHide);

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return [keyboardHeight, buttonBottom];
};
