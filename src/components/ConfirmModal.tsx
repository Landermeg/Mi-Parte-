import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AppTheme, Palette } from '../constants/theme';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  cancelLabel?: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  theme: AppTheme;
  fontFamily: string;
};

export function ConfirmModal({
  visible,
  title,
  message,
  cancelLabel = 'CANCELAR',
  confirmLabel,
  onCancel,
  onConfirm,
  theme,
  fontFamily,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={[styles.overlay, { backgroundColor: theme.overlay }]}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.modalBg,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.title, { color: theme.text, fontFamily }]}>
            {title}
          </Text>
          <Text style={[styles.message, { color: theme.textSecondary }]}>
            {message}
          </Text>
          <View style={styles.actions}>
            <Pressable
              onPress={onCancel}
              style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
            >
              <Text style={[styles.btnText, { color: theme.text, fontFamily }]}>
                {cancelLabel}
              </Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
            >
              <Text style={[styles.btnText, { color: Palette.terracotta, fontFamily }]}>
                {confirmLabel}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  message: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 18,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Palette.lightGrey,
    paddingTop: 8,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 120,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  pressed: {
    opacity: 0.65,
  },
});
