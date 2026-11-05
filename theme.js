import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#5246C7',
  primarySoft: '#EEECFB',
  background: '#F7F8FA',
  card: '#FFFFFF',
  ink: '#20273B',
  muted: '#657087',
  border: '#E3E6EE',
  green: '#19765C',
  greenSoft: '#E8F5EE',
  amber: '#865809',
  amberSoft: '#FFF3D9',
  danger: '#B33045',
};

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', padding: 24, paddingBottom: 32, gap: 20 },
  eyebrow: { color: colors.primary, fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  title: { fontSize: 30, lineHeight: 38, fontWeight: '800', letterSpacing: -0.8, color: colors.ink },
  subtitle: { fontSize: 15, lineHeight: 23, color: colors.muted },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.ink },
  card: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, padding: 20, borderRadius: 18, gap: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  button: { minHeight: 50, borderRadius: 12, paddingHorizontal: 18, paddingVertical: 14, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  buttonText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  secondaryButton: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  secondaryText: { color: colors.primary },
  pressed: { opacity: 0.7 },
  label: { fontSize: 14, color: colors.ink, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14, minHeight: 50, fontSize: 16, color: colors.ink, backgroundColor: colors.card },
  error: { fontSize: 13, lineHeight: 19, color: colors.danger },
  divider: { height: 1, backgroundColor: colors.border },
});
