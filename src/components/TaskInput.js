import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';

/**
 * TaskInput Component
 * Modal input for adding new tasks
 * @param {Object} props - Component props
 * @param {Function} props.onAddTask - Callback function to add a new task
 * @param {Function} props.onCancel - Callback function to cancel task addition
 */
export default function TaskInput({ onAddTask, onCancel }) {
  const [text, setText] = useState('');
  const theme = useTheme();

  /**
   * Handles task submission
   * Validates input and calls onAddTask callback
   */
  const handleSubmit = () => {
    onAddTask(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="New Task"
        value={text}
        onChangeText={setText}
        style={styles.input}
        autoFocus
        placeholder="Enter task description"
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={onCancel}
          style={styles.button}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          disabled={!text.trim()}
        >
          Add Task
        </Button>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 4,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
}); 