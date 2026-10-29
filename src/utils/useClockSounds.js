import { useEffect, useRef, useCallback } from 'react';
import { Audio } from 'expo-av';

// Carrega os dois sons do app: clique de botão (passar a vez)
// e alarme de tempo esgotado. Os arquivos de áudio ficam em
// assets/sounds/click.mp3 e assets/sounds/alarm.mp3 (veja o README).
export function useClockSounds() {
  const clickSoundRef = useRef(null);
  const alarmSoundRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function loadSounds() {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });

        const { sound: clickSound } = await Audio.Sound.createAsync(
          require('../../assets/sounds/click.mp3')
        );
        const { sound: alarmSound } = await Audio.Sound.createAsync(
          require('../../assets/sounds/alarm.mp3')
        );

        if (isMounted) {
          clickSoundRef.current = clickSound;
          alarmSoundRef.current = alarmSound;
        } else {
          clickSound.unloadAsync();
          alarmSound.unloadAsync();
        }
      } catch (e) {
        // Se os arquivos de som ainda não foram adicionados, o app
        // continua funcionando normalmente, apenas sem áudio.
        console.warn('Não foi possível carregar os sons do relógio:', e.message);
      }
    }

    loadSounds();

    return () => {
      isMounted = false;
      if (clickSoundRef.current) clickSoundRef.current.unloadAsync();
      if (alarmSoundRef.current) alarmSoundRef.current.unloadAsync();
    };
  }, []);

  const playClick = useCallback(async () => {
    try {
      if (clickSoundRef.current) {
        await clickSoundRef.current.replayAsync();
      }
    } catch (e) {
      // silencioso — não deve travar o jogo por causa do som
    }
  }, []);

  const playAlarm = useCallback(async () => {
    try {
      if (alarmSoundRef.current) {
        await alarmSoundRef.current.replayAsync();
      }
    } catch (e) {
      // silencioso
    }
  }, []);

  return { playClick, playAlarm };
}
