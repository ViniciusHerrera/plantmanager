import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Welcome() {
  const navigation = useNavigation(); // Recurso do react para fazer a navegação nas telas

  function handleStart() {
    navigation.navigate('UserIdentification'); // Navega para a tela cujo nome definimos na nossa pilha de navegação
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n' /*Adiciona uma quebra de linha*/}
          suas plantas de {'\n'}
          forma fácil
        </Text>

        <Image 
          source={wateringImg} 
          style={styles.image}
          resizeMode="contain" //Redimensiona a imagem calculando o tamanho da tela
        />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar vocêsempre que precisar.
        </Text>

        <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleStart} //Chama nossa função
        >
          <Feather 
            name="chevron-right"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around', // Não deixa colar nas bordas e coloca espaçamento entre os componentes
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
    fontFamily: fonts.heading,
    lineHeight: 34,
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  image: {
    height: Dimensions.get('window').width * 0.7, // Recurso RN para pegar a dimensão da tela de maneira dinamica
  },

  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },

  buttonIcon: {
    color: colors.white,
    fontSize: 32,
  },
});