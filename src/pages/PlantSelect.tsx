import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList, // renderizar listas
    ActivityIndicator
} from 'react-native';
import { EnviromentButton } from '../components/EnviromentButton';
import {Load} from '../components/Load';
import { Header } from '../components/Header';
import { PlantsCardPrimary } from '../components/PlantsCardPrimary';
import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentProps {
    key: string;
    title: string;
}

interface PlantsProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number,
        repeat_every: string
    };
}

export function PlantSelect() {
    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantsProps[]>([]);
    const [filteredplants, setFilteredPlants] = useState<PlantsProps[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState('all');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); //verifica o numero de paginas
    const [loadingMore, setLoadingMore] = useState(false);//valida se tem mais uma pagina a ser render
    const [loadedAll, setLoadedAll] = useState(false)//

    useEffect(() => { // carrega antes da tela ser carregada
        async function fetchEnviroment() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');
            setEnviroments(data);
        }

        fetchEnviroment();
    }, [])

    useEffect(() => { // carrega antes da tela ser carregada

        fetchPlants();
    }, [])

    async function fetchPlants() {
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limite=8`);
        if(!data){
            return setLoading(true); //valida se não tem plantas fica carregando
        }
        if(page>1){
            //valida se tiver mais de uma pagina para quando trocar de pagina mostrar as proximas
            setPlants(oldValue=> [...oldValue,...data]);
            setFilteredPlants(oldValue=> [...oldValue,...data]);
        }else{
            setPlants(data);
            setFilteredPlants(data);
        }
        setLoadingMore(false);
        setLoading(false);
    }

    function handleEnvironmentSelected(environment:string){
        setEnvironmentSelected(environment);
        if(environment == 'all'){
            return setFilteredPlants(plants)
        }
        const filtered = plants.filter(plant=>
            plant.environments.includes(environment)
        );
        setFilteredPlants(filtered);
    }


    //criando api para usuario conforme ele vai rolando
    function handlefetchMore(distance: number){
        if(distance <1)
            return;
        setLoadingMore(true);
        setPage(oldValue => oldValue +1);
        fetchPlants();
    }

    if(loading){
        return < Load/>
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>
                    Em qual ambiente
            </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
            </Text>
            </View>

            <View>
                <FlatList
                    data={enviroments}
                    renderItem={({ item }) => (
                        <EnviromentButton
                            key={item.key}
                            title={item.title}
                            active={item.key === environmentSelected}
                            onPress={()=>handleEnvironmentSelected(item.key)}
                        />
                    )}
                    horizontal // lista horizontal
                    showsHorizontalScrollIndicator={false} // retirar scroll visual
                    contentContainerStyle={styles.enviromentList} // estilizar a lista
                    ListHeaderComponent={<View />} // visualizar
                    ListHeaderComponentStyle={{ marginHorizontal: 5 }} // margin nao funciona muito bem com listas no style
                />
            </View>
            <View style={styles.plants}>
                <FlatList
                    data={filteredplants}
                    renderItem={({item})=>(
                        <PlantsCardPrimary key={item.id} data={item}/>
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.3}
                    onEndReached={({distanceFromEnd})=> handlefetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore ?
                            <ActivityIndicator color={colors.green}/>
                        : <></>
                    }
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },

    header: {
        paddingHorizontal: 30
    },

    title: {
        color: colors.heading,
        marginTop: 15,
        fontSize: 17,
        lineHeight: 20,
        fontFamily: fonts.heading,
    },

    subtitle: {
        color: colors.heading,
        fontSize: 17,
        lineHeight: 20,
        fontFamily: fonts.text,
    },

    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32,
    },

    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
});