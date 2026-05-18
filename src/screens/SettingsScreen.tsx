import { Ionicons } from '@expo/vector-icons';
import { ReactNode, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ConfirmModal } from '../components/ConfirmModal';
import { SchoolTaskLogo } from '../components/SchoolTaskLogo';
import { Palette, theme } from '../constants/theme';

type Props = {
  fontFamily: string;
  onDeleteAccount: () => void;
  onLogout: () => void;
};

type NotificationKey =
  | 'nextClass'
  | 'homework'
  | 'deadline'
  | 'overdue';

export function SettingsScreen({
  fontFamily,
  onDeleteAccount,
  onLogout,
}: Props) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [notificationTypes, setNotificationTypes] = useState<
    Record<NotificationKey, boolean>
  >({
    nextClass: true,
    homework: true,
    deadline: true,
    overdue: true,
  });

  const [disableNotifModal, setDisableNotifModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const notifControlsDisabled = !notificationsEnabled;

  const toggleNotificationType = (key: NotificationKey, value: boolean) => {
    setNotificationTypes((prev) => ({ ...prev, [key]: value }));
  };

  const handleNotificationsToggle = (value: boolean) => {
    if (!value) {
      setDisableNotifModal(true);
      return;
    }
    setNotificationsEnabled(true);
  };

  const confirmDisableNotifications = () => {
    setNotificationsEnabled(false);
    setDisableNotifModal(false);
  };

  const renderSwitch = (
    value: boolean,
    onChange: (v: boolean) => void,
    disabled = false,
  ) => (
    <Switch
      value={value}
      onValueChange={onChange}
      disabled={disabled}
      trackColor={{
        false: theme.switchTrackOff,
        true: theme.switchTrackOn,
      }}
      thumbColor={Palette.white}
      ios_backgroundColor={theme.switchTrackOff}
    />
  );

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: theme.background }]}
      edges={['top', 'left', 'right']}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <Pressable style={styles.menuBtn} hitSlop={12}>
            <Ionicons name="menu" size={28} color={theme.text} />
          </Pressable>
        </View>

        <View style={styles.logoWrap}>
          <SchoolTaskLogo width={200} />
        </View>

        <View
          style={[styles.headerPill, { backgroundColor: theme.headerPill }]}
        >
          <Text style={[styles.headerText, { color: theme.text, fontFamily }]}>
            CONFIGURACIÓN
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text, fontFamily }]}>
          PREFERENCIAS DE NOTIFICACIONES
        </Text>
        <View style={styles.row}>
          <Text style={[styles.rowLabel, { color: theme.text, fontFamily }]}>
            ACTIVAR NOTIFICACIONES
          </Text>
          {renderSwitch(notificationsEnabled, handleNotificationsToggle)}
        </View>
        <View style={styles.row}>
          <Text
            style={[
              styles.rowLabel,
              {
                color: notifControlsDisabled ? theme.textSecondary : theme.text,
                fontFamily,
              },
            ]}
          >
            VIBRACIÓN DE NOTIFICACIÓN
          </Text>
          {renderSwitch(
            vibrationEnabled,
            setVibrationEnabled,
            notifControlsDisabled,
          )}
        </View>

        <Text
          style={[styles.subSectionTitle, { color: theme.textSecondary, fontFamily }]}
        >
          ELEGIR QUE TIPO DE NOTIFICACIONES
        </Text>

        <NotificationTypeRow
          title="PRÓXIMA CLASE"
          description="NOTIFICACIÓN CUANDO ESTÉ POR COMENZAR LA SIGUIENTE CLASE"
          value={notificationTypes.nextClass}
          onChange={(v) => toggleNotificationType('nextClass', v)}
          disabled={notifControlsDisabled}
          fontFamily={fontFamily}
          renderSwitch={renderSwitch}
        />
        <NotificationTypeRow
          title="ENTREGA DE TRABAJO"
          description="AVISOS PARA RECORDAR TAREAS O ACTIVIDADES PENDIENTES"
          value={notificationTypes.homework}
          onChange={(v) => toggleNotificationType('homework', v)}
          disabled={notifControlsDisabled}
          fontFamily={fontFamily}
          renderSwitch={renderSwitch}
        />
        <NotificationTypeRow
          title="FECHA LÍMITE DE ENTREGA"
          description="NOTIFICACIÓN ANTES DE QUE VENZA LA FECHA DE ENTREGA"
          value={notificationTypes.deadline}
          onChange={(v) => toggleNotificationType('deadline', v)}
          disabled={notifControlsDisabled}
          fontFamily={fontFamily}
          renderSwitch={renderSwitch}
        />
        <NotificationTypeRow
          title="FECHA DE ENTREGA VENCIDA"
          description="AVISO CUANDO LA FECHA LÍMITE DE UNA TAREA YA PASÓ"
          value={notificationTypes.overdue}
          onChange={(v) => toggleNotificationType('overdue', v)}
          disabled={notifControlsDisabled}
          fontFamily={fontFamily}
          renderSwitch={renderSwitch}
        />

        <Text style={[styles.sectionTitle, { color: theme.text, fontFamily }]}>
          CUENTA
        </Text>
        <View style={styles.accountRow}>
          <Pressable
            onPress={() => setDeleteModal(true)}
            style={({ pressed }) => [
              styles.accountBtn,
              { backgroundColor: theme.headerPill, borderColor: theme.text },
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.accountBtnText, { color: theme.text, fontFamily }]}>
              ELIMINAR
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setLogoutModal(true)}
            style={({ pressed }) => [
              styles.accountBtn,
              { backgroundColor: theme.headerPill, borderColor: theme.text },
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.accountBtnText, { color: theme.text, fontFamily }]}>
              CERRAR SESIÓN
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <ConfirmModal
        visible={disableNotifModal}
        title="¿SEGURO QUE QUIERES DESACTIVARLAS?"
        message="SI DESACTIVAS LAS NOTIFICACIONES NO RECIBIRÁS NOTIFICACIONES DE NINGÚN TIPO"
        confirmLabel="DESACTIVAR"
        onCancel={() => setDisableNotifModal(false)}
        onConfirm={confirmDisableNotifications}
        fontFamily={fontFamily}
      />
      <ConfirmModal
        visible={deleteModal}
        title="¿SEGURO QUE QUIERES ELIMINAR LA CUENTA?"
        message="SI ELIMINAS LA CUENTA PERDERÁS TODOS TUS DATOS Y NO PODRÁS RECUPERARLOS"
        confirmLabel="ELIMINAR"
        onCancel={() => setDeleteModal(false)}
        onConfirm={() => {
          setDeleteModal(false);
          onDeleteAccount();
        }}
        fontFamily={fontFamily}
      />
      <ConfirmModal
        visible={logoutModal}
        title="¿SEGURO QUE QUIERES CERRAR LA SESIÓN?"
        message="PODRÁS VOLVER A INICIAR SESIÓN EN CUALQUIER MOMENTO CON TU CUENTA"
        confirmLabel="CERRAR SESIÓN"
        onCancel={() => setLogoutModal(false)}
        onConfirm={() => {
          setLogoutModal(false);
          onLogout();
        }}
        fontFamily={fontFamily}
      />
    </SafeAreaView>
  );
}

