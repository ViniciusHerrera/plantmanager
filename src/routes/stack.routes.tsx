import React from 'react';
// Importação do criador de pilha
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSelect } from '../pages/PlantSelect';

import colors from '../styles/colors';

// Cria a constante que iremos usar para controlar nossa pilha
const stackRoutes = createStackNavigator();

// Cria uma constante tipada com React Functional Components
const AppRoutes: React.FC = () => (
  //Cria nossa pilha de navegação no App
  <stackRoutes.Navigator
    // Define que não terá o Header
    headerMode="none"
    // Define as opções da tela, nesse caso layout de card com fundo branco
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      },
    }}
  >
    {/* Criando cada uma da nossas telas */}
    <stackRoutes.Screen 
      name="Welcome"
      component={Welcome}
    />

    {/* Quando for chamada a tela de navegação pelo nome ele devolve o componente mapeado */}
    <stackRoutes.Screen 
      name="UserIdentification"
      component={UserIdentification}
    />

    <stackRoutes.Screen 
      name="Confirmation"
      component={Confirmation}
    />

    <stackRoutes.Screen 
      name="PlantSelect"
      component={PlantSelect}
    />

  </stackRoutes.Navigator>
)

export default AppRoutes;