import { Modal, View, StyleSheet } from "react-native";
import ThemedButton from "./ThemedButton";
import { ThemedText } from "./ThemedText";
import { useState } from "react";
import React from "react";
import useAppStore from "@/app/store/store";



export function Breakdown() {
    const [modalVisible, setModalVisible] = useState(false);
    const {breakdown} = useAppStore();

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 10, alignItems: 'center', flexWrap: 'wrap', padding: 8, paddingHorizontal: 10 }}>
                <ThemedButton type='green' onPress={() => setModalVisible(true)}>
                    <ThemedText>20% Nahrungsmittel</ThemedText>
                </ThemedButton>
                <ThemedButton type='purple' onPress={() => setModalVisible(true)}>
                    <ThemedText>20% Pflegeproduckte</ThemedText>
                </ThemedButton>
                <ThemedButton type='blue' onPress={() => setModalVisible(true)}>
                    <ThemedText>60% Tier Produckte</ThemedText>
                </ThemedButton>
            </View><Modal
                animationType="slide"
                transparent={true}

                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ThemedText type='title'>{breakdown[0]}</ThemedText>
                        <ThemedText>{breakdown[1]}</ThemedText>
                        <ThemedButton type='blue' onPress={() => setModalVisible(false)}>
                            <ThemedText>close</ThemedText>
                        </ThemedButton>
                    </View>
                </View>
            </Modal></>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView: {
        margin: 0,
        backgroundColor: '#F4F7F6',
        borderRadius: 20,
        padding: 85,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});