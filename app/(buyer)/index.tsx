import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapViewComponent from '../../components/MapView';
import { Store } from '../../types';

export default function BuyerScreen() {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize the store selection handler
  const handleStorePress = useCallback((store: Store) => {
    setSelectedStore(store);
  }, []);

  // Memoize the modal close handler
  const handleCloseModal = useCallback(() => {
    setSelectedStore(null);
  }, []);

  const checkLocationPermission = async () => {
    try {
      const { status: existingStatus } = await Location.getForegroundPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert(
          'Location Permission Required',
          'Please enable location services to see stores near you.',
          [
            { text: 'OK', onPress: () => setIsLoading(false) }
          ]
        );
        return false;
      }

      return true;
    } catch (error) {
      console.log('Error checking location permission:', error);
      return false;
    }
  };

  const getCurrentLocation = async () => {
    try {
      const hasPermission = await checkLocationPermission();
      if (!hasPermission) {
        // Set default location if permission is not granted
        setUserLocation({
          latitude: 37.78825,
          longitude: -122.4324,
        });
        return;
      }

      // Check if location services are enabled
      const enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        Alert.alert(
          'Location Services Disabled',
          'Please enable location services to see stores near you.',
          [
            { text: 'OK', onPress: () => setIsLoading(false) }
          ]
        );
        // Set default location if location services are disabled
        setUserLocation({
          latitude: 37.78825,
          longitude: -122.4324,
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.log('Error getting location:', error);
      // Set default location if getting location fails
      setUserLocation({
        latitude: 37.78825,
        longitude: -122.4324,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (isMounted) {
        // Load mock data immediately
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

        await getCurrentLocation();
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
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
          stores={stores}
          userLocation={userLocation || undefined}
          onMarkerPress={handleStorePress}
        />
      </View>

      <Modal
        visible={!!selectedStore}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
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