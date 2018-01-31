
import {
    processColor,
    Dimensions
} from 'react-native';

const ColorList = ["#45abff",
    "#6be6c1",
    "#ffa51f",
    "#ffd64e",
    "#3fd183",
    "#6ea7c7",
    "#5b7cf4",
    "#00bfd5",
    "#8bc7ff",
    "#f48784",
    "#d25537"];

const window = Dimensions.get('window');
const DataSetConfig = {
    lineWidth: 1,
    drawCircles: true,
    drawCubicIntensity: 0.3,
    drawHighlightIndicators: false,
    drawFilled: false,
    mode: "CUBIC_BEZIER",
    highlightColor: processColor('red'),
    circleColor: processColor('#8FA1B2'),
    color: processColor('#8FA1B2'),
}
const XAxis = {
    textColor: processColor('#8FA1B2'),//x轴字体颜色
    textSize: 10,//字体大小
    drawGridLines: false,//是否画x轴的竖线
    axisLineColor: processColor('#8FA1B2'),//x轴线的颜色
    axisLineWidth: 0.5,//x轴线的宽度
    avoidFirstLastClipping: true,
    position: 'BOTTOM',
    granularityEnabled: true,//当false时，轴值可能会被重复
    granularity: 1, //间隔   
}

const MutileXAxis = {
    granularityEnabled: true,
    granularity: 1,
    axisMaximum: 4,
    axisMinimum: 0,
    centerAxisLabels: true,
}
const YAxis = {
    left: {
        drawGridLines: true
    },
    right: {
        enabled: false
    }
}

const Legend = {
    enabled: false,
    textSize: 14,
    form: 'SQUARE',
    formSize: 14,
    xEntrySpace: 5,
    yEntrySpace: 5,
    formToTextSpace: 5,
    wordWrapEnabled: true,
    maxSizePercent: 0.5
}



export function AssemblLineConfig(option) {

    let dataSets = [];
    let lineColor = 'red';
    option.dataMap.map((item, index) => {
        lineColor = ColorList[index % ColorList.length];
        dataSets.push({
            values: item.data,
            label: '',
            config: {
                ...DataSetConfig,
                circleColor: processColor(lineColor),
                color: processColor(lineColor),
            }
        })
    })

    return {
        xAxis: { ...XAxis, valueFormatter: option.valueFormatter },
        yAxis: { ...YAxis },
        data: {
            dataSets: dataSets,
        }
    }
}

export function AssemblBarConfig(option) {
    let dataSets = [];
    let lineColor = 'red';
    let colorList = [];
    if (option.stack && option.stackNum > 1) {
        for (let i = 0; i < option.stackNum; i++) {
            colorList.push(processColor(ColorList[i % ColorList.length]))
        }
    }
    option.dataMap.map((item, index) => {
        lineColor = ColorList[index % ColorList.length];
        dataSets.push({
            values: item.data,
            label: '',
            config: {
                drawValues: false,
                colors: colorList,
            }
        })
    });
    let xAxis = {
        ...XAxis,
    }
    let data = {
        dataSets: dataSets,
    }
    if (option.dataMap.length > 1) {
        xAxis = {
            ...xAxis,
            ...MutileXAxis
        };
        data = {
            ...data,
            config: {
                barWidth: 0.8 / option.dataMap.length,
                group: {
                    fromX: 0,
                    groupSpace: 0.2,
                    barSpace: 0,
                },
            }
        }
    }
    return {
        xAxis: {
            ...xAxis,
            valueFormatter: option.valueFormatter
        },
        yAxis: { ...YAxis },
        data: {
            ...data
        }
    }
}