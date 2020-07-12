import * as React from "react";
import { Dimensions } from 'react-native';
import Svg, { G, Path, Ellipse, Circle, Defs, LinearGradient, Stop, ClipPath } from "react-native-svg";

function BackgroundImageBig(props) {
    const { width, height } = Dimensions.get("window");
    const screenWidth = width;
    const screenHeight = height;

    return (
        <Svg
            width={1024}
            height={768}
            viewBox="0 0 1024 768"
            fill="none"
            {...props}
        >
            <G clipPath="url(#prefix__clip0)">
                <Path fill="url(#prefix__paint0_linear)" d="M0 0h1024v768H0z" />
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
                    cx={790.5}
                    cy={323.5}
                    rx={63.5}
                    ry={60.5}
                    fill="#E4FFED"
                    fillOpacity={0.12}
                />
                <Circle cx={790.5} cy={323.5} r={48.5} fill="#7DEF90" />
                <Ellipse
                    cx={-0.5}
                    cy={598.5}
                    rx={63.5}
                    ry={60.5}
                    fill="#78D5F2"
                    fillOpacity={0.14}
                />
                <Circle cx={-0.5} cy={598.5} r={48.5} fill="#32BB98" />
                <Circle cx={354} cy={839} r={204} fill="#8AC9F4" fillOpacity={0.15} />
                <Path
                    d="M556 829c0 114.309-93.335 207-208.5 207S139 943.309 139 829s93.335-207 208.5-207S556 714.691 556 829z"
                    stroke="#8AC9F4"
                    strokeOpacity={0.2}
                    strokeWidth={4}
                />
                <Circle cx={928} cy={757} r={204} fill="#8AC9F4" fillOpacity={0.15} />
                <Path
                    d="M1130 747c0 114.309-93.34 207-208.5 207C806.335 954 713 861.309 713 747s93.335-207 208.5-207c115.16 0 208.5 92.691 208.5 207z"
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
                <Circle cx={833} cy={-6} r={188} fill="#95F8AA" fillOpacity={0.3} />
                <Circle
                    cx={839}
                    r={192.5}
                    stroke="#8AF88F"
                    strokeOpacity={0.5}
                    strokeWidth={3}
                />
                <Ellipse
                    cx={509.5}
                    cy={463.5}
                    rx={63.5}
                    ry={60.5}
                    fill="#78D5F2"
                    fillOpacity={0.14}
                />
                <Circle cx={509.5} cy={463.5} r={48.5} fill="#32BB98" />
            </G>
            <Defs>
                <LinearGradient
                    id="prefix__paint0_linear"
                    x1={1024}
                    y1={0}
                    x2={878.668}
                    y2={908.552}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#90FC8E" />
                    <Stop offset={1} stopColor="#11A49B" />
                </LinearGradient>
                <ClipPath id="prefix__clip0">
                    <Path fill="#fff" d="M0 0h1024v768H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default BackgroundImageBig;