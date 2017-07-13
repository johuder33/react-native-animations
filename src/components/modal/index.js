import React, { Component } from 'react'
import { Modal, StyleSheet, View } from 'react-native';
import Periscope from '../periscope'

class ModalView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: props.visible
        }
    }

    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        const oldVisible = this.props.visible;

        if (visible !== oldVisible) {
            this.setState({
                visible
            });
        }
    }

    render() {
        const { visible } = this.state;
        const { close } = this.props;

        return (
            <Modal
                visible={visible}
                transparent={false}
                animationType={'slide'}
                style={Style.flex}
            >
                <View style={Style.flex}>
                    <Periscope close={close} />
                </View>
            </Modal>
        );
    }
}

const Style = StyleSheet.create({
    flex: {
        flex: 1
    }
});

export default ModalView;