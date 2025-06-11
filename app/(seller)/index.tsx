import { MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapViewComponent from '../../components/MapView';
import { Product, Store } from '../../types';

export default function SellerScreen() {
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelectingLocation, setIsSelectingLocation] = useState(false);

  useEffect(() => {
    // Initialize with default store if none exists
    if (!store) {
      setStore({
        id: '1',
        name: 'My Store',
        location: {
          latitude: 37.78825,
          longitude: -122.4324,
        },
        products: [],
        owner: 'Me',
        description: 'Add your store description here',
      });
    }
    setIsLoading(false);
  }, []);

  const handleMapPress = useCallback((event: any) => {
    if (isSelectingLocation) {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setStore(prev => prev ? {
        ...prev,
        location: { latitude, longitude }
      } : null);
      setIsSelectingLocation(false);
      Alert.alert(
        'Location Updated',
        'Your store location has been updated.',
        [{ text: 'OK' }]
      );
    }
  }, [isSelectingLocation]);

  const handleStartLocationSelection = useCallback(() => {
    setIsSelectingLocation(true);
    Alert.alert(
      'Select Location',
      'Tap on the map to set your store location.',
      [{ text: 'OK' }]
    );
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapViewComponent
          stores={store ? [store] : []}
          onMapPress={handleMapPress}
          onMarkerPress={() => {}}
        />
        {isSelectingLocation && (
          <View style={styles.selectionOverlay}>
            <MaterialIcons name="my-location" size={48} color="#FF6B6B" />
            <Text style={styles.selectionText}>Tap to set store location</Text>
          </View>
        )}
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.button, isSelectingLocation && styles.activeButton]}
          onPress={handleStartLocationSelection}
        >
          <MaterialIcons name="edit-location" size={24} color="#fff" />
          <Text style={styles.buttonText}>
            {isSelectingLocation ? 'Cancel Selection' : 'Change Location'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="inventory" size={24} color="#fff" />
          <Text style={styles.buttonText}>Manage Products</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="store" size={24} color="#fff" />
          <Text style={styles.buttonText}>Edit Store Info</Text>
        </TouchableOpacity>
      </View>
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
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  selectionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  selectionText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  controlsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  activeButton: {
    backgroundColor: '#FF4444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 