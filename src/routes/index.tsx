import React from 'react';

// Para definir como será o container de navegação
import { NavigationContainer } from '@react-navigation/native';

// importa nossa pilha de navegação para utilizarmos no container
import StackRoutes from './stack.routes';

const Routes = () => (
  <NavigationContainer>
    <StackRoutes />
  </NavigationContainer>
)

export default Routes;