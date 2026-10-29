import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme';
import { formatTime } from '../utils/formatTime';

export default function PlayerPanel({ color, label, time, active, isLoser, rotate, onPress }) {
  const timeLow = time <= 10 && time > 0;
  const bgColor = isLoser ? theme.colors.error : active ? theme.colors.accent : theme.colors.card;
  const textColor = isLoser ? theme.colors.white : active ? theme.colors.primary : theme.colors.textSecondary;

  return (
    <TouchableOpacity
      style={[
        styles.playerPanel,
        { backgroundColor: bgColor },
        rotate ? { transform: [{ rotate: '180deg' }] } : null,
      ]}
      activeOpacity={0.85}
      onPress={onPress}
      disabled={!active}
    >
      {/* Moldura de madeira ao redor do valor do relógio, lembrando os
          relógios de xadrez de madeira maciça usados em torneios clássicos. */}
      <View style={[styles.woodFrame, { borderColor: isLoser ? '#3a1410' : theme.colors.woodBorder }]}>
        <MaterialCommunityIcons name="chess-king" size={26} color={textColor} style={{ marginBottom: 6, opacity: 0.85 }} />
        <Text style={[styles.panelLabel, { color: textColor }]}>{label}</Text>
        <Text style={[styles.panelTime, { color: textColor }, timeLow && !isLoser ? styles.panelTimeWarning : null]}>
          {formatTime(time)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  playerPanel: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  woodFrame: {
    borderWidth: 5,
    borderRadius: 14,
    paddingVertical: 22,
    paddingHorizontal: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelLabel: { fontSize: 13, fontWeight: 'bold', letterSpacing: 3, marginBottom: 6 },
  panelTime: { fontSize: 54, fontWeight: 'bold', fontVariant: ['tabular-nums'] },
  panelTimeWarning: { color: '#FFD54F' },
});
