import React, { useState } from 'react';
import {
  SafeAreaView, StyleSheet, View, Text, TextInput
  , KeyboardAvoidingView, Platform, TouchableWithoutFeedback
  , Keyboard, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

// Importação da lib para armazenar os dados na memoria interna do celular
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {
  const navigation = useNavigation(); // Recurso do react para fazer a navegação nas telas

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>(); // Utilizando tipagem para a variável

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value); //Transforma a string em boolean, se tem valor = 1 se não tem = 0
    setName(value);
  }

  async function handleSubmit() {
    if (!name)
      return Alert.alert('Aaaaah...', 'Me diz como chamar você 😥');

    try {
      // Chamar o armazenamento na memoria
      await AsyncStorage.setItem('@plantmanager:user', name);
      navigation.navigate('Confirmation', {
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect',
      }); // Navega para a tela cujo nome definimos na nossa pilha de navegação
    } catch {
      return Alert.alert('Atenção', 'Não foi possível salvar o seu nome!');
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Utilizado para evitar que o teclado apareça emcima dos componentes */}
      <KeyboardAvoidingView
        style={styles.container}
        //Verifica qual plataforma estamos utilizando e define o comportamento
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

        {/* Para quando clicar fora do campo texto o aplicativo deve recolher o teclado */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>

              {/* Utilizamos essa view para agrupar os componentes, assim quando abrir o teclado ele sobe mais macio */}
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  {isFilled ? '😄' : '😀' /* If ternario para definir qual icone será apresentado */}
                </Text>

                <Text style={styles.title}>
                  Como podemos {'\n'}
                  chamar você?
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green } // Operador de curto circuito
                ]}
                placeholder="Digite um nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />

              <View style={styles.footer}>
                <Button
                  title="Confirmar"
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  content: {
    flex: 1,
    width: '100%',
  },

  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },

  header: {
    alignItems: 'center',
  },

  emoji: {
    fontSize: 44,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },

  title: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 32,
    marginTop: 20,
  },

  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  },
});