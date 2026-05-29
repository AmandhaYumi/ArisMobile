import { StyleSheet } from 'react-native';
import { theme } from './tema';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safe: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 110,
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0,
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
  },
  label: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  input: {
    minHeight: 48,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.xs,
  },
  button: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
  },
  buttonText: {
    color: theme.colors.text,
    fontWeight: '800',
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
