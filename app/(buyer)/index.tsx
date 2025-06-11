import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LocationInput from '../../components/LocationInput';
import MapViewComponent from '../../components/MapView';
import { Store } from '../../types';

export default function BuyerScreen() {
  const router = useRouter();
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLocationInput, setShowLocationInput] = useState(true);

  const handleManualLocationSubmit = useCallback((latitude: number, longitude: number) => {
    setUserLocation({ latitude, longitude });
    setShowLocationInput(false);
  }, []);

  useEffect(() => {
    // Load mock store data
    const mockStores: Store[] = [
      {
        id: '1',
        name: 'Fresh Beef Store',
        location: { latitude: 37.78825, longitude: -122.4324 },
        owner: 'John Smith',
        description: 'Premium quality beef and meat products',
        products: [
          { id: '1', name: 'Premium Beef', price: 29.99, type: 'beef', description: 'High-quality premium beef cuts' },
          { id: '2', name: 'Wagyu Beef', price: 49.99, type: 'beef', description: 'Authentic Japanese Wagyu beef' },
        ],
      },
      {
        id: '2',
        name: 'Ocean Fish Market',
        location: { latitude: 37.78925, longitude: -122.4334 },
        owner: 'Sarah Johnson',
        description: 'Fresh seafood and fish market',
        products: [
          { id: '3', name: 'Fresh Salmon', price: 24.99, type: 'fish', description: 'Fresh Atlantic salmon' },
          { id: '4', name: 'Tuna Steak', price: 34.99, type: 'fish', description: 'Premium tuna steak' },
        ],
      },
    ];
    setStores(mockStores);
    setIsLoading(false);
  }, []);

  const handleStoreSelect = useCallback((store: Store) => {
    setSelectedStore(store);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedStore(null);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Loading stores...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userLocation ? (
        <MapViewComponent
          stores={stores}
          userLocation={userLocation}
          onMarkerPress={handleStoreSelect}
        />
      ) : (
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>Please select your location to view the map</Text>
        </View>
      )}
      
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => setShowLocationInput(!showLocationInput)}
        >
          <MaterialIcons name="edit-location" size={24} color="#fff" />
        </TouchableOpacity>
        
        {showLocationInput && (
          <View style={styles.locationInputContainer}>
            <LocationInput onLocationSubmit={handleManualLocationSubmit} />
          </View>
        )}
      </View>

      <Modal
        visible={!!selectedStore}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.storeName}>{selectedStore?.name}</Text>
            <Text style={styles.productsTitle}>Available Products:</Text>
            {selectedStore?.products.map((product) => (
              <View key={product.id} style={styles.productItem}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  locationButton: {
    backgroundColor: '#FF6B6B',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationInputContainer: {
    position: 'absolute',
    top: 60,
    right: 0,
    width: 300,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  productsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 