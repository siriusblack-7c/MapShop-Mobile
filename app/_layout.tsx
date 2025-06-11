import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF6B6B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'MapShop',
        }}
      />
      <Stack.Screen
        name="(buyer)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(seller)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
