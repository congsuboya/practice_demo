import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Animated,
    Dimensions,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';

import Svg, {
    Line,
    Circle,
    G,
    Path,
    Rect,
    LinearGradient,
    Stop,
    Defs,
    Text as SvgText
} from 'react-native-svg';

import { DrawXYAxisLine, dealWithOption, DrawYXAxisValue, DrawYValueView } from '../chartUtils';

import ToastView from './toastView';

const window = Dimensions.get('window');
import ColorList from '../globalVariable';
const AnimatedRect = Animated.createAnimatedComponent(Rect);
export default class LineChart extends React.Component {


    constructor(props) {
        super(props)
        let { height, width } = props.style;
        let viewHeight = height ? height : 300;
        let viewWidth = width ? width : window.width;
        this.state = {
            viewHeight,
            viewWidth,
            interWidth: props.interWidth,
            valueInterval: props.valueInterval,
            stack: props.option.stack,
            selectIndex: -1,
            ...dealWithOption(viewWidth, viewHeight, props.option, props.valueInterval, true)
        }
        this.clickChart = this.clickChart.bind(this);
        this.renderLineItem = this.renderLineItem.bind(this);
    }

    renderLineItem() {
        let {
             series,
            rectWidth,
            perRectHeight,
            barCanvasHeight,
            interWidth,
            selectIndex,
            svgHeight
        } = this.state;

        let lineViewList = [];
        let pointViewList = [];
        let pointInterWidth = interWidth * 2 + rectWidth;
        let initX = interWidth + rectWidth / 2, pointY;
        let dStr;
        series.map((mapItem, index) => {
            mapItem.data.map((innerItem, innerIndex) => {
                initX = interWidth + rectWidth / 2 + innerIndex * pointInterWidth;
                pointY = barCanvasHeight - innerItem * perRectHeight + 10;
                if (innerIndex == 0) {
                    dStr = `M${initX} ${pointY}`;
                } else {
                    dStr = `${dStr} L${initX} ${pointY}`;
                }
                if (selectIndex == innerIndex) {
                    pointViewList.push(<Circle cx={initX} cy={pointY} r="2.5" fill={ColorList[index]} />)
                }
            });
            lineViewList.push(<Path d={dStr} strokeWidth='1' stroke={ColorList[index]} fill='none' />)
        });
        if (pointViewList.length > 0 && selectIndex > -1) {
            pointViewList.push(<Line key='selectedLine'
                x1={interWidth + rectWidth / 2 + selectIndex * pointInterWidth}
                y1={10}
                x2={interWidth + rectWidth / 2 + selectIndex * pointInterWidth}
                y2={svgHeight}
                stroke="url(#grad)"
                strokeWidth='1' />)
        }

        return lineViewList.concat(pointViewList);
    }

    clickChart(location) {
        let {
            rectWidth,
            interWidth,
            series
       } = this.state;

        let pointInterWidth = interWidth * 2 + rectWidth;
        let clickItemIndex = parseInt(location.locationX / pointInterWidth);
        let newLocation = Object.assign(location, { locationX: location.pageX })
        this.refs.toast.show(clickItemIndex, series, location)
        if (this.state.selectIndex !== clickItemIndex) {
            this.setState({
                selectIndex: clickItemIndex
            })
        }
    }

    render() {
        let { maxNum, series, xAxis, yAxis, valueInterval,
            viewWidth, viewHeight, svgHeight, svgWidth,
            barCanvasHeight, perRectHeight, rectWidth, rectNum, interWidth
            } = this.state;
        return (
            <View style={[{ flexDirection: 'row' }, this.props.style]}>
                {DrawYValueView(valueInterval, barCanvasHeight, viewHeight, maxNum, yAxis)}
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={false}
                    style={{ height: viewHeight, width: viewWidth - 50 }}
                    onScroll={() => {
                        this.refs.toast.hide();
                    }}
                >
                    <View style={{ flex: 1, backgroundColor: 'white', height: viewHeight, width: svgWidth }}>
                        <View style={{ flex: 0, backgroundColor: 'white' }}>
                            < Svg width={svgWidth} height={svgHeight}>
                                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2={svgHeight - 10}>
                                    <Stop offset="0" stopColor="#228EE6" stopOpacity="1" />
                                    <Stop offset="1" stopColor="#3AE8CB" stopOpacity="0.11" />
                                </LinearGradient>
                                {DrawXYAxisLine(barCanvasHeight, svgWidth, true, valueInterval)}
                                {this.renderLineItem()}
                            </Svg>
                        </View>
                        <TouchableWithoutFeedback
                            onPress={(e) => this.clickChart(e.nativeEvent)} >
                            <View style={{ width: svgWidth, height: svgHeight - 10, position: 'absolute', top: 10, right: 0, flexDirection: 'row' }} />
                        </TouchableWithoutFeedback>
                        {DrawYXAxisValue(xAxis, true, svgWidth, rectWidth * rectNum + 2 * interWidth)}
                    </View>
                </ScrollView >

                <Text style={{
                    color: '#8FA1B2',
                    fontSize: 9,
                    height: 20,
                    marginTop: 5,
                    width: 100,
                    position: 'absolute',
                    textAlign: 'center',
                    bottom: -7,
                    right: (viewWidth - 135) / 2
                }}> {xAxis.title ? xAxis.title : 'x轴名称'}</Text >
                <ToastView ref='toast' />
            </View >
        )
    }
}

