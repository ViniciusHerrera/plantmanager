import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'; // Importação de um outro tipo de botão

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean; // A interrogação é typescript e informa que não é obrigatório
}

export function EnviromentButton({ title, active = false, ...props } : EnviromentButtonProps) {
  return (
    <RectButton 
      style={[
        styles.container,
        active && styles.containerActive // Operador de curto circuito que acrescenta um estilo caso verdadeiro
      ]}
      {...props}
    >
      <Text 
        style={[
          styles.text,
          active && styles.textActive
        ]}>
        { title }
      </Text>
    </RectButton>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    width: 76,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginRight: 5,
  },
  containerActive: {
    backgroundColor: colors.green_light,
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text,
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  },
});