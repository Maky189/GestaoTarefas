import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '../context/TasksContext';
import { ActionButton, StatusBadge } from '../components/TaskUI';
import { colors, styles } from '../theme';

export default function DetailsScreen({ navigation, route }) {
  const { task } = route.params;
  const { tasks, toggleCompleted, deleteTask } = useTasks();
  // O parâmetro identifica a tarefa; o estado partilhado fornece a versão atual.
  const currentTask = tasks.find((item) => item.id === task.id);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const insets = useSafeAreaInsets();

  if (!currentTask) {
    return (
      <View style={styles.content}>
        <Text style={styles.title}>Tarefa indisponível</Text>
        <ActionButton title="Voltar à lista" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingBottom: 24 + insets.bottom }]}>
      <Text style={styles.eyebrow}>CADA ENTREGA CONTA</Text>
      <StatusBadge completed={currentTask.completed} />
      <Text accessibilityRole="header" style={styles.title}>{currentTask.title}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Disciplina</Text>
        <Text style={styles.subtitle}>{currentTask.subject}</Text>
        <View style={styles.divider} />
        <Text style={styles.label}>Data de entrega</Text>
        <Text style={styles.subtitle}>{currentTask.dueDate || 'Sem data de entrega'}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Sobre esta tarefa</Text>
        <Text style={[styles.subtitle, { color: colors.ink }]}>{currentTask.description || 'Sem descrição adicionada.'}</Text>
      </View>
      <ActionButton title={currentTask.completed ? 'Marcar como pendente' : '✓  Marcar como concluída'}
        onPress={() => toggleCompleted(currentTask.id)} />
      <ActionButton title="Voltar à lista" secondary onPress={() => navigation.goBack()} />
      {confirmDelete ? (
        <View style={[styles.card, { borderColor: '#E8BFC7' }]}>
          <Text accessibilityRole="alert" style={styles.label}>Eliminar esta tarefa?</Text>
          <Text style={styles.subtitle}>A tarefa será removida da lista. Esta ação não pode ser desfeita.</Text>
          <ActionButton title="Sim, eliminar tarefa" style={{ backgroundColor: colors.danger }} onPress={() => {
            deleteTask(currentTask.id);
            navigation.goBack();
          }} />
          <ActionButton title="Cancelar" secondary onPress={() => setConfirmDelete(false)} />
        </View>
      ) : <ActionButton title="Eliminar tarefa" secondary onPress={() => setConfirmDelete(true)} />}
    </ScrollView>
  );
}
