import React from 'react';
import AppLoading from 'expo-app-loading';

// Agora importamos a nossas rotas
import Routes from './src/routes';

// Importação do Hook e das fontes que a documentação do Expo recomenda
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';

export default function App() {
  // Pega se as fontes já foram carregadas
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  // Verifica se fonte foi carregada, enquanto não foi segura na tela de splash
  if (!fontsLoaded)
    return <AppLoading />

  return (
    <Routes />
  );
}
