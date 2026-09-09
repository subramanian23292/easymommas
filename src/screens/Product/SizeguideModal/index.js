import { useState, memo } from 'react';
import { Modal, Text, View, Pressable, useWindowDimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { AppIcon } from '../../../img/AppIcon';
import { styles } from './style';

function SizeguideModal({ ref, data = {} }) {
    const { width, height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const [modalVisible, setModalVisible] = useState(false);

    ref.current = {
        openmodal,
    };

    function openmodal() {
        setModalVisible(true);
    }

    function hidemodal() {
        setModalVisible(false);
    }

    const htmlcontent = `<!DOCTYPE html>
    <html>
        <head>
        <title>${data?.size_label}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet">
        <style>
            html, body {
            margin: 0;
            padding: 0;
            font-family: "Lato", sans-serif;
        }
        table {
            border-collapse: collapse;
            width: 100%;
        }
        td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
            font-size: 14px;
        }
        </style>
        </head>
        <body>
            ${data?.size_description}
        </body>
    </html>`;

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={hidemodal}
            >                
                <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={[styles.modalouter, { paddingTop: Platform.OS === 'ios' ? insets.top : null, paddingBottom: Platform.OS === 'ios' ? insets.bottom : null }]}>
                    <View style={[styles.modalcontent, { height, width }]}>
                        <View style={styles.titlecontainer}>
                            <Text style={styles.modalheading}>{data?.size_label}</Text>
                            <Pressable onPress={hidemodal} style={styles.closebtn}>
                                <AppIcon.CloseDark width={12} height={12} />
                            </Pressable>
                        </View>
                        <WebView source={{ html: htmlcontent }} />
                    </View>
                </View>
            </Modal>
      </View>
    );
}

export default memo(SizeguideModal);
