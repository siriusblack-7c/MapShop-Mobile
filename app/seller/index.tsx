import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapViewComponent from '../../components/MapView';
import { Product, Store } from '../../types';

const SellerScreen = () => {
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'My Store',
          headerStyle: {
            backgroundColor: '#FF6B6B',
          },
          headerTintColor: '#fff',
        }}
      />
      
      <View style={styles.mapContainer}>
        <MapViewComponent
          stores={store ? [store] : []}
          onMarkerPress={(store) => {
            // Handle marker press
          }}
        />
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add/Edit Store Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Manage Products</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Store Information</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    height: '50%',
    width: '100%',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SellerScreen; 