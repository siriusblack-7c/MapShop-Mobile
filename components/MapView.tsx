import { MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Store } from '../types';

interface MapViewProps {
  stores: Store[];
  userLocation?: {
    latitude: number;
    longitude: number;
  };
  onMarkerPress?: (store: Store) => void;
  onMapPress?: (event: any) => void;
}

const MapViewComponent: React.FC<MapViewProps> = ({ stores, userLocation, onMarkerPress, onMapPress }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Memoize the marker icon function
  const getMarkerIcon = useCallback((type: string) => {
    switch (type) {
      case 'beef':
        return 'restaurant';
      case 'fish':
        return 'set-meal';
      default:
        return 'store';
    }
  }, []);

  // Update region only when userLocation changes
  useEffect(() => {
    if (userLocation) {
      setRegion(prev => ({
        ...prev,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      }));
    }
  }, [userLocation]);

  // Memoize the onMapReady callback
  const handleMapReady = useCallback(() => {
    console.log('Map is ready');
    setIsLoading(false);
  }, []);

  const handleMapError = useCallback((error: any) => {
    console.error('Map error:', error);
    setMapError('Failed to load map. Please check your internet connection.');
    setIsLoading(false);
  }, []);

  if (mapError) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={48} color="#FF6B6B" />
        <Text style={styles.errorText}>{mapError}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        onMapReady={handleMapReady}
        onError={handleMapError}
        showsUserLocation
        showsMyLocationButton
        maxZoomLevel={18}
        minZoomLevel={3}
        moveOnMarkerPress={false}
        loadingEnabled={true}
        loadingIndicatorColor="#FF6B6B"
        loadingBackgroundColor="#ffffff"
        onPress={onMapPress}
      >
        {stores.map((store) => (
          <Marker
            key={store.id}
            coordinate={store.location}
            onPress={() => onMarkerPress?.(store)}
            tracksViewChanges={false}
          >
            <MaterialIcons
              name={getMarkerIcon(store.products[0]?.type || 'other')}
              size={30}
              color="#FF6B6B"
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default React.memo(MapViewComponent); 