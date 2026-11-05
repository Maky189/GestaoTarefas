import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '../context/TasksContext';
import { countTasks, filterTasks } from '../domain/tasks.mjs';
import { ActionButton, TaskCard } from '../components/TaskUI';
import { colors, styles } from '../theme';

const filters = [ ['all', 'Todas'], ['pending', 'Pendentes'], ['completed', 'Concluídas'] ];

export default function HomeScreen({ navigation }) {
  const { tasks, toggleCompleted } = useTasks();
  const [filter, setFilter] = useState('all');
  const insets = useSafeAreaInsets();
  const counts = countTasks(tasks);
  const progress = counts.total ? Math.round(counts.completed / counts.total * 100) : 0;

  function openForm() {
    setFilter('all');
    navigation.navigate('AddTask');
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <FlatList data={filterTasks(tasks, filter)} keyExtractor={(task) => task.id}
        contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ gap: 24 }}>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
              <View style={styles.row}>
                <View style={local.logo}><Text style={local.logoText}>✓</Text></View>
                <Text style={local.brand}>Campus<Text style={{ color: colors.primary }}> / </Text>Tarefas</Text>
              </View>
              <Text style={local.semester}>2026 / 27</Text>
            </View>
            <View style={{ gap: 6 }}>
              <Text style={styles.eyebrow}>O TEU ESPAÇO DE ESTUDO</Text>
              <Text accessibilityRole="header" style={styles.title}>Um passo de cada vez.</Text>
              <Text style={styles.subtitle}>Organiza as entregas. Dá espaço às tuas ideias.</Text>
            </View>
            <View style={local.progressCard}>
              <Text style={local.progressLabel}>O teu progresso</Text>
              <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'baseline' }]}>
                <Text style={local.progressNumber}>{counts.completed}<Text style={local.progressTotal}> / {counts.total} concluídas</Text></Text>
                <Text style={local.progressPercent}>{progress}%</Text>
              </View>
              <View accessible accessibilityRole="progressbar" accessibilityLabel="Progresso das tarefas"
                accessibilityValue={{ min: 0, max: counts.total || 1, now: counts.completed }} style={local.progressTrack}>
                <View style={[local.progressFill, { width: `${progress}%` }]} />
              </View>
              <Text style={local.progressHint}>{counts.total === 0 ? 'Tudo pronto para um novo começo.' : counts.pending === 0 ? 'Tudo em dia. Bom trabalho!' : `${counts.pending} ${counts.pending === 1 ? 'tarefa por concluir. Vamos a isso?' : 'tarefas por concluir. Vamos a isso?'}`}</Text>
            </View>
            <ActionButton title="+  Nova tarefa" onPress={openForm} />
            <View style={{ gap: 14, marginBottom: 2 }}>
              <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <Text accessibilityRole="header" style={styles.sectionTitle}>As minhas tarefas</Text>
                <Text style={local.total}>{counts.total} no total</Text>
              </View>
              <View accessibilityRole="tablist" style={local.filters}>
                {filters.map(([value, label]) => (
                  <Pressable key={value} accessibilityRole="tab" accessibilityState={{ selected: filter === value }}
                    onPress={() => setFilter(value)}
                    style={({ pressed }) => [local.filter, filter === value && local.activeFilter, pressed && styles.pressed]}>
                    <Text style={[local.filterText, filter === value && { color: colors.primary }]}>{label}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <TaskCard task={item} onToggle={() => toggleCompleted(item.id)}
            onOpen={() => navigation.navigate('Details', { task: item })} />
        )}
        ListEmptyComponent={
          <View style={[styles.card, { alignItems: 'center', paddingVertical: 36 }]}>
            <Text style={local.emptyIcon}>☷</Text>
            <Text style={styles.sectionTitle}>{tasks.length ? 'Nada por aqui, por agora' : 'Uma página em branco'}</Text>
            <Text style={[styles.subtitle, { textAlign: 'center' }]}>{tasks.length ? 'Não existem tarefas com este estado.' : 'Adiciona a tua primeira tarefa académica.'}</Text>
            {tasks.length > 0 && <ActionButton title="Ver todas as tarefas" secondary onPress={() => setFilter('all')} />}
          </View>
        }
        ListFooterComponent={<Text style={local.footer}>MENOS PRESSA. MAIS PROGRESSO.</Text>}
      />
    </View>
  );
}

const local = StyleSheet.create({
  logo: { width: 34, height: 34, backgroundColor: colors.primary, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  logoText: { color: '#FFFFFF', fontSize: 22, fontWeight: '700' },
  brand: { color: colors.ink, fontSize: 15, fontWeight: '700' },
  semester: { color: colors.muted, fontSize: 11 },
  progressCard: { padding: 22, backgroundColor: '#ECEAF9', borderRadius: 20, gap: 14 },
  progressLabel: { color: colors.primary, fontSize: 13, fontWeight: '600' },
  progressNumber: { color: '#352C80', fontSize: 32, fontWeight: '800' },
  progressTotal: { color: '#61588D', fontSize: 14, fontWeight: '500' },
  progressPercent: { color: colors.primary, fontSize: 15, fontWeight: '700' },
  progressTrack: { height: 6, backgroundColor: '#D9D5F1', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },
  progressHint: { fontSize: 12, lineHeight: 19, color: '#61588D' },
  total: { fontSize: 12, color: colors.muted },
  filters: { flexDirection: 'row', backgroundColor: '#EAEDF2', padding: 4, borderRadius: 12 },
  filter: { flex: 1, minHeight: 44, paddingHorizontal: 4, paddingVertical: 12, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  activeFilter: { backgroundColor: colors.card },
  filterText: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  emptyIcon: { fontSize: 32, color: colors.primary },
  footer: { color: colors.muted, textAlign: 'center', fontSize: 9, letterSpacing: 1.6, paddingVertical: 16 },
});
