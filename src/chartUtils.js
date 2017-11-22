
import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import Svg, {
    Line,
} from 'react-native-svg';

import ColorList from './globalVariable';

const showWidth = 360;
const showHeight = 600;


export function DrawDimension(DimData, type) {
    let DimensList = [];
    console.log('lkjoijljlj', DimData);
    DimData.map((item, index) => {
        if (index < 15) {
            DimensList.push(
                <View style={{ height: 13, flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {DrawDimenIcon(type, index)}
                    <Text numberOfLines={1} style={{ fontSize: 9, flex: 0, color: '#8FA1B2', marginRight: 8, marginLeft: 2 }}>{item}</Text>
                </View>
            )
        }
    });
    return DimensList;
}


function DrawDimenIcon(type, index) {
    switch (type) {
        case 'biViewLine'://折线图
            return <View style={{ height: 2, width: 8, borderRadius: 1, backgroundColor: ColorList[index % ColorList.length] }} />
        case 'biViewFunnel'://漏斗
            return <View style={{ height: 8, width: 8, backgroundColor: ColorList[index % ColorList.length] }} />
        case 'biViewPie':
            return <View style={{ height: 8, width: 8, backgroundColor: ColorList[index % ColorList.length], borderRadius: 4 }} />
        default:
            return <View style={{ height: 8, width: 8, backgroundColor: ColorList[index % ColorList.length] }} />
    }
}


export function DrawXYAxisLine(yHeight, lineLight, horizontal, intervalNum = 3, offSetNum = 2) {
    let YAxisList = [];
    let interval = yHeight / intervalNum;
    let perLine = null;
    for (let i = 0; i <= intervalNum; i++) {
        if (horizontal) {
            perLine = <Line
                x1='0'
                y1={10 + interval * i}
                x2={lineLight}
                y2={10 + interval * i}
                stroke="#EEEEEE"
                strokeWidth="1"
            />
        } else {
            perLine = <Line
                x1={2 + interval * i}
                y1={offSetNum}
                x2={2 + interval * i}
                y2={offSetNum + lineLight}
                stroke="#EEEEEE"
                strokeWidth="1"
            />
        }
        YAxisList.push(perLine)
    }
    return YAxisList;
}

export function DrawYValueView(valueInterval, svgCanvasHeight, viewHeight, maxNum, yAxis, offSetNum = 0) {
    let valueList = [];
    let valueNum;
    let innerMax = maxNum - offSetNum;
    for (let i = 0; i <= valueInterval; i++) {
        valueNum = innerMax * (1 - i / valueInterval) + offSetNum;
        valueList.push(<Text
            numberOfLines={1}
            style={{
                marginTop: i == 0 ? 5 : (svgCanvasHeight / valueInterval - 10),
                fontSize: 9,
                textAlign: 'right',
                lineHeight: 10
            }}>{parseInt(valueNum)}</Text>)
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
            }}>{yAxis.title ? yAxis.title : 'y轴名称'}</Text>
            <View style={{ flex: 1 }}>
                {valueList}
            </View>
        </View>
    )
}


