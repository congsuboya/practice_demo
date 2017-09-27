import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';


export default class Home extends Component {

    constructor(props) {
        super(props);
        this._onPressReset = this._onPressReset.bind(this);
        this._onPressStart = this._onPressStart.bind(this);
        this._onPressStop = this._onPressStop.bind(this);

    }

    _onPressReset() {
        this.props.actions.reset(this.props.componentID);
    }

    _onPressStart() {
        this.props.actions.start(this.props.componentID);
    }

    _onPressStop() {
        this.props.actions.stop(this.props.componentID);
    }

    render() {
        const { state } = this.props;
        let seconds = this.props.state.getIn(['instances', this.props.componentID, 'seconds']);
        let runStatus = this.props.state.getIn(['instances', this.props.componentID, 'runStatus']);
        console.log('oopipwoir', this.props)
        return (
            <View style={{ width: 200, height: 200, alignItems: 'center', alignSelf: 'center' }}>
                <Text style={[{ fontSize: 50, marginBottom: 30 }, { color: runStatus ? 'blue' : 'black' }]}>{seconds}</Text>
                <TouchableOpacity style={{ margin: 10, backgroundColor: 'yellow' }} onPress={this._onPressReset}>
                    <Text>重置</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ margin: 10, backgroundColor: 'yellow' }} onPress={this._onPressStart}>
                    <Text>开始</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ margin: 10, backgroundColor: 'yellow' }} onPress={this._onPressStop}>
                    <Text>停止</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


