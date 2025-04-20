import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Appbar, FAB, Portal, Dialog, Button } from 'react-native-paper';
import TaskItem from '../components/TaskItem';
import TaskInput from '../components/TaskInput';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const addTask = (text) => {
    if (text.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text, completed: false }]);
      setIsAddingTask(false);
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const showDeleteDialog = (id) => {
    setTaskToDelete(id);
    setDeleteDialogVisible(true);
  };

  const deleteTask = () => {
    setTasks(tasks.filter((task) => task.id !== taskToDelete));
    setDeleteDialogVisible(false);
    setTaskToDelete(null);
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No tasks yet. Add one to get started!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Simple Task Manager" />
      </Appbar.Header>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleTask}
            onDelete={() => showDeleteDialog(item.id)}
          />
        )}
        style={styles.list}
        ListEmptyComponent={renderEmptyList}
      />

      {isAddingTask && (
        <TaskInput
          onAddTask={addTask}
          onCancel={() => setIsAddingTask(false)}
        />
      )}

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setIsAddingTask(true)}
      />

      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={() => setDeleteDialogVisible(false)}>
          <Dialog.Title>Delete Task</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this task?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>Cancel</Button>
            <Button onPress={deleteTask} textColor="red">Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
}); 