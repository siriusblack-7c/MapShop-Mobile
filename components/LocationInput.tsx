import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface LocationInputProps {
  onLocationSubmit: (latitude: number, longitude: number) => void;
}

interface PresetLocation {
  name: string;
  latitude: number;
  longitude: number;
}

const presetLocations: PresetLocation[] = [
  { name: 'San Francisco', latitude: 37.7749, longitude: -122.4194 },
  { name: 'New York', latitude: 40.7128, longitude: -74.0060 },
  { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503 },
  { name: 'London', latitude: 51.5074, longitude: -0.1278 },
  { name: 'Paris', latitude: 48.8566, longitude: 2.3522 },
];

const LocationInput: React.FC<LocationInputProps> = ({ onLocationSubmit }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = () => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      Alert.alert('Invalid Input', 'Please enter valid latitude and longitude values.');
      return;
    }

    if (lat < -90 || lat > 90) {
      Alert.alert('Invalid Latitude', 'Latitude must be between -90 and 90 degrees.');
      return;
    }

    if (lng < -180 || lng > 180) {
      Alert.alert('Invalid Longitude', 'Longitude must be between -180 and 180 degrees.');
      return;
    }

    onLocationSubmit(lat, lng);
  };

  const handlePresetSelect = (preset: PresetLocation) => {
    setLatitude(preset.latitude.toString());
    setLongitude(preset.longitude.toString());
    onLocationSubmit(preset.latitude, preset.longitude);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Location</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Latitude:</Text>
        <TextInput
          style={styles.input}
          value={latitude}
          onChangeText={setLatitude}
          placeholder="Enter latitude (-90 to 90)"
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Longitude:</Text>
        <TextInput
          style={styles.input}
          value={longitude}
          onChangeText={setLongitude}
          placeholder="Enter longitude (-180 to 180)"
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <MaterialIcons name="my-location" size={24} color="#fff" />
        <Text style={styles.buttonText}>Set Location</Text>
      </TouchableOpacity>

      <View style={styles.presetContainer}>
        <Text style={styles.presetTitle}>Or select a preset location:</Text>
        <ScrollView style={styles.presetList}>
          {presetLocations.map((preset, index) => (
            <TouchableOpacity
              key={index}
              style={styles.presetButton}
              onPress={() => handlePresetSelect(preset)}
            >
              <MaterialIcons name="location-on" size={20} color="#FF6B6B" />
              <Text style={styles.presetText}>{preset.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  presetContainer: {
    marginTop: 20,
  },
  presetTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  presetList: {
    maxHeight: 150,
  },
  presetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  presetText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
});

export default LocationInput; 