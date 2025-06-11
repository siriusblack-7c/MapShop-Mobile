import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapViewComponent from '../../components/MapView';
import { Store } from '../../types';

const BuyerScreen = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Mock data for testing
  useEffect(() => {
    setStores([
      {
        id: '1',
        name: 'Fresh Meat Store',
        location: { latitude: 37.78825, longitude: -122.4324 },
        products: [{ id: '1', name: 'Beef Steak', price: 15.99, type: 'beef', description: 'Fresh beef steak' }],
        owner: 'John Doe',
        description: 'Best quality meat in town'
      },
      {
        id: '2',
        name: 'Ocean Fresh',
        location: { latitude: 37.78925, longitude: -122.4334 },
        products: [{ id: '2', name: 'Salmon', price: 12.99, type: 'fish', description: 'Fresh salmon' }],
        owner: 'Jane Smith',
        description: 'Fresh seafood daily'
      }
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Nearby Stores',
          headerStyle: {
            backgroundColor: '#FF6B6B',
          },
          headerTintColor: '#fff',
        }}
      />
      
      <View style={styles.mapContainer}>
        <MapViewComponent
          stores={stores}
          userLocation={userLocation || undefined}
          onMarkerPress={(store) => setSelectedStore(store)}
        />
      </View>

      <Modal
        visible={!!selectedStore}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedStore(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedStore(null)}
            >
              <MaterialIcons name="close" size={24} color="#000" />
            </TouchableOpacity>

            {selectedStore && (
              <>
                <Text style={styles.storeName}>{selectedStore.name}</Text>
                <Text style={styles.storeDescription}>{selectedStore.description}</Text>
                
                <Text style={styles.sectionTitle}>Available Products:</Text>
                {selectedStore.products.map((product) => (
                  <View key={product.id} style={styles.productItem}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>${product.price}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  storeDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
});

export default BuyerScreen; 