# Relógio de Xadrez Nobre

App de relógio de xadrez para dois jogadores, com visual inspirado em salas de
xadrez de palácios (madeira escura + dourado envelhecido).

## Como rodar no VS Code

1. Instale o [Node.js LTS](https://nodejs.org/) (se ainda não tiver).
2. Instale o app **Expo Go** no seu celular Android (Play Store) — é o jeito
   mais rápido de testar sem precisar de emulador.
3. No terminal do VS Code, dentro desta pasta, rode:
   ```bash
   npm install
   npx expo start
   ```
4. Vai abrir um QR code no terminal/navegador. Escaneie com o app Expo Go
   no celular. O app abre direto no seu telefone.

## ⚠️ Falta adicionar os sons

O app já está preparado para tocar dois sons, mas os arquivos de áudio
precisam ser adicionados por você (por licença — eu não posso gerar/baixar
arquivos de áudio prontos):

- `assets/sounds/click.mp3` → som curto de "clique" quando o jogador aperta
  o botão e passa a vez.
- `assets/sounds/alarm.mp3` → som de alarme quando o tempo de um jogador
  acaba.

Sugestões de fontes gratuitas e livres de direitos: freesound.org, pixabay.com/sound-effects,
ou mixkit.co/free-sound-effects. Baixe em `.mp3`, renomeie exatamente como acima e
coloque na pasta `assets/sounds/`. Sem esses arquivos o app funciona
normalmente, só toca sem som.

## Ícone e splash screen

O `app.json` já referencia `assets/icon.png`, `assets/adaptive-icon.png` e
`assets/splash.png` — adicione essas imagens (1024x1024 para o ícone) antes
de gerar a versão final para a Play Store. Posso ajudar a desenhar esses
ícones no estilo nobre/madeira quando quiser.

## Próximos passos

Este é o núcleo funcional do app (tela de configuração + relógio com as
regras que você pediu). Os próximos passos, que posso te ajudar em seguida:

1. Adicionar os sons e os ícones/splash.
2. Testar no Expo Go.
3. Gerar o build de produção (`.aab`) com EAS Build.
4. Passo a passo completo de publicação na Google Play Store (conta de
   desenvolvedor, ficha da loja, política de privacidade, envio para revisão).

Me avise quando quiser seguir para essas etapas.
