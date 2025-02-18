import { Pressable, PressableProps, StyleSheet } from "react-native";

export type ThemedButtonProps = PressableProps & {
    onPress: () => void;
    children: React.ReactNode;
    type?: 'default' | 'ghost' | 'primary' | 'secondary' | 'purple' | 'green' | 'blue';
};

export default function ThemedButton(props: ThemedButtonProps) {
    return (
        <Pressable
            onPress={props.onPress}
            style={[
                props.type === 'default' ? styles.default : undefined,
                props.type === 'ghost' ? styles.ghost : undefined,
                props.type === 'primary' ? styles.primary : undefined,
                props.type === 'secondary' ? styles.secondary : undefined,
                props.type === 'purple' ? styles.purple : undefined,
                props.type === 'green' ? styles.green : undefined,
                props.type === 'blue' ? styles.blue : undefined
            ]}
        >
            {props.children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    default: {
        borderRadius: 25,
        margin: 3,
        paddingHorizontal: 16,
        paddingVertical: 4,
        backgroundColor: '#EAECEF',
        color: '#1E1E1E',
    },
    ghost: {
        borderRadius: 25,
        margin: 4,
        padding: 11,
    },
    primary: {
        borderRadius: 25,
        margin: 4,
        padding: 11,
        backgroundColor: '#FF9300',
        color: '#FFFFFF',
    },
    secondary: {
        borderRadius: 25,
        margin: 3,
        paddingHorizontal: 11,
        paddingVertical: 4,
        backgroundColor: '#0F5442',
        color: '#D4DDDE',
    },
    purple: {
        borderRadius: 8,
        backgroundColor:'#9747FF',
        color: '#FFF',
        margin: 3,
        paddingHorizontal: 11,
        paddingVertical: 4,
    },
    green: {
        borderRadius: 8,
        backgroundColor: '#19B70A',
        color: '#FFF',
        margin: 3,
        paddingHorizontal: 11,
        paddingVertical: 4,
    },
    blue: {
        borderRadius: 8,
        backgroundColor: '#408CFF',
        color: '#FFF',
        margin: 3,
        paddingHorizontal: 11,
        paddingVertical: 4,
    }
});
