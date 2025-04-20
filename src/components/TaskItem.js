import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, IconButton, useTheme } from 'react-native-paper';

/**
 * TaskItem Component
 * Displays a single task with options to toggle completion and delete
 * @param {Object} props - Component props
 * @param {Object} props.task - The task object containing id, text, and completed status
 * @param {Function} props.onToggle - Callback function to toggle task completion
 * @param {Function} props.onDelete - Callback function to delete the task
 */
export default function TaskItem({ task, onToggle, onDelete }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <List.Item
        title={task.text}
        titleStyle={task.completed ? styles.completedText : null}
        left={props => (
          <IconButton
            {...props}
            icon={task.completed ? 'check-circle' : 'circle-outline'}
            iconColor={task.completed ? theme.colors.primary : theme.colors.outline}
            onPress={() => onToggle(task.id)}
          />
        )}
        right={props => (
          <IconButton
            {...props}
            icon="delete"
            iconColor={theme.colors.error}
            onPress={onDelete}
          />
        )}
        style={styles.item}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 8,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
}); 