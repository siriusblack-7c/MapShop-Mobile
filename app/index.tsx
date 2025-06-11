import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MapShop</Text>
      <Text style={styles.subtitle}>Choose your role to continue</Text>

      <View style={styles.buttonContainer}>
        <Link href="/(buyer)" asChild>
          <TouchableOpacity style={styles.button}>
            <MaterialIcons name="shopping-cart" size={32} color="#fff" />
            <Text style={styles.buttonText}>I'm a Buyer</Text>
            <Text style={styles.buttonDescription}>
              Find stores and products near you
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(seller)" asChild>
          <TouchableOpacity style={styles.button}>
            <MaterialIcons name="store" size={32} color="#fff" />
            <Text style={styles.buttonText}>I'm a Seller</Text>
            <Text style={styles.buttonDescription}>
              Manage your store and products
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#FF6B6B',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  buttonContainer: {
    gap: 20,
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonDescription: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
    opacity: 0.8,
  },
}); 