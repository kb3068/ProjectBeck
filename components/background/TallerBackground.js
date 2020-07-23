import * as React from "react";
import { Dimensions } from 'react-native';
import Svg, { G, Path, Ellipse, Circle, Defs, LinearGradient, Stop, ClipPath } from "react-native-svg";

function BackgroundImage(props) {
    var { width, height } = Dimensions.get("window");
    var screenWidth = width;
    var screenHeight = height;

    return (
        <Svg
            width={383}
            height={1117}
            viewBox="0 0 383 1117"
            fill="none"
            {...props}
        >
            <G clipPath="url(#prefix__clip0)" filter="url(#prefix__filter0_d)">
                <Path
                    transform="translate(4)"
                    fill="url(#prefix__paint0_linear)"
                    d="M0 0h375v1109H0z"
                />
                <Ellipse
                    cx={386.5}
                    cy={188.5}
                    rx={63.5}
                    ry={60.5}
                    fill="#E4FFED"
                    fillOpacity={0.12}
                />
                <Circle cx={386.5} cy={188.5} r={48.5} fill="#7DEF90" />
                <Ellipse
                    cx={3.5}
                    cy={598.5}
                    rx={63.5}
                    ry={60.5}
                    fill="#78F2D5"
                    fillOpacity={0.14}
                />
                <Circle cx={3.5} cy={598.5} r={48.5} fill="#2DB899" />
                <Circle cx={341} cy={829} r={202} fill="#8AC9F4" fillOpacity={0.15} />
                <Circle
                    cx={340.5}
                    cy={829.5}
                    r={213.5}
                    stroke="#8AC9F4"
                    strokeOpacity={0.2}
                    strokeWidth={4}
                />
                <Circle cx={39} r={188} fill="#95F8AA" fillOpacity={0.3} />
                <Circle
                    cx={45}
                    cy={6}
                    r={192.5}
                    stroke="#8AF88F"
                    strokeOpacity={0.5}
                    strokeWidth={3}
                />
            </G>
            <Defs>
                <LinearGradient
                    id="prefix__paint0_linear"
                    x1={375}
                    y1={0}
                    x2={-164.45}
                    y2={681.905}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#90FC8E" />
                    <Stop offset={1} stopColor="#11A49B" />
                </LinearGradient>
                <ClipPath id="prefix__clip0">
                    <Path fill="#fff" transform="translate(4)" d="M0 0h375v1109H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default BackgroundImage;