import { KeyboardAvoidingView, Platform } from 'react-native';
import { styles } from './style';

function FormHoc(Component) {
    return (props) => {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={styles.keyboardcontainer}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 116 : 0}
            >
                <Component {...props} />
            </KeyboardAvoidingView>
        );
    };
}

export default FormHoc;
