import React, { Component } from 'react';
import { View, Dimensions, ScrollView, Text } from 'react-native';
import Svg, {
    Line,
    Circle,
    G,
    Path,
    Rect,
    LinearGradient,
    Stop,
    Defs
} from 'react-native-svg';
import ColorList from '../globalVariable';
import ToastView from './toastView'
import { fromJS, is } from 'immutable'

function getPerValue(maxValue, count = 3) {

    const value = Math.ceil(maxValue / count);
    const valueStr = value + '';
    const valueLength = valueStr.length - 1;
    let temp = value;
    for (const i = 0; i < valueLength; i++) {
        temp = Math.ceil(temp / 10);
    }
    const perValue = temp * Math.pow(10, valueLength);
    return perValue;
}

const window = Dimensions.get('window');
const xUnitMinimumLength = 40;
const yAxisNameLength = 12;
const yAxisLength = 24;
const xLabelHeight = 40
const xLabelWidth = 40
const leftMargin = 40;
const topMargin = 5;
const bottomMargin = 40;
const rightMargin = 80;
class BrokenLine extends Component {
    constructor(props) {
        super(props);
        this.renderChartView = this.renderChartView.bind(this);
        this.offsetX = 0;
        this.state = {
            selectedIndex: null,
        }
        if (this.props.style.height) {
            ySvgHeight = this.props.style.height - 12;
            xSvgHeight = ySvgHeight - 40
        }
    }

    componentWillReceiveProps(nextProps) {
        if (fromJS(nextProps.isSelected) !== fromJS(this.props.isSelected)) {
            if (!nextProps.isSelected) {
                this.refs.toast.close();
                this.setState({
                    selectedIndex: null
                })
            }
        }
    }

    getMaxNum(data) {
        let number = 0;
        data.map((item) => {
            if (number < item) {
                number = item;
            }
        });
        return number;
    }

    calculateXAxisUnitLength(chartData, style) {
        if ((style.width - yAxisLength - yAxisNameLength - 4 - 40) / (chartData.xAxis.data.length - 1) > 40) {
            return (style.width - yAxisLength - yAxisNameLength - 4 - 40) / (chartData.xAxis.data.length - 1)
        } else {
            return 40
        }
    }

