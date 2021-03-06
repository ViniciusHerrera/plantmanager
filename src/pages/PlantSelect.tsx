import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';
import { PlantProps } from '../libs/storage';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  // Cria um estado com tipagem da nossa interface e ainda passamos  o [] para informa que se trata de uma coleção de valores
  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');
  const [loading, setLoading] = useState(true); // Inicia com loading ativo

  // Utilizado para paginação da nossa app
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  function handleEnviromentSelected(enviroment: string) {
    setEnviromentSelected(enviroment);

    if (enviroment === 'all')
      return setFilteredPlants(plants);

    const filtered = plants.filter(plant =>
      plant.environments.includes(enviroment)
    );

    setFilteredPlants(filtered);
  }

  async function fetchPlants() {
    const { data } = await api.get(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    ); // Adiciona a paginação no filtro

    if (!data) // Verifica se não tem nada para carregar
      return setLoading(true);

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]); // Pega o valor antigo e adiciona o novo valor
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data); // Pega o valor antigo e adiciona o novo valor
      setFilteredPlants(data);
    }

    setLoading(false); // Após carregar encerra a animação de loading
    setLoadingMore(false);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    fetchPlants();
  }

  function handlePlantSelect(plant: PlantProps) {
    navigation.navigate('PlantSave', { plant }); // Passa para outra tela os dados da nossa planta
  }

  // Hook do React carrega toda vez que a tela carrega, pois não definimos uma variável de controle dentro []
  useEffect(() => {
    // Criando função assincrona
    async function fetchEnviroment() {
      // desestrutura o retorno depois de aguardar o retorno da nossa api
      const { data } = await api.get(
        'plants_environments?_sort=title&_order=asc'
      ); // Busca na rota da nossa api passando uma ordernção e o sort 
      setEnviroments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data,
      ]);
    }

    fetchEnviroment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading)
    return <Load />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>Em qual hambiente</Text>

        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        {/* Recurso para criar uma lista de objetos no React-Native */}
        <FlatList
          data={enviroments}
          keyExtractor={(item) => String(item.key)} // As listas precisam de um identificador unico
          renderItem={({ item }) => ( //desestruturando e pegando o item
            <EnvironmentButton
              title={item.title}
              active={item.key === enviromentSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
          horizontal // Mostra na horizontal
          showsHorizontalScrollIndicator={false} // Desabilita a barra de scroll horizontal
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)} // É considerado boa pratica transformar id em String
          renderItem={({ item }) => ( //desestruturando e pegando o item
            <PlantCardPrimary
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1} //Ao chegar a 10% do final da tela
          onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)} // Chama nossa função ao chegar ao final da lista
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingHorizontal: 32, // Alterado para padding Horizontal, pois estava cortando ultimo elemneto
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  }
});