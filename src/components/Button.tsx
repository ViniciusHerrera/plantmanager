import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TouchableOpacityProps } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

// Define a interface que será o tipo de parametro que temos que passar para usar o botão
// Extende as propriedades da interface do TouchableOpacityProps
interface ButtonProps extends TouchableOpacityProps {
  title: string;

}

//Desistruturando para pegar o titulo passado por props
export function Button({ title, ...props }: ButtonProps) {
  // O "..." é um spread
  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.7}
      { ...props }
    >
      <Text style={styles.text}>
        { title }
      </Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading,
  },
});