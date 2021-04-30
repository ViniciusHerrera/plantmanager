import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Alert, Image
  , ScrollView, Platform, TouchableOpacity
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/core';
// Importação para uso do recurso de DatePicker
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';
import { Button } from '../components/Button';
import { PlantProps, savePlant } from '../libs/storage';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  plant: PlantProps;
}

export function PlantSave() {
  const route = useRoute(); //Usamos o Route para recuperar os dados passado pela página anterior
  const { plant } = route.params as Params; //Pegamos a planta de maneira tipada usando a interface

  const [selectedDateTime, setSelecterdDateTime] = useState(new Date()); //Declara que sera do tipo data
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

  const navigation = useNavigation();

  function handleChangeTime(event: Event, dateTime: Date | undefined) { // Pode receber uma data ou indefinido
    if (Platform.OS === "android") {
      setShowDatePicker((oldState) => !oldState); // Pega o esta anterior e inverte
    }

    // Verifica se existe uma data e se ela antiga em relação a nova data(Atual)
    if (dateTime && isBefore(dateTime, new Date())) {
      setSelecterdDateTime(new Date());

      return Alert.alert('Opa!', 'Escolha uma hora no futuro! ⏰');
    }

    if (dateTime)
      setSelecterdDateTime(dateTime);
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker((oldState) => !oldState);
  }

  async function handleSave() {
    // Utilizamos o Try Catch  porque estamos lançando o erro no storage.ts
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants',
      });
    } catch {
      Alert.alert('Eita!', 'Não foi possível salvar... 😥');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>

        <SvgFromUri
          uri={plant.photo}
          height={150}
          width={150}
        />

        <Text style={styles.plantName}>
          {plant.name}
        </Text>

        <Text style={styles.plantAbout}>
          {plant.about}
        </Text>

      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>

          <Image
            source={waterdrop}
            style={styles.tipImage}
          />

          <Text style={styles.tipText}>
            {plant.water_tips}
          </Text>

        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
        </Text>

        {
          showDatePicker &&
          (<DateTimePicker
            value={selectedDateTime}
            mode="time" // modo de operação
            display="spinner"
            onChange={handleChangeTime}
          />)
        }

        {
          Platform.OS === "android" && (
            <TouchableOpacity
              onPress={handleOpenDateTimePickerForAndroid}
              style={styles.dateTimePickerButton}
            >
              <Text style={styles.dateTimePickerText}>
                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
              </Text>
            </TouchableOpacity>
          )
        }

        <Button
          title="Cadastrar Planta"
          onPress={handleSave}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 70,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify',
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});