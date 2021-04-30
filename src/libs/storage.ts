import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

// Criando uma interface default
export interface PlantProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  };
  dateTimeNotification: Date;
}

interface StoragePlantProps {
  [id: string]: { // Id dinamicamente
    data: PlantProps;
  }
}

// Função assincrona e o retorno é uma Promise sem retorno
export async function savePlant(plant: PlantProps): Promise<void> {
  try {
    // Busca no AsyncStorage os valores da chave
    const data = await AsyncStorage.getItem('@plantmanger:plants');

    // Convertemos o texto que o AsyncStorage armazena em um Json do tipo da nossa interface
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    //Cria um novo objeto planta com a variavel que esta sendo passada
    const newPlant = {
      [plant.id]: {
        data: plant
      }
    }

    await AsyncStorage.setItem('@plantmanger:plants',
      // Converte JSON em objeto do tipo texto
      JSON.stringify({
        ...newPlant,  // Pega nova planta e adiciona junto com a antiga
        ...oldPlants
      })
    );

  } catch (error) {
    //Captura o erro e lança pra frente (neste caso na interface)
    throw new Error(error);
  }
}


export async function loadPlant(): Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem('@plantmanger:plants');
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const plantsSorted = Object   //Cria um objeto
      .keys(plants) // Onde buscamos os IDs como chaves
      .map((plant) => { // Percorro todos elementos com o MAP
        return {
          ...plants[plant].data, // Retorno cada planta selecionada pelo ID, isso é possivel devido a interface que criamos
          hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm') // Acrescento mais um atributo data ao objeto
        }
      })
      .sort((a, b) => // a e b são apelidos similar o SQL
        Math.floor( // Função para arredondamento
          // Vamos ordernar pelo menor valor 
          new Date(a.dateTimeNotification).getTime() / 1000 - Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      );

    return plantsSorted;

  } catch (error) {
    //Captura o erro e lança pra frente (neste caso na interface)
    throw new Error(error);
  }
}