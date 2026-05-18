import { Image, StyleSheet, View } from 'react-native';

const logoSource = require('../../assets/logo.png');

type Props = {
  width?: number;
};

export function SchoolTaskLogo({ width = 200 }: Props) {
  const height = width * 1.05;

  return (
    <View style={styles.wrap}>
      <Image
        source={logoSource}
        style={{ width, height }}
        resizeMode="contain"
        accessibilityLabel="SchoolTask"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
});
