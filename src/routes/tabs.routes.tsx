import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PlantSelect } from '../pages/PlantSelect';
import { MaterialIcons } from '@expo/vector-icons';
import { MyPlants } from '../pages/MyPlants';

import colors from '../styles/colors';

// Instancia nosso objeto de controle do bottom-tabs
const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          padding: 20,
          height: 88,
        },
      }}
    >
      <AppTab.Screen    //Rota na tabbar
        name="Nova Planta"
        component={PlantSelect} //Pagina selecionada
        options={{
          tabBarIcon: (({ size, color }) => ( //Definições do icone, o tamanho e color são pegos dinamicamentes
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ))
        }}
      />

      <AppTab.Screen    //Rota na tabbar
        name="Minhas Plantas"
        component={MyPlants} //Pagina selecionada
        options={{
          tabBarIcon: (({ size, color }) => ( //Definições do icone, o tamanho e color são pegos dinamicamentes
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ))
        }}
      />
    </AppTab.Navigator>
  )
};

export default AuthRoutes;