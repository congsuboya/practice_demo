import React, { Componet } from 'react';
import {
    View,
    Dimensions,
    Animated,
    NativeModules,
    LayoutAnimation
} from 'react-native';

import Svg, {
    Circle,
    Path,
    Rect,
    G
} from 'react-native-svg';
const window = Dimensions.get('window');

import ColorList from '../globalVariable';

let AnimatedPath = Animated.createAnimatedComponent(Path);


export default class Pie extends React.Component {

    static defaultProps = {
        pieData: [10, 20, 30],
        style: { height: 300, width: window.width },
        pieR: 100,
        colors: ['#fe0', '#0a0', '#e00']
    }

    constructor(props) {
        super(props);
        let { height, width } = props.style;
        let svgHeight = height ? height : 300;
        let svgWidth = width ? width : window.width;
        this.state = {
            svgHeight,
            svgWidth,
            cx: svgWidth / 2,
            cy: svgHeight / 2
        }
        this.viewAnimatedList = [];
        this.CalculationDegrees = this.CalculationDegrees.bind(this);
    }

    componentWillMount() {

    }

    CalculationDegrees(pieData, pieR) {
        let pathViews = [];
        let { cx, cy } = this.state;
        let allData = pieData.sum();
        let pieDeg = 0;
        let xList = [];
        let yList = [];
        xList.push(cx + pieR * Math.cos(pieDeg * Math.PI / 180));
        yList.push(cy - pieR * Math.sin(pieDeg * Math.PI / 180));
        pieData.map((item, index) => {
            pieDeg = 360 * (item / allData) + pieDeg;
            xList.push(cx + pieR * Math.cos(pieDeg * Math.PI / 180));
            yList.push(cy - pieR * Math.sin(pieDeg * Math.PI / 180));

            this.viewAnimatedList[index] = new Animated.Value(0);
            let itemAnimated = this.viewAnimatedList[index].interpolate({
                inputRange: [
                    0,
                    100
                ],
                outputRange: [
                    `M${cx} ${cy},L${cx} ${cy},A0 0, 0 ${item > allData / 2 ? '1' : '0'} 0 ${cx},${cy},Z`,
                    `M${cx} ${cy},L${xList[index]} ${yList[index]},A${pieR} ${pieR}, 0 ${item > allData / 2 ? '1' : '0'} 0 ${xList[index + 1]},${yList[index + 1]},Z`,
                ]
            })
            pathViews.push(
                <AnimatedPath
                    key={index}
                    fill={ColorList[index]}
                    d={itemAnimated} />
            )
        });
        return pathViews;
    }

    componentDidMount() {
        this.viewAnimatedList.map((item, index) => {
            Animated.spring(
                item,
                {
                    toValue: 100,
                    tension: 35,
                    duration: 5000,
                }
            ).start();
        })
    }


    render() {
        return (
            <View style={[{ alignItems: 'center' }, this.props.style]}>
                <Svg height={this.state.svgHeight + ''} width={this.state.svgWidth + ''}>
                    {this.CalculationDegrees(this.props.pieData, this.props.pieR)}
                </Svg>
            </View>
        )
    }
}
