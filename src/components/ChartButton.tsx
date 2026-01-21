import { useMemo, useState, type PropsWithChildren } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../styles/Colors';

type Props = PropsWithChildren<{
    selected: boolean;
    label: string;
    onPress: () => void;
}>;

export default function ChartButton({ selected = false, label, onPress }: Props) {
    const containerStyles = useMemo(() => [
        styles.container,
        {
            backgroundColor: selected ? Colors.darkGreen : Colors.grey,
        }
    ], [selected]);
    const buttonTextStyles = useMemo(() => [
        styles.buttonText,
        {
            color: selected ? Colors.white : Colors.black,
        }
    ], [selected]);

    return (
        <TouchableOpacity
            style={containerStyles}
            onPress={onPress}
        >
            <Text
                style={buttonTextStyles}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.darkGreen,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 43,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: 12,
        textAlign: 'center',
    },
});
