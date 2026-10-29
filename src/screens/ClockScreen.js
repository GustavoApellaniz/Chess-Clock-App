import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeepAwake } from 'expo-keep-awake';
import { theme } from '../theme';
import PlayerPanel from '../components/PlayerPanel';
import { useClockSounds } from '../utils/useClockSounds';

export default function ClockScreen({ navigation, route }) {
  const { minutes = 10, increment = 0 } = route.params || {};
  const insets = useSafeAreaInsets();
  useKeepAwake(); // mantém a tela ligada durante a partida

  const { playClick, playAlarm } = useClockSounds();

  const [whiteTime, setWhiteTime] = useState(minutes * 60);
  const [blackTime, setBlackTime] = useState(minutes * 60);
  // Regra 1: a partida começa com as peças brancas jogando primeiro.
  const [activePlayer, setActivePlayer] = useState('white');
  const [paused, setPaused] = useState(true); // só começa a contar quando o jogador der o primeiro toque
  const [gameOver, setGameOver] = useState(null);

  const lastTickRef = useRef(Date.now());

  useEffect(() => {
    lastTickRef.current = Date.now();
  }, [activePlayer, paused, gameOver]);

  // Loop do cronômetro: só o jogador ativo perde tempo.
  useEffect(() => {
    if (paused || gameOver) return undefined;
    const interval = setInterval(() => {
      const now = Date.now();
      const delta = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;
      if (activePlayer === 'white') {
        setWhiteTime((prev) => Math.max(0, prev - delta));
      } else {
        setBlackTime((prev) => Math.max(0, prev - delta));
      }
    }, 200);
    return () => clearInterval(interval);
  }, [activePlayer, paused, gameOver]);

  // Detecta fim de jogo por tempo esgotado
  useEffect(() => {
    if (gameOver) return;
    if (whiteTime <= 0) setGameOver('white');
    else if (blackTime <= 0) setGameOver('black');
  }, [whiteTime, blackTime, gameOver]);

  useEffect(() => {
    if (gameOver) playAlarm();
  }, [gameOver]);

  const pressButton = useCallback(
    (color) => {
      if (gameOver) return;
      if (activePlayer !== color) return;
      playClick();
      setPaused(false);
      if (color === 'white') {
        setWhiteTime((prev) => prev + increment);
        setActivePlayer('black');
      } else {
        setBlackTime((prev) => prev + increment);
        setActivePlayer('white');
      }
    },
    [gameOver, activePlayer, increment]
  );

  const togglePause = () => {
    if (gameOver) return;
    setPaused((prev) => !prev);
  };

  const handleNewGame = () => {
    const confirmMsg = 'Iniciar uma nova partida? O progresso atual será perdido.';
    if (Platform.OS === 'web') {
      if (window.confirm(confirmMsg)) navigation.replace('Setup');
    } else {
      Alert.alert('Nova Partida', confirmMsg, [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Nova Partida', onPress: () => navigation.replace('Setup') },
      ]);
    }
  };

  const winnerLabel =
    gameOver === 'white' ? 'Pretas vencem no tempo' : gameOver === 'black' ? 'Brancas vencem no tempo' : null;

  return (
    <View
      style={[
        styles.clockContainer,
        { backgroundColor: theme.colors.primary, paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />

      <PlayerPanel
        color="black"
        label="PRETAS"
        time={blackTime}
        active={activePlayer === 'black' && !gameOver && !paused}
        isLoser={gameOver === 'black'}
        rotate
        onPress={() => pressButton('black')}
      />

      <View style={styles.controlsBar}>
        <TouchableOpacity onPress={handleNewGame} style={styles.controlButton}>
          <Ionicons name="refresh" size={22} color={theme.colors.accent} />
        </TouchableOpacity>

        <View style={styles.incrementBadge}>
          <Text style={styles.incrementBadgeText}>{increment > 0 ? `+${increment}s` : 'Sem incremento'}</Text>
        </View>

        <TouchableOpacity onPress={togglePause} style={styles.controlButton} disabled={!!gameOver}>
          <Ionicons name={paused ? 'play' : 'pause'} size={22} color={theme.colors.accent} />
        </TouchableOpacity>
      </View>

      <PlayerPanel
        color="white"
        label="BRANCAS"
        time={whiteTime}
        active={activePlayer === 'white' && !gameOver && !paused}
        isLoser={gameOver === 'white'}
        rotate={false}
        onPress={() => pressButton('white')}
      />

      {gameOver ? (
        <View style={styles.gameOverBanner}>
          <MaterialCommunityIcons name="crown" size={20} color={theme.colors.primary} />
          <Text style={styles.gameOverText}>{winnerLabel}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  clockContainer: { flex: 1 },
  controlsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.colors.primary,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.accentSoft,
  },
  incrementBadge: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  incrementBadgeText: { fontSize: 12, fontWeight: '600', color: theme.colors.accent },
  gameOverBanner: {
    position: 'absolute',
    top: '42%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: theme.colors.accent,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  gameOverText: { fontSize: 15, fontWeight: 'bold', marginLeft: 8, letterSpacing: 1, color: theme.colors.primary },
});
