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

const startRadius = -Math.PI / 2;

export default class Doughnut extends React.Component {

    static defaultProps = {
        pieData: [10, 20, 40],
        style: { height: 300, width: window.width },
        pieR: 100
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
            cy: svgHeight / 2,
            rotateAnimation: 0.1
        }
        this.viewAnimatedList = [];
        this.drawPieSegments = this.drawPieSegments.bind(this);
    }

    componentWillMount() {

    }

    drawPieSegments(Data) {
        let dataSum = Data.sum();
        let cutoutRadius = this.props.pieR - 20;
        let doughnutViewList = [];
        //draw each path
        Data.map((item, index) => {
            let segmentAngle = ((item / dataSum) * (Math.PI * 2)),
                endRadius = startRadius + segmentAngle,
                largeArc = ((endRadius - startRadius) % (Math.PI * 2)) > Math.PI ? 1 : 0,
                startX = this.state.cx + Math.cos(startRadius) * this.props.pieR,
                startY = this.state.cy + Math.sin(startRadius) * this.props.pieR,
                endX2 = this.state.cx + Math.cos(startRadius) * cutoutRadius,
                endY2 = this.state.cy + Math.sin(startRadius) * cutoutRadius,
                endX = this.state.cx + Math.cos(endRadius) * this.props.pieR,
                endY = this.state.cy + Math.sin(endRadius) * this.props.pieR,
                startX2 = this.state.cx + Math.cos(endRadius) * cutoutRadius,
                startY2 = this.state.cy + Math.sin(endRadius) * cutoutRadius;

            let cmd = [
                'M', startX, startY,
                'A', this.props.pieR, this.props.pieR, 0, largeArc, 1, endX, endY,
                'L', startX2, startY2,
                'A', cutoutRadius, cutoutRadius, 0, largeArc, 0, endX2, endY2,
                'Z'
            ];


            let startX1 = this.state.cx + Math.cos(startRadius) * 20,
                startY1 = this.state.cy + Math.sin(startRadius) * 20,
                endX21 = this.state.cx + Math.cos(startRadius) * 0,
                endY21 = this.state.cy + Math.sin(startRadius) * 0,
                endX1 = this.state.cx + Math.cos(endRadius) * 20,
                endY1 = this.state.cy + Math.sin(endRadius) * 20,
                startX21 = this.state.cx + Math.cos(endRadius) * 0,
                startY21 = this.state.cy + Math.sin(endRadius) * 0;


            let initCmd = [
                'M', startX1, startY1,
                'A', 20, 20, 0, largeArc, 1, endX1, endY1,
                'L', startX21, startY21,
                'A', 0, 0, 0, largeArc, 0, endX21, endY21,
                'Z'
            ]

            console.log('srfewrew', cmd.join(' '));
            console.log('srfewrew-init', initCmd.join(' '));


            this.viewAnimatedList[index] = new Animated.Value(0);
            let itemAnimated = this.viewAnimatedList[index].interpolate({
                inputRange: [
                    0,
                    100
                ],
                outputRange: [
                    initCmd.join(' '),
                    cmd.join(' '),
                ]
            })

            doughnutViewList.push(<AnimatedPath
                key={index}
                fill={ColorList[index]}
                d={itemAnimated} />);
            startRadius += segmentAngle;
        });
        return doughnutViewList;
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
                    {this.drawPieSegments(this.props.pieData)}
                </Svg>
            </View>
        )
    }
}
