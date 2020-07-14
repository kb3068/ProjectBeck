import * as React from "react";
import { Dimensions } from 'react-native';
import Svg, { G, Path, Ellipse, Circle, Defs, LinearGradient, Stop, ClipPath } from "react-native-svg";

function BackgroundImageBig(props) {
    const { width, height } = Dimensions.get("window");
    const screenWidth = width;
    const screenHeight = height;

    return (
        <Svg
            width={1368}
            height={1368}
            viewBox="0 0 1368 1368"
            fill="none"
            {...props}
        >
            <G clipPath="url(#prefix__clip0)">
                <Path fill="url(#prefix__paint0_linear)" d="M0 0h1368v1368H0z" />
                <Ellipse
                    cx={382.5}
                    cy={188.5}
                    rx={63.5}
                    ry={60.5}
                    fill="#E4FFED"
                    fillOpacity={0.12}
                />
                <Circle cx={382.5} cy={188.5} r={48.5} fill="#7DEF90" />
                <Ellipse
                    cx={2.5}
                    cy={661.5}
                    rx={63.5}
                    ry={60.5}
                    fill="#78D5F2"
                    fillOpacity={0.14}
                />
                <Circle cx={2.5} cy={661.5} r={48.5} fill="#32BB98" />
                <Circle cx={357} cy={902} r={204} fill="#8AC9F4" fillOpacity={0.15} />
                <Path
                    d="M559 892c0 114.31-93.335 207-208.5 207S142 1006.31 142 892c0-114.309 93.335-207 208.5-207S559 777.691 559 892z"
                    stroke="#8AC9F4"
                    strokeOpacity={0.2}
                    strokeWidth={4}
                />
                <Circle cx={35} r={188} fill="#95F8AA" fillOpacity={0.3} />
                <Circle
                    cx={41}
                    cy={6}
                    r={192.5}
                    stroke="#8AF88F"
                    strokeOpacity={0.5}
                    strokeWidth={3}
                />
                <Ellipse
                    cx={1189.5}
                    cy={188.5}
                    rx={63.5}
                    ry={60.5}
                    fill="#E4FFED"
                    fillOpacity={0.12}
                />
                <Circle cx={1189.5} cy={188.5} r={48.5} fill="#7DEF90" />
                <Ellipse
                    cx={809.5}
                    cy={661.5}
                    rx={63.5}
                    ry={60.5}
                    fill="#78D5F2"
                    fillOpacity={0.14}
                />
                <Circle cx={809.5} cy={661.5} r={48.5} fill="#32BB98" />
                <Circle cx={1164} cy={902} r={204} fill="#8AC9F4" fillOpacity={0.15} />
                <Path
                    d="M1366 892c0 114.31-93.34 207-208.5 207S949 1006.31 949 892c0-114.309 93.34-207 208.5-207S1366 777.691 1366 892z"
                    stroke="#8AC9F4"
                    strokeOpacity={0.2}
                    strokeWidth={4}
                />
                <Circle cx={842} r={188} fill="#95F8AA" fillOpacity={0.3} />
                <Circle
                    cx={848}
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
                    x1={1368}
                    y1={0}
                    x2={1029.41}
                    y2={1587.55}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#90FC8E" />
                    <Stop offset={1} stopColor="#11A49B" />
                </LinearGradient>
                <ClipPath id="prefix__clip0">
                    <Path fill="#fff" d="M0 0h1368v1368H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default BackgroundImageBig;