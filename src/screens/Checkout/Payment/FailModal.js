import { useState, memo } from 'react';
import { Modal, Text, View, Pressable, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './style';

function FailModal({ ref }) {
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

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hidemodal}
      >
        <TouchableWithoutFeedback onPress={hidemodal}>
          <View style={styles.modalbackdrop} />
        </TouchableWithoutFeedback>
        <View pointerEvents="box-none" style={[styles.modalouter, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingRight: insets.right, paddingLeft: insets.left }]}>
          <View style={styles.modalcontent}>
              <Text style={styles.modalheading}>Alert</Text>
              <Text style={styles.alertxt}>Payment Failed. Try again.</Text>
              <View style={styles.closebtncontainer}>
                <Pressable onPress={hidemodal} style={styles.closebtn}>
                  <Text style={styles.closebtntext}>Close</Text>
                </Pressable>
              </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default memo(FailModal);
