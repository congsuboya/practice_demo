import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Animated,
    ScrollView,
    Text,
    TouchableHighlight,
    FlatList,
    Platform
} from 'react-native';

const window = Dimensions.get('window');
import ColorList from '../globalVariable';

import { DrawXYAxisLine, DrawYXAxisValue, DrawXValueView, dealwithNum } from '../chartUtils';
import { fromJS, is } from 'immutable';
import NativeBar from './nativeBar';

export default class VerticalBar extends React.Component {

    constructor(props) {
        super(props)
        this.viewAnimatedList = [];
        this.clickItemView = this.clickItemView.bind(this);
        this.renderPerBarView = this.renderPerBarView.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.createXValue = this.createXValue.bind(this);
        this.createOffsetLineView = this.createOffsetLineView.bind(this);
        this.lineView = null;
        this.yValueTitle = null;
        this.scrollOffY = 0;
        this.xValueHeight = 10;
        this.offsetLineView = null;
    }

    componentWillMount() {
        let { yAxis, xAxis, offsetLength } = this.props;
        if (yAxis.show && yAxis.name) {
            this.createYValueTitle(this.props);
        }
        if (xAxis.show) {
            this.createXValue(this.props)
        }
        this.createLineView(this.props);
        if (offsetLength > 0) {
            this.createOffsetLineView(this.props);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (is(fromJS(nextProps), fromJS(this.props))) {
            return false
        }
        return true;
    }

    componentWillReceiveProps(nextProps) {
        if (!is(fromJS(nextProps), fromJS(this.props))) {
            let { yAxis, xAxis } = nextProps;
            if (yAxis.show) {
                this.createYValueTitle(nextProps);
            }
            if (xAxis.show) {
                this.createXValue(nextProps)
            }
            this.createLineView(nextProps);
        }
    }


    createYValueTitle(props) {
        let { viewHeight, yAxis } = props
        this.yValueTitle = <Text
            style={{
                fontSize: 9,
                maxWidth: 10,
                textAlign: 'center',
                textAlignVertical: 'center',
                alignSelf: 'center'
            }}>{yAxis.name}</Text>
    }

    createXValue(props) {
        let { perLength, perInterLength, maxNum, valueInterval, viewHeight, xAxis, viewWidth, yAxis, plusNumInterval, negaNumInterval } = props;
        let valueList = [];
        let valueNum;
        for (let i = negaNumInterval; i > 0; i--) {
            valueNum = -(maxNum * i / valueInterval);
            valueList.push(<Text key={i + 'negaNum'} numberOfLines={1} style={{ height: 10, width: 30, marginLeft: i == negaNumInterval ? 0 : perInterLength - 30, fontSize: 9, lineHeight: 10, textAlign: 'center' }} >{dealwithNum(valueNum.toString())}</Text>)
        }
        valueList.push(<Text key={'zeroline'} numberOfLines={1} style={{ height: 10, width: 30, marginLeft: negaNumInterval <= 0 ? 0 : perInterLength - 30, fontSize: 9, lineHeight: 10, textAlign: 'center' }} >0</Text>)

        for (let i = 1; i <= plusNumInterval; i++) {
            valueNum = maxNum * i / valueInterval;
            valueList.push(<Text key={i + 'yvalue'} numberOfLines={1} style={{ height: 10, width: 30, marginLeft: perInterLength - 30, fontSize: 9, lineHeight: 10, textAlign: 'center' }} >{dealwithNum(valueNum.toString())}</Text>)
        }
        let marginLeft = 25
        if (yAxis.show && yAxis.name) {
            marginLeft = 35
        } else if (!yAxis.show) {
            marginLeft = -5
        }
        this.xValueView = (
            <View
                onLayout={(e) => this.xValueHeight = e.nativeEvent.layout.height}
                style={{ width: viewWidth, maxHeight: 30, paddingBottom: 5 }}>
                <View style={{ alignItems: 'flex-start', flexDirection: 'row', marginLeft: marginLeft, paddingTop: 2 }}>
                    {valueList}
                </View>
                <Text
                    style={{
                        fontSize: 9,
                        width: 100,
                        textAlign: 'center',
                        marginLeft: (viewWidth - 155) / 2 + 40,
                        textAlignVertical: 'center'
                    }}>{xAxis.name}</Text>
            </View>
        )
    }


    createOffsetLineView(props) {
        let { perLength, perInterLength, valueInterval, negaNumInterval, offsetLength, plusNumInterval, yAxis } = props;
        let lineList = [];
        for (let i = 0; i <= (plusNumInterval + negaNumInterval); i++) {
            lineList.push(<View key={i + 'line'} style={{ height: offsetLength, width: 1, backgroundColor: '#EEEEEE', marginLeft: i == 0 ? 0 : perInterLength - 1 }} />)
        }
        this.offsetLineView = (
            <View style={{ marginLeft: yAxis.show ? 40 : 10, flexDirection: 'row' }}>
                {lineList}
            </View>
        )
    }


    clickItemView(i, clickAreHeight, location) {
        let { series, barCanvasHeight } = this.props;
        let newLocation = Object.assign(location, { locationY: (i * clickAreHeight - this.scrollOffY + location.locationY + 10) }, { locationX: location.locationX + 50 })
        this.props.showToastView(i, series, newLocation, barCanvasHeight);
    }

    clickNativeItemView(i, clickAreHeight, location) {
        let { series, barCanvasHeight } = this.props;
        let newLocation = Object.assign(location, { locationY: (location.locationY + clickAreHeight / 2) }, { locationX: location.locationX })
        this.props.showToastView(i, series, newLocation, barCanvasHeight);
    }

    createLineView(props) {
        let { perLength, perInterLength, valueInterval, yAxis, negaNumInterval, plusNumInterval } = props;
        let lineList = [];
        for (let i = 0; i <= (negaNumInterval + plusNumInterval); i++) {
            lineList.push(<View key={i + 'line'} style={{ height: perLength, width: 1, backgroundColor: '#EEEEEE', marginLeft: i == 0 ? 0 : perInterLength - 1 }} />)
        }
        this.lineView = (
            <View style={{ position: 'absolute', top: 0, right: 10, left: yAxis.show ? 40 : 10, flexDirection: 'row' }}>
                {lineList}
            </View>
        )
    }



    renderPerBarView(index, series, perRectHeight, stack, rectWidth, negaNumInterval, perInterLength) {
        let perBarList = [];
        let negaNumIntList = [];
        let mapItem;
        let barWidth = 0;
        let marginLef = negaNumInterval * perInterLength;
        let barView = null;
        if (stack) {
            for (let innerIndex = series.length - 1; innerIndex >= 0; innerIndex--) {
                mapItem = series[innerIndex];
                barWidth = Math.abs(mapItem.data[index]) * perRectHeight;
                barView = < View
                    key={innerIndex + 'listItem'}
                    pointerEvents='none'
                    style={{
                        backgroundColor: ColorList[innerIndex % ColorList.length],
                        width: barWidth,
                        height: rectWidth
                    }} />;
                if (mapItem.data[index] < 0) {
                    marginLef = marginLef - barWidth;
                    negaNumIntList.push(barView)
                } else {
                    perBarList.unshift(barView);
                }
            }
            if (marginLef > 0) {
                negaNumIntList.unshift(< View
                    key={'emptylistItem'}
                    pointerEvents='none'
                    style={{
                        width: marginLef,
                        height: rectWidth
                    }} />)
            }
            perBarList = negaNumIntList.concat(perBarList);
        } else {
            series.map((mapItem, innerIndex) => {
                marginLef = negaNumInterval * perInterLength;
                barWidth = Math.abs(mapItem.data[index]) * perRectHeight
                if (mapItem.data[index] < 0) {
                    marginLef = marginLef - barWidth;
                }
                perBarList.push(< View
                    key={innerIndex + 'listItem'}
                    pointerEvents='none'
                    style={{
                        backgroundColor: ColorList[innerIndex % ColorList.length],
                        width: barWidth,
                        height: rectWidth,
                        marginLeft: marginLef
                    }} />)
            });
        }
        return perBarList;
    }

    renderItem({ item, index }) {
        let { viewHeight, series, perRectHeight, xAxis, perLength, barCanvasHeight,
            stack, rectNum, yAxis, viewWidth, rectWidth, perInterLength, negaNumInterval } = this.props;
        return (
            <View style={{ flex: 0, height: perLength, flexDirection: 'row', width: viewWidth - 10 }}>
                {yAxis.show ? <Text numberOfLines={1} style={[{ textAlign: 'right', fontSize: 9, width: 40, height: perLength, textAlignVertical: 'center', paddingRight: 5 }, Platform.OS == 'ios' ? { paddingTop: (perLength - 10) / 2 } : {}]}>{yAxis.data[index]}</Text>
                    : <View style={{ width: 10 }} />}
                {this.lineView}
                <TouchableHighlight
                    underlayColor='rgba(34,142,230,0.10)'
                    onPressIn={(e) => this.clickItemView(index, perLength, e.nativeEvent)}>
                    <View style={[{ width: barCanvasHeight, height: perLength, alignItems: 'flex-start', paddingBottom: 10, paddingTop: 10 }, stack ? { flexDirection: 'row' } : {}]}>
                        {this.renderPerBarView(index, series, perRectHeight, stack, rectWidth, negaNumInterval, perInterLength)}
                    </View>
                </TouchableHighlight>
            </View>
        )
    }



    render() {
        let { maxNum, series, xAxis, yAxis, valueInterval, intervalNum, viewWidth, viewHeight, perLength,
            barCanvasHeight, perRectHeight, rectWidth, rectNum, interWidth, offsetLength } = this.props;
        this.xValueHeight = xAxis.show ? (this.xValueHeight + 25) : 20;
        return (
            < View style={[{ flexDirection: 'column', backgroundColor: 'white', paddingTop: 10 }, this.props.style]} >
                <View style={{ flexDirection: 'row', flex: 0 }}>
                    {this.yValueTitle}
                    <View style={{ flex: 0, height: viewHeight - this.xValueHeight }}>
                        {this.offsetLineView}
                        {true ?
                            <FlatList
                                data={yAxis.data}
                                alwaysBounceVertical={false}
                                horizontal={false}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => index}
                                onScroll={(e) => {
                                    this.scrollOffY = e.nativeEvent.contentOffset.y;
                                    this.props.closeToastView();
                                }}
                                getItemLayout={(data, index) => ({ length: perLength, offset: perLength * index, index })}
                            />
                            : <NativeBar style={{ marginLeft: 14, height: viewHeight - offsetHeight }}
                                option={{
                                    ...this.props
                                }}
                                rnOnScroll={(e) => {
                                    this.props.closeToastView();
                                }}
                                onClickItem={(e) => this.clickNativeItemView(e.nativeEvent.position, perLength, e.nativeEvent)}
                            />}
                        {this.offsetLineView}
                    </View>
                </View>
                {this.xValueView}
            </View >
        )
    }
}

