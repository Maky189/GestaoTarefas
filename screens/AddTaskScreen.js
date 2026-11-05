import { useRef, useState } from 'react';
import { Button, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '../context/TasksContext';
import { validateTask } from '../domain/tasks.mjs';
import { ActionButton } from '../components/TaskUI';
import { colors, styles } from '../theme';

export default function AddTaskScreen({ navigation }) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const titleRef = useRef(null);
  const subjectRef = useRef(null);
  const dateRef = useRef(null);
  const saving = useRef(false);
  const insets = useSafeAreaInsets();

  function saveTask() {
    if (saving.current) return;
    const values = { title, subject, description, dueDate };
    const validation = validateTask(values);
    setErrors(validation);
    if (Object.keys(validation).length) {
      (validation.title ? titleRef : validation.subject ? subjectRef : dateRef).current?.focus();
      return;
    }
    saving.current = true;
    addTask(values);
    navigation.goBack();
  }

  function fieldStyle(name) {
    return [styles.input, focusedField === name && { borderColor: colors.primary }, errors[name] && { borderColor: colors.danger }];
  }

  function updateField(name, setter, value) {
    setter(value);
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={100}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.content, { paddingBottom: 24 + insets.bottom }]}>
        <View style={{ gap: 6 }}>
          <Text style={styles.eyebrow}>DO PLANO À PRÁTICA</Text>
          <Text accessibilityRole="header" style={styles.title}>O que vamos fazer?</Text>
          <Text style={styles.subtitle}>Um pequeno plano para a tua próxima conquista.</Text>
          <Text style={[styles.subtitle, { fontSize: 12 }]}>* Campos obrigatórios</Text>
        </View>
        <View style={{ gap: 8 }}>
          <Text style={styles.label}>Título *</Text>
          <TextInput ref={titleRef} accessibilityLabel="Título obrigatório" placeholder="Ex.: Preparar apresentação final"
            placeholderTextColor={colors.muted} value={title} maxLength={120} style={fieldStyle('title')}
            onChangeText={(value) => updateField('title', setTitle, value)} onFocus={() => setFocusedField('title')}
            onBlur={() => setFocusedField(null)} returnKeyType="next" onSubmitEditing={() => subjectRef.current?.focus()} />
          {errors.title && <Text accessibilityRole="alert" style={styles.error}>{errors.title}</Text>}
        </View>
        <View style={{ gap: 8 }}>
          <Text style={styles.label}>Disciplina *</Text>
          <TextInput ref={subjectRef} accessibilityLabel="Disciplina obrigatória" placeholder="Ex.: Programação Mobile"
            placeholderTextColor={colors.muted} value={subject} maxLength={80} style={fieldStyle('subject')}
            onChangeText={(value) => updateField('subject', setSubject, value)} onFocus={() => setFocusedField('subject')}
            onBlur={() => setFocusedField(null)} returnKeyType="next" onSubmitEditing={() => dateRef.current?.focus()} />
          {errors.subject && <Text accessibilityRole="alert" style={styles.error}>{errors.subject}</Text>}
        </View>
        <View style={{ gap: 8 }}>
          <Text style={styles.label}>Data de entrega</Text>
          <TextInput ref={dateRef} accessibilityLabel="Data de entrega" placeholder="DD/MM/AAAA"
            placeholderTextColor={colors.muted} value={dueDate} maxLength={10} style={fieldStyle('dueDate')}
            onChangeText={(value) => updateField('dueDate', setDueDate, value)} onFocus={() => setFocusedField('dueDate')}
            onBlur={() => setFocusedField(null)} autoCorrect={false} />
          {errors.dueDate ? <Text accessibilityRole="alert" style={styles.error}>{errors.dueDate}</Text> : <Text style={[styles.subtitle, { fontSize: 12 }]}>Opcional · dia/mês/ano, por exemplo 15/11/2026</Text>}
        </View>
        <View style={{ gap: 8 }}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput accessibilityLabel="Descrição" placeholder="Acrescenta os detalhes que te vão ajudar…"
            placeholderTextColor={colors.muted} value={description} maxLength={2000} multiline textAlignVertical="top"
            style={[fieldStyle('description'), { minHeight: 130 }]} onChangeText={setDescription}
            onFocus={() => setFocusedField('description')} onBlur={() => setFocusedField(null)} />
        </View>
        <View style={{ borderRadius: 12, overflow: 'hidden' }}>
          <Button title="Guardar tarefa" color={colors.primary} onPress={saveTask} />
        </View>
        <ActionButton title="Cancelar e voltar" secondary onPress={() => navigation.goBack()} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
