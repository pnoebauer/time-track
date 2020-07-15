import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView
} from 'react-native';
import { v4 as uuidv4 } from 'uuid'; //library to generate unique ids

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import { newTimer } from './utils/TimerUtils';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      timers: [
        {
          id: uuidv4(),
          title: "Shopping", 
          project: "Buying shoes", 
          elapsed: "8986300", 
          isRunning: true
        },
        {
          id: uuidv4(),
          title: "Running",
          project: "Sports", 
          elapsed: "3890985", 
          editFormOpen: false
        }
      ]
    };
  }

  handleCreateFormSubmit = timer => { 
    const { timers } = this.state;
    this.setState({
      timers: [newTimer(timer), ...timers],
    }); 
  };

  handleFormSubmit = attrs => { 
    const { timers } = this.state;
    this.setState({
      timers: timers.map(timer => {
          if (timer.id === attrs.id) {
            const { title, project } = attrs;
            return { 
              ...timer, 
              title, 
              project,
            }; 
          }
        return timer; 
      }),
    }); 
  };

  handleRemovePress = (id) => {
    // console.log('press',id)
    this.setState({ 
      timers: this.state.timers.filter(timer => 
        timer.id !== id)
    });
  };

  render() {
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Timers
          </Text>
        </View>
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm 
            onFormSubmit={this.handleCreateFormSubmit} 
          /> 
          {this.state.timers.map(({ id, title, project, elapsed, isRunning }, index) => {
            return (
              <EditableTimer
                key={id}
                id={id}
                title={title}
                project={project}
                elapsed={elapsed}
                isRunning={isRunning}
                onFormSubmit={this.handleFormSubmit}
                onRemovePress={this.handleRemovePress}
              />
            )
          })
        }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  titleContainer: {
    paddingTop: 35, 
    paddingBottom: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#D6D7DA',
  }, 
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerList: {
    paddingBottom: 15
  }
});