export function DrawBubbleXValueView(valueInterval, svgCanvasWidth, viewWidth, maxNum, xLable, offSetNum = 0) {
    let valueList = [];
    let valueNum;
    let marginLeft = 0;
    let innerMax = maxNum - offSetNum;

    for (let i = valueInterval; i >= 0; i--) {

        valueNum = maxNum - maxNum / valueInterval * i + offSetNum;
        valueList.push(<Text
            numberOfLines={1}
            style={{
                marginLeft: i == valueInterval ? 0 : (svgCanvasWidth / valueInterval - 30),
                fontSize: 9,
                textAlign: 'center',
                lineHeight: 10,
                width: 30
            }}>{parseInt(valueNum)}</Text>)
    }
    return (
        <View style={{ width: viewWidth, height: 35, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row' }}>
                {valueList}
            </View>
            <Text
                style={{
                    marginLeft: (viewWidth - 60) / 2,
                    marginTop: 5,
                    flex: 0,
                    fontSize: 9,
                    width: 100,
                    height: 10,
                    textAlign: 'center'
                }}>{xLable ? xLable : 'x轴名称'}</Text>
        </View>
    )
}

export function DrawXValueView(valueInterval, svgCanvasWidth, viewWidth, maxNum, xAxis) {
    let valueList = [];
    let valueNum;
    let marginLeft = 0;
    for (let i = valueInterval; i >= 0; i--) {
        valueNum = maxNum * (1 - i / valueInterval);
        valueList.push(<Text
            numberOfLines={1}
            style={{
                marginLeft: i == valueInterval ? 17 : (svgCanvasWidth / valueInterval - 30),
                fontSize: 9,
                textAlign: 'center',
                lineHeight: 10,
                width: 30
            }}>{parseInt(valueNum)}</Text>)
    }
    return (
        <View style={{ width: viewWidth, height: 35, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row' }}>
                {valueList}
            </View>
            <Text
                style={{
                    marginLeft: (viewWidth - 132) / 2,
                    marginTop: 5,
                    flex: 0,
                    fontSize: 9,
                    width: 100,
                    height: 10,
                    textAlign: 'center'
                }}>{xAxis.title ? xAxis.title : 'x轴名称'}</Text>
        </View>
    )
}

export function DrawYXAxisValue(axis, horizontal, svgLength, perLength, offsetLength, intervalNum) {
    let aXisViews = [];
    let perViewStyle = { alignItems: 'center', justifyContent: 'center', height: horizontal ? 25 : perLength, width: horizontal ? perLength : 25 };
    let perTextStyle = {
        flex: 0, fontSize: 9, color: '#292F33', textAlign: horizontal ? 'center' : 'right', height: 10, width: 25,
        transform: [{ rotate: horizontal ? '-45deg' : '0deg' }]
    };
    axis.data.some((item, index) => {
        if (index > intervalNum - 1) {
            return true;
        }
        aXisViews.push(
            <View style={perViewStyle}>
                <Text numberOfLines={1} style={perTextStyle}>{item}</Text>
            </View>
        )
    });

    return (
        <View style={{
            height: horizontal ? 40 : svgLength,
            width: horizontal ? svgLength : 30,
            flexDirection: horizontal ? 'row' : 'column',
            marginLeft: horizontal ? offsetLength : 0,
            marginTop: horizontal ? 0 : offsetLength,
        }}>
            {aXisViews}
        </View>
    );

}


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




/**
 *  气泡图方法
 */

export function getBubbleMaxMinNum(option) {
    let xMaxList = [];
    let xMinList = [];

    let yMaxList = [];
    let yMinList = [];

    let sizeMaxList = [];
    let sizeMinList = [];


    let xInnerList, yInnerList, sizeInnerList;

    option.series.map((perItem, index) => {
        xInnerList = [];
        yInnerList = [];
        sizeInnerList = [];

        perItem.data.map((innerItem, innerIndex) => {
            xInnerList.push(option.xAxis(innerItem));
            yInnerList.push(option.yAxis(innerItem));
            sizeInnerList.push(option.symbolSize(innerItem));
        });

        xMaxList.push(Math.max.apply(null, xInnerList));
        xMinList.push(Math.min.apply(null, xInnerList));

        yMaxList.push(Math.max.apply(null, yInnerList));
        yMinList.push(Math.min.apply(null, yInnerList));

        sizeMaxList.push(Math.max.apply(null, sizeInnerList));
        sizeMinList.push(Math.min.apply(null, sizeInnerList));
    });

    let yMin = Math.min.apply(null, yMinList);
    let yMax = Math.max.apply(null, yMaxList) - yMin;
    let yMaxValue = getMaxValue(yMax, option.valueInterval) + yMin;
    return {
        xMax: getMaxValue(Math.max.apply(null, xMaxList), 6),
        xMin: Math.min.apply(null, xMinList),
        yMax: yMaxValue,
        yMin: Math.min.apply(null, yMinList),
        sizeMax: Math.max.apply(null, sizeMaxList),
        sizeMin: Math.min.apply(null, sizeMinList)
    }
}


export function getMaxValue(maxData, valueInterval = 3) {
    let numLength = maxData.toString().split('.')[0].length;
    let tenCube = 1;
    if (numLength > 2) {
        tenCube = Math.pow(10, numLength - 2);
    }
    return Math.ceil(Math.ceil(maxData / tenCube) / valueInterval) * valueInterval * tenCube;
}


export function dealWithOption(chartWidth, chartHeight, option, valueInterval, isLine = false) {
    let xAxis = Object.assign(initXAxis, option.xAxis);
    let yAxis = Object.assign(initYAxis, option.yAxis);
    let series = option.series;
    let horizontal = true;

    let offsetLength = 0;

    let rectNum = (option.stack || isLine) ? 1 : series.length; //每个item的柱形图个数
    let intervalNum = series[0].data.length;//间隔

    if (xAxis.type == 'category' && yAxis.type == 'value') {
        horizontal = true;
    } else if (xAxis.type == 'value' && yAxis.type == 'category') {
        horizontal = false;
    }

    let svgLength = (horizontal ? chartWidth : chartHeight) - 50;
    let rectWidth = ((svgLength / intervalNum) - 20) / rectNum;//每个柱形图的宽度

    if (rectWidth < 12) {
        rectWidth = 12;
    } else if (rectWidth > 48) {
        rectWidth = 48
    }

    svgLength = (rectWidth * rectNum + 20) * intervalNum; //柱形图最大长度
    if (horizontal && svgLength < chartWidth - 50) {
        offsetLength = (chartWidth - 50 - svgLength) / 2;
        svgLength = chartWidth - 50;
    } else if (!horizontal && svgLength < chartHeight - 50) {
        offsetLength = (chartHeight - 50 - svgLength) / 2;
        svgLength = chartHeight - 50;
    }
    let maxNum = getMaxNum(series, intervalNum, valueInterval, option.stack);
    let axisHeight = 0;
    if ((horizontal && xAxis.show) || (!horizontal && yAxis.show)) {
        axisHeight = 35
    }

    let svgWidth = horizontal ? svgLength : chartWidth - 50;
    let svgHeight = horizontal ? chartHeight - axisHeight : svgLength;

    let barCanvasHeight = horizontal ? (svgHeight - 12) : (svgWidth - 17);
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
        perRectHeight,
        offsetLength,
        ...cutApartData(svgLength, intervalNum, horizontal, rectWidth, rectNum)
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



///--------------------------------/////
export function dealWithBarOption(chartWidth, chartHeight, option, valueInterval, isLine = false) {
    let xAxis = Object.assign(initXAxis, option.xAxis);
    let yAxis = Object.assign(initYAxis, option.yAxis);
    let series = option.series;
    let horizontal = true;

    let offsetLength = 0;

    let rectNum = (option.stack || isLine) ? 1 : series.length; //每个item的柱形图个数
    let intervalNum = series[0].data.length;//间隔

    if (xAxis.type == 'category' && yAxis.type == 'value') {
        horizontal = true;
    } else if (xAxis.type == 'value' && yAxis.type == 'category') {
        horizontal = false;
    }

    let svgLength = (horizontal ? chartWidth : chartHeight) - 50;
    let rectWidth = ((svgLength / intervalNum) - 20) / rectNum;//每个柱形图的宽度

    if (rectWidth < 12) {
        rectWidth = 12;
    } else if (rectWidth > 48) {
        rectWidth = 48
    }

    svgLength = (rectWidth * rectNum + 20) * intervalNum; //柱形图最大长度
    if (horizontal && svgLength < chartWidth - 50) {
        offsetLength = (chartWidth - 50 - svgLength) / 2;
        svgLength = chartWidth - 50;
    } else if (!horizontal && svgLength < chartHeight - 50) {
        offsetLength = (chartHeight - 50 - svgLength) / 2;
        svgLength = chartHeight - 50;
    }
    let maxNum = getMaxNum(series, intervalNum, valueInterval, option.stack);
    let axisHeight = 0;
    if ((horizontal && xAxis.show) || (!horizontal && yAxis.show)) {
        axisHeight = 35
    }

    let svgWidth = horizontal ? svgLength : chartWidth - 50;
    let svgHeight = horizontal ? chartHeight - axisHeight : svgLength;

    let barCanvasHeight = horizontal ? (svgHeight - 12) : (svgWidth - 17);
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
        perRectHeight,
        offsetLength
    }
}


function cutApartData(svgLength, intervalNum, horizontal, rectWidth, rectNum) {
    let maxShowLength = showWidth * 3;
    if (!horizontal) {
        maxShowLength = showHeight * 3;
    };
    let cutNum = parseInt(svgLength / maxShowLength);

    let cutApartNum = intervalNum;
    let cutPerWidth = svgLength;
    if (cutNum == 0) {
        return {
            cutNum,
            cutApartNum,
            cutPerWidth
        };
    } else {
        cutApartNum = parseInt(intervalNum / cutNum);
        if (intervalNum % cutNum != 0) {
            cutApartNum = cutApartNum + 1;
        }
        cutPerWidth = (rectWidth * rectNum + 20) * cutApartNum
        return {
            cutNum,
            cutApartNum,
            cutPerWidth
        }
    }
}


