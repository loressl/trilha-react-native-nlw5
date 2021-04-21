import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import wateringImg from '../assets/watering.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';
//import fonts from '../styles/fonts';

export function Welcome() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Gerencie {'\n'}
                suas plantas {'\n'}
                de forma fácil
            </Text>
            <Image source={wateringImg} style={styles.image} />
            <Text style={styles.subtitles}>
                Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
                sempre que precisar.
            </Text>
            <Button 
                title=">"
                activeOpacity={0.7}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        //fontFamily: fonts.heading,
        lineHeight: 34
    },
    subtitles: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        //fontFamily: fonts.text
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
    },
    image: {
        height: Dimensions.get('window').width * 0.7
    },
    buttonIcon: {
        fontSize: 32,
        color: colors.white
    }
});
