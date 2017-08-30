import React, { Component } from 'react';
import {
    View,
    TextInput,
    Button,
    Slider,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

import Svg, {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop,
    TextPath,
    TSpan,
    Text,
    ClipPath
} from 'react-native-svg';


export default class PieChartDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cx: width * 0.5,
            cy: height * 0.25,
            r: 100,
            startAngle: 0,
            dataNumOne: 30,
            dataNumTwo: 60,
            dataNumThree: 80,
            allData: 170
        }
        this.CalculationDegrees = this.CalculationDegrees.bind(this);
    }

    CalculationDegrees() {
        let pathViews = [];
        let { cx, cy, r, startAngle, dataNumOne, dataNumThree, dataNumTwo, allData } = this.state;
        let deg1 = 360 * (dataNumOne / allData) + startAngle;
        let deg2 = 360 * (dataNumTwo / allData) + deg1;
        let deg3 = 360 * (dataNumThree / allData) + deg2;

        console.log('iouoiuoiuwr', deg1, deg2, deg3);

        let x0 = cx + r * Math.cos(startAngle * Math.PI / 180);
        let y0 = cy - r * Math.sin(startAngle * Math.PI / 180);

        let x1 = cx + r * Math.cos(deg1 * Math.PI / 180);
        let y1 = cy - r * Math.sin(deg1 * Math.PI / 180);

        let x2 = cx + r * Math.cos(deg2 * Math.PI / 180);
        let y2 = cy - r * Math.sin(deg2 * Math.PI / 180);

        let x3 = cx + r * Math.cos(deg3 * Math.PI / 180);
        let y3 = cy - r * Math.sin(deg3 * Math.PI / 180);

        pathViews.push(<Path key="test1" fill="#fe0" d={`M${cx} ${cy},L${x0} ${y0},A${r} ${r}, 0 ${dataNumOne > allData / 2 ? '1' : '0'} 0 ${x1},${y1},Z`} />)
        pathViews.push(<Path key="test2" fill="#0a0" d={`M${cx} ${cy},L${x1} ${y1},A${r} ${r}, 0 ${dataNumTwo > allData / 2 ? '1' : '0'} 0 ${x2},${y2},Z`} />)
        pathViews.push(<Path key="test3" fill="#e00" d={`M${cx} ${cy},L${x2} ${y2},A${r} ${r}, 0 ${dataNumThree > allData / 2 ? '1' : '0'} 0 ${x3},${y3},Z`} />)

        return pathViews;
    }

    render() {
        let { dataNumOne, dataNumThree, dataNumTwo } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }} >
                <View style={{ height: height * 0.6 }}>
                    <Svg height={height * 0.5 + ''} width={width + ''}>
                        {this.CalculationDegrees()}
                    </Svg>
                </View>
                <View style={{ width: width, alignItems: 'center', height: 150 }}>
                    <Slider
                        key='1'
                        value={dataNumOne}
                        style={{ width: 250 }}
                        minimumTrackTintColor={'#fe0'}
                        maximumValue={100}
                        minimumValue={0}
                        onValueChange={(value) => {
                            this.setState({
                                dataNumOne: value,
                                allData: value + dataNumTwo + dataNumThree
                            })
                        }} />
                    <Slider
                        key='2'
                        value={dataNumTwo}
                        style={{ width: 250 }}
                        minimumTrackTintColor={'#0a0'}
                        maximumValue={100}
                        minimumValue={0}
                        onValueChange={(value) => {
                            this.setState({
                                dataNumTwo: value,
                                allData: value + dataNumOne + dataNumThree
                            })
                        }} />
                    <Slider
                        key='3'
                        value={dataNumThree}
                        style={{ width: 250 }}
                        minimumTrackTintColor={'#e00'}
                        maximumValue={100}
                        minimumValue={0}
                        onValueChange={(value) => {
                            this.setState({
                                dataNumThree: value,
                                allData: value + dataNumTwo + dataNumOne
                            })
                        }} />
                </View>
                <View style={{ width: 100 }}>
                    <Button
                        style={{ width: 100 }}
                        onPress={() => {
                            this.setState({
                                dataNumOne: 30,
                                dataNumTwo: 60,
                                dataNumThree: 80,
                                allData: 170
                            })
                        }}
                        title="重置"
                    />
                </View>
            </View>
        )
    }

}