type RowProps = {
  title: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
  disabled: boolean;
  fontFamily: string;
  renderSwitch: (
    value: boolean,
    onChange: (v: boolean) => void,
    disabled?: boolean,
  ) => ReactNode;
};

function NotificationTypeRow({
  title,
  description,
  value,
  onChange,
  disabled,
  fontFamily,
  renderSwitch,
}: RowProps) {
  return (
    <View style={styles.typeRow}>
      <View style={styles.typeTextWrap}>
        <Text
          style={[
            styles.typeTitle,
            { color: disabled ? theme.textSecondary : theme.text, fontFamily },
          ]}
        >
          {title}
        </Text>
        <Text style={[styles.typeDesc, { color: theme.textSecondary }]}>
          {description}
        </Text>
      </View>
      {renderSwitch(value, onChange, disabled)}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  topBar: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  menuBtn: {
    padding: 4,
  },
  logoWrap: {
    alignSelf: 'center',
    marginBottom: 4,
  },
  headerPill: {
    alignSelf: 'center',
    marginTop: 18,
    marginBottom: 22,
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 6,
    letterSpacing: 0.4,
  },
  subSectionTitle: {
    fontSize: 11,
    textAlign: 'center',
    marginVertical: 14,
    letterSpacing: 0.3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  rowLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 10,
  },
  typeTextWrap: {
    flex: 1,
  },
  typeTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  typeDesc: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.2,
  },
  accountRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  accountBtn: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  accountBtnText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  pressed: {
    opacity: 0.7,
  },
});
