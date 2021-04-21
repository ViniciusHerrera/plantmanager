import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps} from 'react-native';

import colors from '../styles/colors';

// Define a interface que será o tipo de parametro que temos que passar para usar o botão
// Extende as propriedades da interface do TouchableOpacityProps
interface ButtonProps extends TouchableOpacityProps {
  title: string;
};

//Desistruturando para pegar o titulo passado por props
export function Button({ title, ...props } : ButtonProps) {
  // O "..." é um spread
  return (
    /* Propriedade activeOpacity controla como o botão vai piscar na hora de clicado */
    <TouchableOpacity 
      style={styles.button}
      activeOpacity={0.7}
      { ...props }
    >
      <Text style={styles.buttonText}>
        { title }
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },

  buttonText: {
    color: colors.white,
    fontSize: 24,
  },
});