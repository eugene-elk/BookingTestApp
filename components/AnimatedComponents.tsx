import Animated from "react-native-reanimated";
import {Pressable, Text, TextInput} from "react-native";
import {MaskedTextInput} from "react-native-mask-text";

export const AnimatedText = Animated.createAnimatedComponent(Text);
export const AnimatedView = Animated.createAnimatedComponent(Text);
export const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
export const AnimatedMaskedTextInput = Animated.createAnimatedComponent(MaskedTextInput);
export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);