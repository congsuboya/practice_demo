
import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import Svg, {
    Line,
} from 'react-native-svg';

import ColorList from '../globalVariable';

export function DrawXYAxis(yHeight, xWidth, intervalNum = 3) {
    let YAxisList = [];
    let interval = yHeight / intervalNum;
    for (let i = 0; i <= intervalNum; i++) {
        YAxisList.push(
            <Line
                x1='0'
                y1={10 + interval * i}
                x2={xWidth}
                y2={10 + interval * i}
                stroke="#EEEEEE"
                strokeWidth="1"
            />)
    }
    return YAxisList;
}

export function DrawYValueView(valueInterval, svgCanvasHeight, viewHeight, maxNum) {
    let valueList = [];
    for (let i = 0; i <= valueInterval; i++) {
        valueList.push(<Text style={{
            marginTop: i == 0 ? 5 : (svgCanvasHeight / valueInterval - 10),
            fontSize: 9,
            textAlign: 'right',
            lineHeight: 10
        }}>{maxNum * (1 - i / valueInterval)}</Text>)
    }
    return (
        <View style={{ backgroundColor: 'white', width: 35, height: viewHeight, flexDirection: 'row' }}>
            <Text style={{
                fontSize: 9,
                width: 10,
                height: 100,
                textAlign: 'center',
                position: 'absolute',
                left: 5,
                top: (viewHeight - 120) / 2,
                textAlignVertical: 'center'
            }}>y轴名称</Text>
            <View style={{ flex: 1 }}>
                {valueList}
            </View>
        </View>
    )
}


export function DrawXYAxisValue(xAxis, horizontal, svgWidth, perLength) {
    let xAxisViews = [];
    let perViewStyle = { alignItems: 'center', justifyContent: 'center', height: 25, width: perLength };
    let perTextStyle = {
        flex: 0, fontSize: 9, color: '#292F33', textAlign: 'center', height: 10, width: 25,
        transform: [{ rotate: -45 }]
    };
    xAxis.data.map((item, index) => {
        xAxisViews.push(
            <View style={perViewStyle}>
                <Text numberOfLines={1} style={perTextStyle}>{item}</Text>
            </View>
        )
    });

    return (
        <View style={{ height: 40, width: svgWidth, flexDirection: 'row' }}>
            {xAxisViews}
        </View>
    );

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


export function dealWithOption(chartWidth, chartHeight, option, valueInterval) {
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

    let svgLength = (horizontal ? chartWidth : chartHeight) - 50;
    let rectWidth = ((svgLength / intervalNum) - 20) / rectNum;//每个柱形图的宽度

    if (rectWidth < 12) {
        rectWidth = 12;
    } else if (rectWidth > 90) {
        rectWidth = 48
    }

    svgLength = (rectWidth * rectNum + 20) * intervalNum; //柱形图最大长度
    let maxNum = getMaxNum(series, intervalNum, valueInterval);
    let axisHeight = 0;
    if ((horizontal && xAxis.show) || (!horizontal && yAxis.show)) {
        axisHeight = 40
    }

    let svgWidth = horizontal ? svgLength : chartWidth - 30;
    let svgHeight = horizontal ? chartHeight - axisHeight : svgLength;

    let barCanvasHeight = (horizontal ? svgHeight : svgWidth) - 12;
    let perRectHeight = barCanvasHeight / maxNum;

    return {
        xAxis,
        yAxis,
        horizontal,
        series,
        svgLength,
        svgWidth,
        svgHeight,
        maxNum,
        intervalNum,
        rectNum,
        rectWidth,
        barCanvasHeight,
        perRectHeight
    }
}

function getMaxNum(series, intervalNum, valueInterval, stack = false) {
    let tempMaxList = [];
    if (stack) {
        for (let i = 0; i < intervalNum; i++) {
            let tempNum = 0;
            series.map((item) => {
                tempNum += item.data[i];
            });
            tempMaxList.push(tempNum);
        }
    } else {
        series.map((item) => {
            tempMaxList.push(Math.max.apply(null, item.data));
        });
    }
    let maxData = Math.max.apply(null, tempMaxList);
    let numLength = maxData.toString().split('.')[0].length;
    let tenCube = 1;
    if (numLength > 2) {
        tenCube = Math.pow(10, numLength - 2);
    }

    let maxValue = Math.ceil(Math.ceil(maxData / tenCube) / valueInterval) * valueInterval * tenCube;
    return maxValue;
}
