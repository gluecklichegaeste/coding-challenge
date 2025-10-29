import React from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
    Text,
    TouchableOpacity,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSalesStore } from '@/store';
import { CATEGORIES_LABELS } from '@/constants/Calendar';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SlideUpModalProps {
    visible: boolean;
    onClose: () => void;
    height?: number;
    backgroundColor?: string;
}

export const SlideUpModal: React.FC<SlideUpModalProps> = ({
    visible,
    onClose,
    height = SCREEN_HEIGHT * 0.4,
    backgroundColor = '#FFFFFF',
}) => {

    const { getSalesByPeriod, selectedDate, selectedPeriod, selectedCategory } = useSalesStore((state) => state);
    const salesForDate = getSalesByPeriod(selectedPeriod, selectedDate);
    const salesForCategory = salesForDate.filter((sale) => sale.Produktkategorie === selectedCategory);

    const groupedProducts = salesForCategory.reduce((acc, sale) => {
        const existingProduct = acc.find((item) => item.title === sale.Produktname);
        if (existingProduct) {
            existingProduct.total += sale.Preis;
        } else {
            acc.push({
                title: sale.Produktname,
                total: sale.Preis,
            });
        }
        return acc;
    }, [] as { title: string; total: number }[]);

    const totalSalesForCategory = salesForCategory.reduce((acc, sale) => acc + sale.Preis, 0);
    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.backdrop} />
                </TouchableWithoutFeedback>

                <View
                    style={[
                        styles.modalContent,
                        {
                            height,
                            backgroundColor,
                        },
                    ]}
                >
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={styles.modalContentInner}>
                        <Text style={styles.modalContentTitle}>{selectedCategory + ' ' + totalSalesForCategory.toFixed(0) + '€'}</Text>
                        <Text style={styles.modalContentSubtitle}>Modal Subtitle</Text>
                        {groupedProducts.map((product) => (
                            <View style={styles.modalContentCategory} key={product.title}>
                                <Text style={styles.modalContentListItem}>{product.title}</Text>
                                <Text style={styles.modalContentListItemValue}>{product.total.toFixed(0) + '€'}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
    },
    modalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 45,
        paddingTop: 20,
        paddingBottom: 40,
    },
    modalContentInner: {
        flex: 1,
        paddingTop: 30,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1000,
    },
    modalContentTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalContentSubtitle: {
        fontSize: 16,
        marginTop: 5,
        marginBottom: 15,
    },
    modalContentCategory: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    modalContentListItem: {
        fontSize: 16,
    },
    modalContentListItemValue: {
        fontSize: 16,
        fontWeight: 'bold',

    },
});