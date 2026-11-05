import { useRef, useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { TasksContext } from './context/TasksContext';
import { createTask, initialTasks, toggleTask } from './domain/tasks.mjs';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import { colors } from './theme';

const Stack = createNativeStackNavigator();
const navigationTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, primary: colors.primary, background: colors.background, card: colors.background, text: colors.ink },
};

export default function App() {
  // O estado partilhado mantém os três ecrãs sincronizados.
  const [tasks, setTasks] = useState(initialTasks);
  const nextId = useRef(4);

  function addTask(values) {
    const task = createTask(values, String(nextId.current++));
    setTasks((current) => [task, ...current]);
  }

  function toggleCompleted(id) {
    setTasks((current) => toggleTask(current, id));
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <SafeAreaProvider>
      <TasksContext.Provider value={{ tasks, addTask, toggleCompleted, deleteTask }}>
        <NavigationContainer theme={navigationTheme}>
          <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerShadowVisible: false,
            headerTintColor: colors.primary,
            headerTitleStyle: { fontSize: 17, fontWeight: '600' },
            headerBackTitle: 'Voltar',
            contentStyle: { backgroundColor: colors.background },
          }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalhes da tarefa' }} />
            <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Nova tarefa' }} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="dark" />
      </TasksContext.Provider>
    </SafeAreaProvider>
  );
}
