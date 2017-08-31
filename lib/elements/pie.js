import React, { Componet } from 'react';
import {
    View,
    Dimensions,
} from 'react-native';

import Svg, {
    Circle,
    Path,
    Rect,
} from 'react-native-svg';

const window = Dimensions.get('window');

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
        this.CalculationDegrees = this.CalculationDegrees.bind(this);
    }


    // onPress
    // onPressIn
    // onPressOut
    // onLongPress
    // delayPressIn
    // delayPressOut
    // delayLongPress

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
            pathViews.push(
                <Path
                    onPress={() => {

                    }}
                    onPressIn={(e) => {
                        {/* alert(Object.keys(e)) */}
                    }}
                    onPressOut={(e) => {
                        alert(Object.keys(e))
                    }}
                    key={index}
                    fill={this.props.colors[index]}
                    d={`M${cx} ${cy},L${xList[index]} ${yList[index]},A${pieR} ${pieR}, 0 ${item > allData / 2 ? '1' : '0'} 0 ${xList[index + 1]},${yList[index + 1]},Z`} />
            )
        });
        return pathViews;
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
