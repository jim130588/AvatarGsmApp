import {View, Text, StyleSheet} from 'react-native';

export default function Homescreen() {
    return (
        <View style= {styles.container}>
            <Text style={styles.title}>Avatar GSM App</Text>
            <Text style={styles.subtitle}>Welkom op het startscherm</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
    },
});