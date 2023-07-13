import {Image, StyleSheet, View} from "react-native";

const BackgroundCircle = () => (
    <View style={styles.background}>
        <Image
            style={{ flex: 1 }}
            source={require('../background.png')}
        />
    </View>
);

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#F6F7FA',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
});

export default BackgroundCircle;