    renderChartView(chartData, style) {
        let ySvgHeight = 160;
        let xSvgHeight = 120;
        if (style.height) {
            ySvgHeight = this.props.style.height - 12;
            xSvgHeight = ySvgHeight - 40
        }
        const yAxisheight = ySvgHeight;
        const yUnitLength = (yAxisheight - topMargin - bottomMargin) / this.props.yDivisionPoints;
        const xUnitLength = this.calculateXAxisUnitLength(chartData, style);
        const xAxisLength = xUnitLength * (chartData.xAxis.data.length - 1) + 40;
        const maxiNumList = chartData.data.map((item) => { return this.getMaxNum(item.values) });
        const dataMaxiNum = this.getMaxNum(maxiNumList);
        const yPerNum = getPerValue(dataMaxiNum, this.props.yDivisionPoints)
        const maxiNum = yPerNum * this.props.yDivisionPoints

        let yUnitView = (
            <View key='yUnit' style={{ width: yAxisNameLength, height: yAxisheight, justifyContent: 'center' }}>
                <View style={{ width: yAxisNameLength, marginTop: 72, transform: [{ rotateZ: '-90deg' }] }}>
                    <Text
                        numberOfLines={1}
                        style={{ width: 120, color: '#8FA1B2', fontSize: 9, textAlign: 'center' }}
                    >
                        金额 {chartData.yUnit}
                    </Text>
                </View>
            </View>

        )

        let xLabels = [];
        let yLabels = [];
        let imaginaryLines = [];
        let lines = [];
        let points = [];
        let onPressViews = [];
        let xAxisLabelSubline = [];
        let selectedLine = null;
        if (this.state.selectedIndex !== null) {
            selectedLine = (
                <Line key='selectedLine'
                    x1={(this.state.selectedIndex) * xUnitLength + xLabelWidth / 2}
                    y1={topMargin}
                    x2={(this.state.selectedIndex) * xUnitLength + xLabelWidth / 2}
                    y2={xSvgHeight}
                    stroke="url(#grad)"
                    strokeWidth='1' />
            )
        }

        chartData.xAxis.data.map((item, index) => {
            xAxisLabelSubline.push(
                <Line key={'xAxisLabelSubline_' + index}
                    x1={xLabelWidth / 2 + index * xUnitLength}
                    y1={xSvgHeight - 4}
                    x2={xLabelWidth / 2 + index * xUnitLength}
                    y2={xSvgHeight}
                    stroke="#EEEEEE"
                    strokeWidth='1'
                />
            )
            xLabels.push(
                <View key={index} style={{ width: xLabelWidth, height: xLabelHeight, justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                        numberOfLines={1}
                        key={index}
                        style={{ marginTop: -6, color: '#292F33', fontSize: 9, transform: [{ rotateZ: '-45deg' }] }}
                    >
                        {item}
                    </Text>
                </View>
            );

            onPressViews.push(
                <Rect
                    key={index + 'rect'}
                    x={index * xUnitLength}
                    y={0}
                    width={xLabelHeight}
                    height={xSvgHeight}
                    fill={'transparent'}
                    onPress={(e) => {
                        let nativeE = e.nativeEvent;
                        let data = []
                        chartData.data.forEach((dataItem, dataIndex) => {
                            data.push([`自定义名称: ${dataItem.name}`, `${this.props.chartData.yUnit}: ${dataItem.values[index] ? dataItem.values[index] : ''}`])
                        })
                        let locationX = index * xUnitLength + yAxisLength + yAxisNameLength + xLabelWidth / 2 + 10 - this.offsetX
                        if (style.width - locationX < 130) {
                            locationX = locationX - 130 - 20
                        }
                        let location = {
                            locationX: locationX,
                            locationY: ySvgHeight / 2 - 80,
                        }
                        this.refs.toast.show(location, data, false, 2000, () => {
                        });
                        this.setState({
                            selectedIndex: index
                        })
                    }}

                />
            )
        })

        for (let index = 0; index <= this.props.yDivisionPoints; index++) {
            yLabels.push(
                <Text
                    key={index}
                    numberOfLines={1}
                    style={{ color: '#8FA1B2', fontSize: 8 }}
                >
                    {(this.props.yDivisionPoints - index) * yPerNum}
                </Text>
            )

            imaginaryLines.push(
                <Line key={chartData.xAxis.data.length + index}
                    x1='0'
                    y1={yAxisheight - bottomMargin - index * yUnitLength}
                    x2={xAxisLength}
                    y2={yAxisheight - bottomMargin - index * yUnitLength}
                    stroke="#EEEEEE"
                    strokeWidth={index == 0 ? 2 : 1} />
            )
        }
        let yLabelsView = (
            <View style={{ width: yAxisLength, height: xSvgHeight + topMargin, alignItems: 'flex-end', justifyContent: 'space-between' }}>
                {yLabels}
            </View>
        )

        chartData.data.map((itemA, index) => {
            let pointCoordinates = itemA.values.map((item, ii) => {
                return [xLabelWidth / 2 + ii * xUnitLength, xSvgHeight - (yAxisheight - topMargin - bottomMargin) * item / maxiNum]
            })
            let path = ''
            pointCoordinates.forEach((item, index1) => {
                if (index1 == 0) {
                    path += `M${item[0]} ${item[1]} `
                } else {
                    path += `L${item[0]} ${item[1]} `
                }
                if (this.state.selectedIndex == index1) {
                    points.push(
                        <Circle
                            key={`${index}_${index1}`}
                            cx={item[0]}
                            cy={item[1]}
                            r="2"
                            fill={ColorList[index % ColorList.length]}
                        />
                    )
                }
            })

            lines.push(
                <Path
                    key={index}
                    stroke={ColorList[index % ColorList.length]}
                    fill="none"
                    d={path}
                />
            )
        })

        return {
            xAxisLabelSubline: xAxisLabelSubline,
            selectedLine: selectedLine,
            onPressViews: onPressViews,
            xAxisLength: xAxisLength,
            imaginaryLines: imaginaryLines,
            xLabelsView: xLabels,
            yLabelsView: yLabelsView,
            linesView: lines,
            pointsView: points,
            yUnitView: yUnitView
        }
    }

    calculateDimensionaViews(chartData, width) {
        let Dimensions = [];
        chartData.data.forEach((item, index) => {
            Dimensions.push(
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
                    <View style={{ width: 10, height: 10, backgroundColor: ColorList[index % ColorList.length], marginRight: 4 }} />
                    <Text key={index} style={{ color: '#8899a6', fontSize: 9 }}>
                        {item.name}
                    </Text>
                </View>
            )
        })
        return Dimensions
    }

    render() {
        let { chartData, style } = this.props;
        let width = style.width;
        let height = style.height;
        let { xAxisLabelSubline, selectedLine, onPressViews, xAxisLength, yUnitView, linesView, pointsView, xLabelsView, yLabelsView, imaginaryLines } = this.renderChartView(chartData, style);
        return (
            <View style={this.props.style} pointerEvents={this.props.isSelected === false ? 'none' : 'auto'}>
                <View style={{ width: width, height: height, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ marginRight: 4, width: yAxisLength + yAxisNameLength, height: style.height ? style.height - 12 : 160, flexDirection: 'row' }}>
                            {yUnitView}
                            {yLabelsView}
                        </View>
                        <ScrollView
                            style={{ width: width - yAxisLength - yAxisNameLength - 100 }}
                            scrollEnabled={true}
                            horizontal={true}
                            showsHorizontalScrollIndicator={true}
                            bounces={false}
                            scrollEventThrottle={5}
                            onScroll={(e) => {
                                this.offsetX = e.nativeEvent.contentOffset.x;
                            }}
                        >
                            <View>
                                <Svg width={`${xAxisLength}`} height={`${style.height ? style.height - 52 : 120}`}>
                                    <Defs>
                                        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2={`${style.height ? style.height - 52 : 120}`}>
                                            <Stop offset="0" stopColor="#228EE6" stopOpacity="1" />
                                            <Stop offset="1" stopColor="#3AE8CB" stopOpacity="0.11" />
                                        </LinearGradient>
                                    </Defs>
                                    {imaginaryLines}
                                    {linesView}
                                    {selectedLine}
                                    {pointsView}
                                    {onPressViews}
                                    {xAxisLabelSubline}
                                </Svg>
                                <View style={{ width: xAxisLength, height: xLabelHeight, justifyContent: 'space-between', flexDirection: 'row' }}>
                                    {xLabelsView}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View key='xAxisName' style={{ height: 12, flexDirection: 'row' }}>
                        <View style={{ width: yAxisLength + yAxisNameLength + 4, height: 12 }} />
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text numberOfLines={1} style={{ color: '#8FA1B2', fontSize: 9 }}>单位 {chartData.xUnit} </Text>
                        </View>
                    </View>
                </View>
                <ToastView viewType='line' selectedIndex={this.state.selectedIndex} ref="toast"></ToastView>
            </View>
        )
    }
}

BrokenLine.propTypes = {

};

BrokenLine.defaultProps = {
    chartData: {
        xAxis: {
            data: ["星期一一一一一", "星期二二", "X3", "X4", "X5", "X6", "X7", "X8", "X9", "X10", "X11", "X12", "X113"]
        },
        data: [
            {
                name: 'name',
                values: [23, 44, 56, 23, 43, 53, 23, 53, 23, 80, 43, 54, 64],
            },
            {
                name: 'name2',
                values: [34, 45, 63, 64, 23, 64, 64, 76, 43, 65, 64, 65, 34],
            },
            {
                name: 'name3',
                values: [40, 46, 86, 45, 34, 67, 64, 35, 24, 64, 43, 65, 23],
            },
            {
                name: 'name4',
                values: [45, 65, 34, 64, 86, 45, 75, 76, 43, 23, 43, 45, 23],
            },
            {
                name: 'name5',
                values: [42, 64, 76, 86, 98, 34, 43, 65, 76, 86, 54, 65, 43],
            }

        ],
        yUnit: "数值",
        xUnit: "星期"
    },
    style: {
        height: 300,
        width: 200,
    },
    yDivisionPoints: 3
};

export default BrokenLine;