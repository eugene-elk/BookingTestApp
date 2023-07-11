import React from 'react';
import Svg, { G, Circle, Rect, Path, Defs, ClipPath } from 'react-native-svg';

export default function BackSVG() {
    return (
        <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <G clip-path="url(#clip0_1_1096)">
                <Path d="M18.828 20L23.778 24.95L22.364 26.364L16 20L22.364 13.636L23.778 15.05L18.828 20Z"
                      fill="#1E1E20"/>
            </G>
            <Defs>
                <ClipPath id="clip0_1_1096">
                    <Rect width="24" height="24" fill="white" transform="translate(8 8)"/>
                </ClipPath>
            </Defs>
        </Svg>
    );
}
