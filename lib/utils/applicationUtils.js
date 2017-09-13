
import React, { Component } from 'react';

import Svg, {
    Line,
    Text
} from 'react-native-svg';


export function DrawXYAxis(yMax, yHeight, xWidth, intervalNum) {
    let YAxisList = [];
    let interval = yHeight / intervalNum;
    for (let i = 0; i < intervalNum; i++) {
        YAxisList.push(
            <Line
                x1='30'
                y1={yMax - interval * i}
                x2={xWidth}
                y2={yMax - interval * i}
                stroke="red"
                strokeWidth="1"
            />)
    }

    return YAxisList;
}