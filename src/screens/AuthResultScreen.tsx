import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SchoolTaskLogo } from '../components/SchoolTaskLogo';
import { Palette, theme } from '../constants/theme';

type Props = {
  variant: 'deleted' | 'loggedOut';
  fontFamily: string;
  onLogin: () => void;
  onRegister: () => void;
};

export function AuthResultScreen({
  variant,
  fontFamily,
  onLogin,
  onRegister,
}: Props) {
  const title =
    variant === 'deleted'
      ? 'SE HA ELIMINADO LA CUENTA'
      : 'SE HA CERRADO LA SESIÓN';

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SchoolTaskLogo width={220} />
      <Text style={[styles.title, { color: theme.text, fontFamily }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary, fontFamily }]}>
        INICIA SESIÓN O REGÍSTRATE PARA ACCEDER
      </Text>
      <View style={styles.buttons}>
        <Pressable
          onPress={onLogin}
          style={({ pressed }) => [
            styles.btn,
            { backgroundColor: Palette.beige, borderColor: theme.text },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.btnText, { color: theme.text, fontFamily }]}>
            INICIAR SESIÓN
          </Text>
        </Pressable>
        <Pressable
          onPress={onRegister}
          style={({ pressed }) => [
            styles.btn,
            { backgroundColor: Palette.beige, borderColor: theme.text },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.btnText, { color: theme.text, fontFamily }]}>
            REGISTRARSE
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  title: {
    marginTop: 36,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 14,
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  buttons: {
    marginTop: 40,
    width: '100%',
    gap: 14,
  },
  btn: {
    borderRadius: 12,
    borderWidth: 1.5,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  pressed: {
    opacity: 0.7,
  },
});