LineChart.defaultProps = {
    option: {
        "xAxis": {
            "type": "category",
            "title": "机会名称",
            "data": [
                "a阿尔特里亚",
                "b美国电讯",
                "a庞巴迪",
                "c怡安保险",
                "c美国人伯根",
                "g安宝",
                "b永旺",
                "d艾伯森",
                "a阿第克",
                "c安宝",
                "c雅芳产品",
                "c加拿大铝业",
                "c雅培",
                "e美国电话电报无线公司",
                "b荷兰银行",
                "c味之素",
                "a阿西布朗勃法瑞",
                "b美国家庭人寿保险",
                "d旭化成",
                "c阿莫林公司",
                "g雅培",
                "a味之素",
                "a百思买",
                "C机会",
                "c美国运通",
                "e雅培",
                "i安进",
                "d旭硝子",
                "b美国标准公司",
                "a阿海珐",
                "c欧尚",
                "c单化联盟",
                "a埃森哲",
                "i欧尚",
                "b旭硝子",
                "c美国电力",
                "b英杰华",
                "e安进",
                "d亚马逊",
                "d安盛",
                "G机会",
                "a美国电力",
                "a雅芳产品",
                "f安海斯-布希(品牌:百威)",
                "d沃尔沃",
                "c好事达",
                "A机会",
                "b旭化成",
                "e好事达",
                "c阿尔特里亚",
                "g美国电话电报无线公司",
                "b阿塞洛",
                "a波音",
                "a先进微电子器件公司",
                "c美铝公司(美国铝业)",
                "E机会",
                "a加拿大铝业",
                "h安盛",
                "a英美烟草",
                "b艾地盟",
                "a欧尚",
                "c埃森哲",
                "a美国运通",
                "a景顺集团",
                "b安海斯-布希(品牌:百威)",
                "h永旺",
                "b忠利保险",
                "e安宝",
                "a好事达",
                "b阿斯利康",
                "a美铝公司(美国铝业)",
                "f旭化成",
                "b艾伯森",
                "c友达光电",
                "b阿尔卡特",
                "a美一银行",
                "D1机会",
                "g欧尚",
                "a纽约银行",
                "b马士基集团",
                "a邦奇",
                "b阿尔斯通",
                "a南非英美铂业",
                "b布朗-福曼公司",
                "a阿特拉斯科普柯",
                "d英杰华",
                "a爱德万株式会社",
                "a怡安保险",
                "a波兰商业银行",
                "a美国国际集团",
                "b美国南方银行",
                "a阿拉美达赫斯",
                "b雅高集团",
                "c华硕电脑",
                "e欧尚",
                "a单化联盟",
                "a全球人寿保险",
                "a美国人伯根",
                "a友达光电",
                "c阿第克",
                "e阿海珐",
                "d艾地盟",
                "d安泰",
                "c阿海珐",
                "b美利坚公司",
                "a宝马",
                "a阿克苏诺贝尔",
                "b安泰",
                "a贝尔斯登公司",
                "f永旺",
                "b爱信精机",
                "a法航—荷航集团",
                "b伊莱克斯",
                "a雅培",
                "a拜耳",
                "a阿莫林公司",
                "d爱尔康",
                "a巴帝电信",
                "a安宝",
                "b朝日啤酒",
                "c景顺集团",
                "d安海斯-布希(品牌:百威)",
                "a蒙特利尔银行",
                "b安盛",
                "a英美资源集团",
                "f安泰",
                "b亚马逊",
                "b爱尔康",
                "f旭硝子",
                "d阿塞洛",
                "b布依格",
                "b安巴克金融集团",
                "f安盛",
                "a美国电话电报无线公司",
                "i安宝",
                "h安泰",
                "f英杰华",
                "a法国巴黎银行",
                "a百时美施贵宝",
                "c阿达迪斯",
                "a伯克希尔哈撒韦",
                "a安进",
                "a普利司通",
                "a华硕电脑",
                "a毕尔巴鄂比斯开银行",
                "b全美汽车租赁",
                "c安进",
                "a阿达迪斯",
                "g安进",
                "a德国裕宝银行",
                "b希腊银行",
                "d永旺",
                "a中银香港",
                "D3机会",
                "b沃尔沃",
                "c美国电话电报无线公司",
                "e艾地盟",
                "a安泰",
                "g安泰",
                "b阿克苏诺贝尔",
                "b欧尚",
                "a联合商业银行",
                "b美国国际集团",
                "b阿尔特里亚",
                "g安海斯-布希(品牌:百威)",
                "e旭化成",
                "a布哈拉特石油",
                "b阿莫林公司",
                "D2机会",
                "b英美资源集团",
                "b阿达迪斯",
                "a百特国际",
                "a巴克莱银行",
                "a爱尔康",
                "a巴西银行",
                "b先进微电子器件公司",
                "b加拿大铝业",
                "i安盛",
                "a阿尔卡特",
                "a美国电讯",
                "a桑坦德银行",
                "a亚马逊",
                "c雅高集团",
                "a沃尔沃",
                "b阿特拉斯科普柯",
                "b阿拉美达赫斯",
                "b美国电力",
                "f美国电话电报无线公司",
                "d味之素",
                "c希腊银行",
                "b友达光电",
                "b好事达",
                "c安盛",
                "a朝日啤酒",
                "a奥地利国际银行",
                "a英国电信",
                "a安盛",
                "c英杰华",
                "h欧尚",
                "a英杰华",
                "e亚马逊",
                "b安进",
                "h安进",
                "b阿海珐",
                "c艾地盟",
                "a安海斯-布希(品牌:百威)",
                "c旭硝子",
                "a意大利维罗纳银行",
                "b爱德万株式会社",
                "e永旺",
                "c阿尔斯通",
                "d安进",
                "b邦奇",
                "e旭硝子",
                "a美国家庭人寿保险",
                "c美国电讯",
                "a美利坚公司",
                "b波音",
                "b美国人伯根",
                "a布朗-福曼公司",
                "c旭化成",
                "h安宝",
                "a南贝尔",
                "b华硕电脑",
                "b美铝公司(美国铝业)",
                "c永旺",
                "c阿斯利康",
                "a英国航空",
                "f安宝",
                "f雅培",
                "e艾伯森",
                "b阿第克",
                "a艾地盟",
                "a巴斯夫",
                "a中国银行",
                "a阿尔斯通",
                "a安东维内达银行",
                "f安进",
                "b法航—荷航集团",
                "a雅高集团",
                "c荷兰银行",
                "D机会",
                "b味之素",
                "c安泰",
                "b宝马",
                "a美国标准公司",
                "a永旺",
                "d美国电话电报无线公司",
                "a全美汽车租赁",
                "c忠利保险",
                "a美国南方银行",
                "d好事达",
                "B2机会",
                "a马士基集团",
                "e安海斯-布希(品牌:百威)",
                "b雅芳产品",
                "c艾伯森",
                "c朝日啤酒",
                "d雅培",
                "d阿海珐",
                "a艾伯森",
                "d埃森哲",
                "a加拿大贝尔电子",
                "c安海斯-布希(品牌:百威)",
                "a旭硝子",
                "c伊莱克斯",
                "a希腊银行",
                "a贝塔斯曼",
                "c爱信精机",
                "a安巴克金融集团",
                "c爱尔康",
                "e爱尔康",
                "B机会",
                "b景顺集团",
                "g安盛",
                "d安宝",
                "b单化联盟",
                "a忠利保险",
                "c阿塞洛",
                "b南非英美铂业",
                "e英杰华",
                "a伊莱克斯",
                "e阿塞洛",
                "b安宝",
                "b全球人寿保险",
                "b埃森哲",
                "a爱信精机",
                "b雅培",
                "b美国运通",
                "a博思格集团",
                "c沃尔沃",
                "c美利坚公司",
                "e安盛",
                "b阿西布朗勃法瑞",
                "a澳洲布莱堡工业集团",
                "a阿塞洛",
                "d阿第克",
                "e安泰",
                "f欧尚",
                "f阿海珐",
                "g永旺",
                "b怡安保险",
                "c阿尔卡特",
                "a美国银行",
                "F销售机会",
                "a荷兰银行",
                "b美国电话电报无线公司",
                "a巴伐利亚银行",
                "c亚马逊",
                "a阿斯利康",
                "a旭化成",
                "a布依格",
                "b拜耳",
                "d欧尚"
            ]
        },
        "yAxis": {
            "type": "value",
            "title": "销售金额"
        },
        "series": [
            {
                "name": 1,
                "data": [
                    33319,
                    67663,
                    16633,
                    47485,
                    177382,
                    37905,
                    118649,
                    105319,
                    89988,
                    157102,
                    15767,
                    141290,
                    148284,
                    19671,
                    37961,
                    17344,
                    125944,
                    36452,
                    124402,
                    45184,
                    122219,
                    59879,
                    196606,
                    150000,
                    68395,
                    182358,
                    90131,
                    63066,
                    175323,
                    60522,
                    58273,
                    138896,
                    65169,
                    27489,
                    87095,
                    173455,
                    197882,
                    23452,
                    138885,
                    179255,
                    170000,
                    20551,
                    129999,
                    104086,
                    139389,
                    195048,
                    300000,
                    181348,
                    191575,
                    185547,
                    33928,
                    171114,
                    124590,
                    22169,
                    50456,
                    35000000,
                    58443,
                    159369,
                    12087,
                    174709,
                    61455,
                    70009,
                    55215,
                    79427,
                    197969,
                    107426,
                    44586,
                    162683,
                    57031,
                    59590,
                    142073,
                    25560,
                    98877,
                    17118,
                    33764,
                    138395,
                    120000,
                    53306,
                    101073,
                    107135,
                    187290,
                    199151,
                    54548,
                    154471,
                    79053,
                    16608,
                    169179,
                    158040,
                    104621,
                    194466,
                    134148,
                    136924,
                    34319,
                    185031,
                    167737,
                    183864,
                    52949,
                    45248,
                    177536,
                    192250,
                    103184,
                    38715,
                    189519,
                    70651,
                    28009,
                    47910,
                    20946,
                    31279,
                    141214,
                    28106,
                    65303,
                    162024,
                    32783,
                    87747,
                    183421,
                    188756,
                    76951,
                    195206,
                    180852,
                    22442,
                    44542,
                    169322,
                    31712,
                    175986,
                    78633,
                    119816,
                    32857,
                    92067,
                    17005,
                    162387,
                    107403,
                    34390,
                    184149,
                    57386,
                    103020,
                    13117,
                    184453,
                    196937,
                    22324,
                    65603,
                    144807,
                    114084,
                    192091,
                    121490,
                    140026,
                    37718,
                    165989,
                    50699,
                    133061,
                    126373,
                    187195,
                    38259,
                    64258,
                    70000,
                    147597,
                    110313,
                    101203,
                    154269,
                    77341,
                    55334,
                    75966,
                    23138,
                    95614,
                    142457,
                    100990,
                    21443,
                    135847,
                    82620,
                    90000,
                    37985,
                    18801,
                    79236,
                    136928,
                    14229,
                    129405,
                    35078,
                    188941,
                    157879,
                    36477,
                    75854,
                    170080,
                    24027,
                    157645,
                    78342,
                    189480,
                    152434,
                    77688,
                    172472,
                    169541,
                    154864,
                    137335,
                    68249,
                    52351,
                    113426,
                    87195,
                    16423,
                    143044,
                    106895,
                    39385,
                    94698,
                    92651,
                    30408,
                    167799,
                    37405,
                    131442,
                    146391,
                    85991,
                    130584,
                    57334,
                    33949,
                    19012,
                    185231,
                    194016,
                    11817,
                    82882,
                    191210,
                    184183,
                    16340,
                    165492,
                    168052,
                    190333,
                    192189,
                    181774,
                    61761,
                    45534,
                    190275,
                    62594,
                    93197,
                    102617,
                    117145,
                    129146,
                    172487,
                    47911,
                    32677,
                    19577,
                    139276,
                    78694,
                    50633,
                    52335,
                    191891,
                    197192,
                    60000,
                    197184,
                    30965,
                    188498,
                    77078,
                    177100,
                    45731,
                    38536,
                    135621,
                    58725,
                    26647,
                    700000,
                    101338,
                    190323,
                    41862,
                    51016,
                    121798,
                    41098,
                    134198,
                    170075,
                    90530,
                    26915,
                    127378,
                    24858,
                    147452,
                    49118,
                    102310,
                    17200,
                    11833,
                    181082,
                    174353,
                    500000,
                    161721,
                    159833,
                    115951,
                    120729,
                    32785,
                    30884,
                    145106,
                    142139,
                    70731,
                    123999,
                    18284,
                    195083,
                    16216,
                    124355,
                    165141,
                    179528,
                    115786,
                    176824,
                    167053,
                    68995,
                    73929,
                    24541,
                    118860,
                    172981,
                    136246,
                    179955,
                    65160,
                    161529,
                    106325,
                    30301,
                    112049,
                    62000,
                    75077,
                    189214,
                    109516,
                    183525,
                    148244,
                    41506,
                    49517,
                    106291,
                    45836
                ]
            }
        ],
        "stack": false
    },
    valueInterval: 3,
    style: { height: 400, width: window.width },
    interWidth: 10
}