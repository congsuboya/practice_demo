import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Animated,
    ScrollView,
    Text,
    TouchableHighlight,
    FlatList
} from 'react-native';

const window = Dimensions.get('window');
import ColorList from '../globalVariable';
import { DrawXYAxisLine, DrawYXAxisValue, DrawYValueView } from '../chartUtils';

const itemViewStyle = { justifyContent: 'center', flexDirection: 'row' };
const itemViewStackStyle = { justifyContent: 'flex-end', flexDirection: 'column' };


export default class HorizontalBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ...props,
            topHeight: 10
        }
        this.viewAnimatedList = [];
        this.renderBarItem = this.renderBarItem.bind(this);
        this.clickItemView = this.clickItemView.bind(this);
        this.scrollOffX = 0;
        this.renderItem = this.renderItem.bind(this);
        this.createLineView = this.createLineView.bind(this);
        this.createYValue = this.createYValue.bind(this);
        this.createXValueTitle = this.createXValueTitle.bind(this);
        this.yValueView = null;
        this.xValueTitle = null;
    }

    renderBarItem(hadedDrawNum) {
        let {
            maxNum, series,
            intervalNum,
            rectNum,
            rectWidth,
            perRectHeight,
            barCanvasHeight,
            interWidth,
            stack,
            offsetLength,
            cutNum,
            cutApartNum
        } = this.state;

        let barViewList = [];
        let rectHight;
        let xNum;
        let numlength;
        let textX;
        let textY;
        let textColor;
        let rotateY;
        let preTextWidth = 3;

        for (let i = 0; i < cutApartNum; i++) {
            let lastHeight = 0;
            series.some((mapItem, index) => {
                rectHight = mapItem.data[i + hadedDrawNum * cutApartNum] * perRectHeight;
                if (rectHight < 2) {
                    rectHight = 2;
                }
                xNum = (i * 2 + 1) * interWidth + i * rectWidth * rectNum;
                if (!stack) {
                    xNum = xNum + index * rectWidth;
                }
                barViewList.push(
                    <AnimatedRect
                        x={xNum + offsetLength}
                        y={barCanvasHeight + 10 - lastHeight}
                        width={rectWidth}
                        height={-rectHight}
                        fill={ColorList[index]}
                    />
                );
                if (stack) {
                    lastHeight = rectHight + lastHeight;
                } else {
                    lastHeight = rectHight;
                }

                numlength = mapItem.data[i].toString().length;
                textX = xNum + rectWidth / 2 - 1 + offsetLength;
                textY = barCanvasHeight + 10 - lastHeight + numlength * preTextWidth / 2;
                textColor = 'white';
                if (numlength * 10 > rectHight) {
                    textY = barCanvasHeight + 4 - lastHeight - numlength * preTextWidth / 2;
                    textColor = 'black';
                }

                if (!stack) {
                    lastHeight = 0;
                }
                barViewList.push(
                    <G rotate="-90" origin={`${textX},${textY + 5}`} >
                        < SvgText
                            fill={textColor}
                            x={textX}
                            y={textY}
                            fontSize="10"
                            textAnchor="middle">{mapItem.data[i + hadedDrawNum * cutApartNum]}</SvgText >
                    </G>
                )
            })
        }
        return barViewList;
    }

    componentWillMount() {
        let { yAxis, xAxis } = this.state;
        if (yAxis.show) {
            this.createYValue();
        }
        if (xAxis.show) {
            this.createXValueTitle()
        }
        this.createLineView();
    }

    createLineView() {
        let { perLength, perInterHeight, valueInterval } = this.state;
        let lineList = [];
        for (let i = 0; i <= valueInterval; i++) {
            lineList.push(<View key={i + 'line'} style={{ height: 1, width: perLength, backgroundColor: '#EEEEEE', marginTop: i == 0 ? 0 : perInterHeight - 1 }} />)
        }
        this.lineView = (
            <View style={{ position: 'absolute', top: 10, right: 0, left: 0 }}>
                {lineList}
            </View>
        )
    }

    createYValue() {
        let { perLength, perInterHeight, maxNum, valueInterval, viewHeight, yAxis } = this.state;
        let valueList = [];
        let valueNum;
        for (let i = 0; i <= valueInterval; i++) {
            valueNum = maxNum * (1 - i / valueInterval);
            valueList.push(<Text key={i + 'yvalue'} numberOfLines={1} style={{ height: 10, width: 30, marginTop: i == 0 ? 5 : perInterHeight - 10, fontSize: 9, lineHeight: 10, textAlign: 'right' }} >{valueNum}</Text>)
        }
        this.yValueView = (
            <View style={{ maxWidth: 40, height: viewHeight, flexDirection: 'row' }}>
                <Text
                    style={{
                        fontSize: 9,
                        width: 10,
                        height: 100,
                        left: 3,
                        textAlign: 'center',
                        position: 'absolute',
                        top: (viewHeight - 140) / 2,
                        textAlignVertical: 'center'
                    }}>{yAxis.name}</Text>
                <View style={{ height: viewHeight, alignItems: 'flex-end', marginLeft: 2, maxWidth: 40, marginRight: 5 }}>
                    {valueList}
                </View>
            </View>)
    }

    createXValueTitle() {
        let { viewWidth, xAxis } = this.state
        this.xValueTitle = <Text style={{
            fontSize: 9,
            width: 100,
            height: 10,
            textAlign: 'center',
            position: 'absolute',
            bottom: 5,
            left: (viewWidth - 50) / 2,
            textAlignVertical: 'center'
        }}>{xAxis.name}</Text>
    }

    clickItemView(i, clickAreWidth, location) {
        let { series } = this.state;
        let newLocation = Object.assign(location, { locationX: (i * clickAreWidth - this.scrollOffX + location.locationX + 40) })
        this.props.showToastView(i, series, newLocation);
    }

    renderPerBarView(index, series, perRectHeight, stack, rectWidth) {
        let perBarList = [];
        let mapItem;
        if (stack) {
            for (let i = series.length - 1; i >= 0; i--) {
                mapItem = series[i];
                perBarList.push(
                    < View key={i + 'listItem'} style={{ backgroundColor: ColorList[i], width: rectWidth, height: mapItem.data[index] * perRectHeight }} />
                )
            }
        } else {
            perBarList = series.map((mapItem, innerIndex) => < View key={innerIndex + 'listItem'} style={{ backgroundColor: ColorList[innerIndex], width: rectWidth, height: mapItem.data[index] * perRectHeight }} />)
        }
        return perBarList;
    }

    renderItem({ item, index }) {
        let { viewHeight, series, perRectHeight, xAxis, perLength, barCanvasHeight, stack, rectNum, rectWidth } = this.state;
        return (
            <TouchableHighlight
                underlayColor='rgba(34,142,230,0.10)'
                onPressIn={(e) => this.clickItemView(index, perLength, e.nativeEvent)}>
                <View style={{ height: viewHeight, width: perLength, backgroundColor: 'white' }}>
                    {this.lineView}
                    <View style={[{ width: perLength, height: barCanvasHeight, alignItems: 'flex-end', paddingLeft: 10, paddingRight: 10, marginTop: 10 }, stack ? itemViewStackStyle : itemViewStyle]}>
                        {this.renderPerBarView(index, series, perRectHeight, stack, rectWidth)}
                    </View>
                    {xAxis.show ? <View style={{ width: perLength, height: 30, justifyContent: 'center', alignItems: 'center' }} >
                        <Text numberOfLines={2} style={{ textAlign: 'center', fontSize: 9, transform: [{ rotateZ: '-45deg' }] }}>{xAxis.data[index]}</Text>
                    </View> : null}
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        let { series, viewHeight, barCanvasHeight, viewWidth, xAxis, yAxis, svgWidth } = this.state;
        let offsetWidth = yAxis.show ? 50 : 20;
        return (
            <View style={[{ flexDirection: 'row', backgroundColor: 'white', paddingLeft: 10 }, this.props.style]}>
                {this.yValueView}
                <View style={{ flex: 0, width: viewWidth - offsetWidth }}>
                    <FlatList
                        data={series[0].data}
                        horizontal={true}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                        onScroll={(e) => {
                            this.scrollOffX = e.nativeEvent.contentOffset.x;
                            this.props.closeToastView();
                        }}
                        ItemSeparatorComponent={() => <View />}
                    />
                </View>
                {this.xValueTitle}
            </View >
        )
    }
}



