import React, { useState } from 'react';
import { SafeAreaView, Text, Image, StyleSheet } from 'react-native';
import { Button } from '../components/Button';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';

export function Welcome() {
  // Criando hooks
  const [visible, setVisible] = useState(true);

  function handleVisibility() {
    setVisible(!visible);
  }

  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {'\n' /*Adiciona uma quebra de linha*/}
        suas plantas {'\n'}
        de forma fácil
      </Text>

      {
        visible && // Operador de curto circuito, se visible = True então mostra a imagem
        <Image 
          source={wateringImg} 
          style={styles.image}
        />
      }

      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar vocêsempre que precisar.
      </Text>

      <Button title=">"/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 30,
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },

  image: {
    width: 292,
    height: 284,
  },
});