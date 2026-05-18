import Svg, { Circle, G, Line, Path, Polygon } from 'react-native-svg';
import { StyleSheet, Text, View } from 'react-native';
import { Palette } from '../constants/theme';

type Props = {
  size?: number;
  showLabel?: boolean;
  labelColor?: string;
};

export function SchoolTaskLogo({
  size = 96,
  showLabel = true,
  labelColor = Palette.charcoal,
}: Props) {
  return (
    <View style={styles.wrap}>
      <Svg width={size} height={size} viewBox="0 0 120 120">
        <Circle
          cx="60"
          cy="60"
          r="56"
          stroke={Palette.charcoal}
          strokeWidth="2"
          fill={Palette.white}
        />
        <G transform="translate(22, 38)">
          <Path
            d="M8 42 L38 32 L38 4 L8 14 Z"
            fill={Palette.bookBeige}
            stroke={Palette.charcoal}
            strokeWidth="1.2"
          />
          <Path
            d="M38 32 L68 22 L68 50 L38 60 Z"
            fill={Palette.bookBeige}
            stroke={Palette.charcoal}
            strokeWidth="1.2"
          />
          <Path
            d="M14 18 L22 14 L22 22 L14 26 Z"
            fill={Palette.charcoal}
          />
          <Line x1="14" y1="30" x2="30" y2="26" stroke={Palette.mediumGrey} strokeWidth="2" />
          <Line x1="14" y1="36" x2="30" y2="32" stroke={Palette.mediumGrey} strokeWidth="2" />
          <Line x1="14" y1="42" x2="30" y2="38" stroke={Palette.mediumGrey} strokeWidth="2" />
        </G>
        <G transform="translate(58, 30)">
          <Circle
            cx="28"
            cy="28"
            r="26"
            fill={Palette.white}
            stroke={Palette.terracotta}
            strokeWidth="5"
          />
          <Polygon
            points="54,28 62,24 62,32"
            fill={Palette.terracotta}
          />
          <Line x1="28" y1="28" x2="40" y2="20" stroke={Palette.charcoal} strokeWidth="2.5" strokeLinecap="round" />
          <Line x1="28" y1="28" x2="28" y2="14" stroke={Palette.charcoal} strokeWidth="2.5" strokeLinecap="round" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 28 + Math.cos(rad) * 18;
            const y1 = 28 + Math.sin(rad) * 18;
            return (
              <Circle key={deg} cx={x1} cy={y1} r="1.8" fill={Palette.darkBrown} />
            );
          })}
        </G>
      </Svg>
      {showLabel && (
        <Text style={[styles.label, { color: labelColor }]}>SchoolTask</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
  label: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
