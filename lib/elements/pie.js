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
let AnimatedG = Animated.createAnimatedComponent(G);


export default class Pie extends React.Component {

    constructor(props) {
        super(props);
        super(props);
        let { height, width } = props.style;
        let viewHeight = height ? height : 300;
        let viewWidth = width ? width : window.width;
        let pieData = props.option.series[0].data;
        let svgCanvasHeight = viewHeight < viewWidth ? viewHeight : viewWidth;
        let pieR = (svgCanvasHeight - 5) / 22 * 10;
        let bigPieR = pieR * 1.1;

        let sum = 0;
        pieData.map((item, index) => {
            sum += item.value;
        })
        this.state = {
            selectedIndex: null,
            viewHeight,
            viewWidth,
            pieR,
            sum,
            bigPieR,
            pieData: pieData,
            interNum: pieData.length,
            svgCanvasHeight,
            ...props.option
        }
        this.pieItemViewList = [];
        this.viewAnimatedList = [];
        this.renderPieItemView = this.renderPieItemView.bind(this);
        this.clickItemView = this.clickItemView.bind(this)
    }

    componentWillMount() {

    }

    renderPieItemView() {
        let { pieR, pieData, svgCanvasHeight, sum, bigPieR } = this.state;
        let pathViews = [];
        let cx = svgCanvasHeight / 2;
        let cy = svgCanvasHeight / 2;
        let pieDeg = 0;
        let xList = [cx];
        let yList = [(cy - pieR)];

        let xBigList = [cx];
        let yBigList = [(cy - bigPieR)];
        let radian = 0;
        pieData.map((item, index) => {
            pieDeg = 360 * (item.value / sum) + pieDeg;

            radian = pieDeg * Math.PI / 180;
            xList.push(cx + pieR * Math.sin(radian));
            yList.push(cy - pieR * Math.cos(radian));

            xBigList.push(cx + bigPieR * Math.sin(radian));
            yBigList.push(cy - bigPieR * Math.cos(radian));

            this.viewAnimatedList[index] = new Animated.Value(0);
            let itemAnimated = this.viewAnimatedList[index].interpolate({
                inputRange: [
                    0,
                    100
                ],
                outputRange: [
                    1,
                    1.1
                ]
            });
            pathViews.push(
                <AnimatedG
                    scale={1}
                    origin={`${cx},${cy}`}
                >
                    <Path
                        onPress={() => this.clickItemView(index)}
                        key={index}
                        fill={ColorList[index]}
                        d={`M${cx} ${cy},L${xList[index]} ${yList[index]},A${pieR} ${pieR}, 0 ${360 * (item.value / sum) > 180 ? '1' : '0'} 1 ${xList[index + 1]},${yList[index + 1]} Z`} />
                </AnimatedG>
            )
        });
        this.pieItemViewList = pathViews;
        return pathViews;

    }

    clickItemView(index) {
        alert(index);
        Animated.spring(
            this.viewAnimatedList[index],
            {
                toValue: 100,
                tension: 35,
                duration: 5000,
            }
        ).start();
    }



    componentDidMount() {
        // this.viewAnimatedList.map((item, index) => {
        //     Animated.spring(
        //         item,
        //         {
        //             toValue: 100,
        //             tension: 35,
        //             duration: 5000,
        //         }
        //     ).start();
        // })
    }


    render() {
        let { svgCanvasHeight } = this.state;
        return (
            <View style={[{ alignItems: 'center' }, this.props.style]}>
                <View style={{ flex: 0 }}>
                    <Svg height={svgCanvasHeight} width={svgCanvasHeight}>
                        {this.renderPieItemView()}
                    </Svg>
                </View>
            </View>
        )
    }
}


Pie.defaultProps = {
    option: {
        series: [
            {
                name: '扇形图',
                type: 'funnel',
                data: [
                    { value: 60, name: '访问' },
                    { value: 30, name: '咨询' },
                    { value: 10, name: '订单' },
                    { value: 80, name: '点击' },
                    { value: 100, name: '展现' }
                ]
            },
        ]
    },
    style: { height: 400, width: window.width }
};
