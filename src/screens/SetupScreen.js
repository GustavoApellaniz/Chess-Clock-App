import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme, TIME_PRESETS } from '../theme';

export default function SetupScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [minutes, setMinutes] = useState(10);
  const [increment, setIncrement] = useState(0);

  // Regra 0: o mesmo tempo escolhido aqui vale para os DOIS jogadores.
  // Não existe seleção separada por jogador — é um único cronômetro-base.
  const adjustMinutes = (delta) => {
    setMinutes((prev) => Math.min(180, Math.max(1, prev + delta)));
  };

  const adjustIncrement = (delta) => {
    setIncrement((prev) => Math.min(60, Math.max(0, prev + delta)));
  };

  const startGame = () => {
    navigation.navigate('Clock', { minutes, increment });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom + 24,
          paddingHorizontal: 24,
        }}
      >
        <View style={styles.brandHeader}>
          <MaterialCommunityIcons name="crown" size={40} color={theme.colors.accent} />
          <Text style={styles.brandTitle}>RELÓGIO DE XADREZ</Text>
          <Text style={styles.brandSubtitle}>Um Timer Digno de Nobreza</Text>
        </View>

        <View style={styles.goldDivider} />

        <Text style={styles.sectionLabel}>TEMPO POR JOGADOR (IGUAL PARA AMBOS)</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetScroll}>
          {TIME_PRESETS.map((m) => {
            const isSelected = minutes === m;
            return (
              <TouchableOpacity
                key={`preset-${m}`}
                style={[
                  styles.presetChip,
                  {
                    backgroundColor: isSelected ? theme.colors.accent : theme.colors.card,
                    borderColor: theme.colors.accent,
                  },
                ]}
                onPress={() => setMinutes(m)}
              >
                <Text
                  style={[
                    styles.presetChipText,
                    { color: isSelected ? theme.colors.primary : theme.colors.textPrimary },
                  ]}
                >
                  {m} min
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.stepperCard}>
          <TouchableOpacity onPress={() => adjustMinutes(-1)} style={styles.stepperButton}>
            <Ionicons name="remove" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <View style={styles.stepperValueBox}>
            <Text style={styles.stepperValue}>{minutes}</Text>
            <Text style={styles.stepperUnit}>minutos cada</Text>
          </View>
          <TouchableOpacity onPress={() => adjustMinutes(1)} style={styles.stepperButton}>
            <Ionicons name="add" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>INCREMENTO (OPCIONAL)</Text>
        <View style={styles.stepperCard}>
          <TouchableOpacity onPress={() => adjustIncrement(-5)} style={styles.stepperButton}>
            <Ionicons name="remove" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <View style={styles.stepperValueBox}>
            <Text style={styles.stepperValue}>{increment}s</Text>
            <Text style={styles.stepperUnit}>por jogada</Text>
          </View>
          <TouchableOpacity onPress={() => adjustIncrement(5)} style={styles.stepperButton}>
            <Ionicons name="add" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="information-outline" size={18} color={theme.colors.textSecondary} />
          <Text style={styles.infoText}>
            Os dois jogadores terão {minutes} minutos cada
            {increment > 0 ? `, mais ${increment} segundos adicionados a cada jogada.` : '.'}
          </Text>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <MaterialCommunityIcons name="chess-knight" size={22} color={theme.colors.primary} />
          <Text style={styles.startButtonText}>INICIAR PARTIDA</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  brandHeader: { alignItems: 'center', marginBottom: 8 },
  brandTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginTop: 8,
    color: theme.colors.textPrimary,
  },
  brandSubtitle: {
    fontSize: 13,
    letterSpacing: 1,
    marginTop: 4,
    fontStyle: 'italic',
    color: theme.colors.textSecondary,
  },
  goldDivider: {
    height: 1,
    width: '60%',
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: theme.colors.accent,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 12,
    color: theme.colors.textPrimary,
  },
  presetScroll: { flexGrow: 0, marginBottom: 20 },
  presetChip: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    marginRight: 10,
  },
  presetChipText: { fontSize: 14, fontWeight: '600' },
  stepperCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: 16,
  },
  stepperButton: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.accentSoft,
  },
  stepperValueBox: { alignItems: 'center' },
  stepperValue: { fontSize: 28, fontWeight: 'bold', color: theme.colors.textPrimary },
  stepperUnit: { fontSize: 12, marginTop: 2, color: theme.colors.textSecondary },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.accent,
    borderRadius: theme.radius.sm,
    padding: 14,
    marginTop: 24,
  },
  infoText: { fontSize: 12, marginLeft: 8, flex: 1, lineHeight: 18, color: theme.colors.textSecondary },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.sm,
    paddingVertical: 16,
    marginTop: 32,
    backgroundColor: theme.colors.accent,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginLeft: 8,
    color: theme.colors.primary,
  },
});
