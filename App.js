import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const urlBase = 'https://rickandmortyapi.com/api';

  const getCharacters = async () => {
    const response = await fetch(`${urlBase}/character`);
    const result = await response.json();
    setData(result);
    // .then((response) => response.json())
    // .then((dataApi) => setData(dataApi.results))
    // .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.containerItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.textName}>{item.name}</Text>
      <Text>{`Status: ${item.status}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button onPress={getCharacters} title='Llamar API' />
      <FlatList data={data} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} style={styles.list} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  containerItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  textName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});
