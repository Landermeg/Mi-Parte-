import {
  SpaceMono_400Regular,
  SpaceMono_700Bold,
  useFonts,
} from '@expo-google-fonts/space-mono';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getTheme, Palette } from './src/constants/theme';
import { AuthResultScreen } from './src/screens/AuthResultScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

type Screen = 'settings' | 'deleted' | 'loggedOut';

export default function App() {
  const [screen, setScreen] = useState<Screen>('settings');
  const [isDark, setIsDark] = useState(false);

  const [fontsLoaded] = useFonts({
    SpaceMono_400Regular,
    SpaceMono_700Bold,
  });

  const theme = getTheme(isDark);
  const fontFamily = fontsLoaded ? 'SpaceMono_700Bold' : undefined;

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Palette.terracotta} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style={theme.statusBar} />
      {screen === 'settings' ? (
        <SettingsScreen
          isDark={isDark}
          onToggleDark={setIsDark}
          theme={theme}
          fontFamily={fontFamily!}
          onDeleteAccount={() => setScreen('deleted')}
          onLogout={() => setScreen('loggedOut')}
        />
      ) : (
        <AuthResultScreen
          variant={screen === 'deleted' ? 'deleted' : 'loggedOut'}
          theme={theme}
          fontFamily={fontFamily!}
          onLogin={() => setScreen('settings')}
          onRegister={() => setScreen('settings')}
        />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.offWhite,
  },
});
