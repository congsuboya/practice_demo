
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


// option ={
//     xAxis: {
//         type: 'category',
//         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//         axisTick: {
//             alignWithLabel: true
//         }
//     }
//     ,
//     yAxis: {
//         type: 'value'
//     },
//     series: [
//         {
//             name: '直接访问',
//             type: 'bar',
//             barWidth: '60%',
//             data: [10, 52, 200, 334, 390, 330, 220]
//         }
//     ]
// }

const initXAxis = {
    show: true,
    type: 'category',//'category','time','long'
    position: 'bottom',//'top'
    name: '',
    nameRotate: 0,//坐标轴旋转角度
    nameLocation: 'start',//'middle' 或者 'center' 'end'
}
const initYAxis = {
    show: true,
    type: 'value',//'value','time','long'
    position: 'left',//'right'
    name: '',
    nameRotate: 0,//坐标轴旋转角度
    nameLocation: 'end',//'middle' 或者 'center' 'end'
}

export function dealWithOption(svgWidth, svgHeight, option) {
    let xAxis = Object.assign(initXAxis, option.xAxis);
    let yAxis = Object.assign(initYAxis, option.yAxis);
    let series = option.series;
    let horizontal = true;

    let rectNum = series.length; //每个item的柱形图个数
    let intervalNum = series[0].data.length;//间隔

    if (xAxis.type == 'category' && yAxis.type == 'value') {
        horizontal = true
    } else if (xAxis.type == 'value' && yAxis.type !== 'category') {
        horizontal = false
    }

    let svgLength = horizontal ? svgWidth : svgHeight;
    let rectWidth = ((svgLength / intervalNum) - 20) / rectNum;//每个柱形图的宽度

    if (rectWidth < 12) {
        rectWidth = 12;
    } else if (rectWidth > 90) {
        rectWidth = 48
    }

    svgLength = (rectWidth * rectNum + 20) * intervalNum; //柱形图最大长度

    svgWidth = horizontal ? svgLength : svgWidth;
    svgHeight = horizontal ? svgHeight : svgLength

    return {
        xAxis,
        yAxis,
        horizontal,
        series,
        rectWidth,
        svgLength,
        rectNum,
        svgWidth,
        svgHeight
    }
}
