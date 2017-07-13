import React, { Component, PropTypes } from "react"
import { View, StyleSheet, Animated, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const ANIMATED_END = height * .5;
const NEGATIVE_END = ANIMATED_END * -1

class Heart extends Component {
    constructor(props) {
        super(props);

        this.getStyleAnimation = this.getStyleAnimation.bind(this);

        this.state = {
            position: new Animated.Value(0)
        };
    }

    static propTypes = {
        style: PropTypes.object,
        onComplete: PropTypes.func
    }

    static defaultProps = {
        onComplete: () => null
    }

    getStyleAnimation() {
        const { position } = this.state;

        const animationY = position.interpolate({
            inputRange: [NEGATIVE_END, 0],
            outputRange: [ANIMATED_END, 0]
        });

        const opacity = animationY.interpolate({
            inputRange: [0, ANIMATED_END],
            outputRange: [1, 0]
        });

        const scale = animationY.interpolate({
            inputRange: [0, 15, 30],
            outputRange: [0, 1.3, 1],
            extrapolate: "clamp"
        });

        const translateX = animationY.interpolate({
            inputRange: [0, ANIMATED_END / 2, ANIMATED_END],
            outputRange: [0, 15, 0]
        });

        const rotate = translateX.interpolate({
            inputRange: [0, ANIMATED_END / 4, ANIMATED_END / 3, ANIMATED_END / 2, ANIMATED_END],
            outputRange: ["0deg", "-10deg", "0deg", "10deg", "0deg"]
        });

        return {
            transform: [
                {rotate},
                {scale},
                {translateX},
                {translateY: position}
            ],
            opacity
        }
    }

    componentWillMount() {
        this.animationStyle = this.getStyleAnimation();
    }

    componentDidMount() {
        const { position } = this.state;
        
        Animated.timing(position, {
            duration: 2000,
            toValue: NEGATIVE_END
        }).start(this.props.onComplete);
    }

    render() {
        const {style} = this.props;
        
        return (
            <Animated.View style={[styles.container, style, this.animationStyle]}>
                <View style={[styles.heartSide, styles.right]} />
                <View style={[styles.heartSide, styles.left]} />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: 40,
        height: 40,
        backgroundColor: "transparent",
        bottom: 30
    },

    heartSide: {
        height: 35,
        width: 20,
        backgroundColor: "red",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: "absolute"
    },

    right: {
        transform: [
            {rotate: "45deg"}
        ],
        right: 5
    },

    left: {
        transform: [
            {rotate: "-45deg"}
        ],
        left: 5
    }
});

export default Heart;