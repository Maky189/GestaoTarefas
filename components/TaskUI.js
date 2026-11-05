import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, styles } from '../theme';

export function ActionButton({ title, onPress, secondary = false, style, ...props }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress}
      style={({ pressed }) => [styles.button, secondary && styles.secondaryButton, style, pressed && styles.pressed]} {...props}>
      <Text style={[styles.buttonText, secondary && styles.secondaryText]}>{title}</Text>
    </Pressable>
  );
}

export function StatusBadge({ completed }) {
  return (
    <View style={[local.badge, { backgroundColor: completed ? colors.greenSoft : colors.amberSoft }]}>
      <Text style={[local.badgeText, { color: completed ? colors.green : colors.amber }]}>
        {completed ? '✓ Concluída' : '• Pendente'}
      </Text>
    </View>
  );
}

export function TaskCard({ task, onOpen, onToggle }) {
  return (
    <View style={[styles.card, local.taskCard, task.completed && local.completedCard]}>
      <View style={[styles.row, { alignItems: 'flex-start' }]}>
        <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: task.completed }}
          accessibilityLabel={`Concluir tarefa: ${task.title}`}
          accessibilityHint={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
          onPress={onToggle} style={({ pressed }) => [local.checkTouch, pressed && styles.pressed]}>
          <View style={[local.checkbox, task.completed && local.checked]}>
            {task.completed && <Text style={local.checkmark}>✓</Text>}
          </View>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel={`Ver detalhes: ${task.title}`}
          onPress={onOpen} style={({ pressed }) => [local.taskBody, pressed && styles.pressed]}>
          <Text style={local.subject}>{task.subject}</Text>
          <Text style={[local.taskTitle, task.completed && local.completedTitle]}>{task.title}</Text>
          <View style={[styles.row, { flexWrap: 'wrap', marginTop: 12, gap: 10 }]}>
            <StatusBadge completed={task.completed} />
            <Text style={local.date}>{task.dueDate || 'Sem data de entrega'}</Text>
          </View>
          <Text style={local.details}>Ver detalhes →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const local = StyleSheet.create({
  badge: { borderRadius: 7, paddingHorizontal: 9, paddingVertical: 5, alignSelf: 'flex-start' },
  badgeText: { fontSize: 12, fontWeight: '600' },
  taskCard: { padding: 14, marginBottom: 12 },
  completedCard: { backgroundColor: '#F9FCFA' },
  checkTouch: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  checkbox: { width: 24, height: 24, borderWidth: 1.5, borderColor: '#9DA6B9', borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  checked: { backgroundColor: colors.green, borderColor: colors.green },
  checkmark: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  taskBody: { flex: 1, paddingTop: 6, gap: 6 },
  subject: { fontSize: 12, lineHeight: 18, color: colors.primary, fontWeight: '600' },
  taskTitle: { fontSize: 17, lineHeight: 24, fontWeight: '700', color: colors.ink },
  completedTitle: { textDecorationLine: 'line-through', color: colors.muted },
  date: { color: colors.muted, fontSize: 12 },
  details: { color: colors.primary, fontSize: 12, fontWeight: '600', marginTop: 8, paddingVertical: 8 },
});
