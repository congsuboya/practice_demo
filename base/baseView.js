import React, { Component } from 'react';
import {
    View,
    PanResponder
} from 'react-native';

export default class BaseView extends React.Component {
    static defaultProps = {
        viewStyle: { width: 150, height: 150, backgroundColor: 'pink' },
        children: null
    }

    constructor(props) {
        super(props)
        this.state = {
            top: 0,
            left: 0
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => false,
            onPanResponderGrant: () => {
                this._top = this.state.top
                this._left = this.state.left
                this.setState({ bg: 'red' })
            },
            onPanResponderMove: (evt, gs) => {
                console.log(gs.dx + ' ' + gs.dy)
                this.setState({
                    top: this._top + gs.dy,
                    left: this._left + gs.dx
                })
            },
            onPanResponderRelease: (evt, gs) => {
                this.setState({
                    bg: 'white',
                    top: this._top + gs.dy,
                    left: this._left + gs.dx
                })
            }
        })
    }

    render() {
        return (
            <View
                {...this._panResponder.panHandlers}
                style={[this.props.viewStyle, {
                    'top': this.state.top,
                    'left': this.state.left
                }]}
                children={this.props.children} />
        )
    }
}