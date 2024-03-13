/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
/* eslint-disable */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useChatClient} from './useChatClient';
import {AppProvider} from './AppContext';
import {Chat, OverlayProvider} from 'stream-chat-react-native'; // Or stream-chat-expo
import { StreamChat } from 'stream-chat';
import { chatApiKey } from './chatConfig';

const Stack = createStackNavigator();

const HomeScreen = () => <Text>Home Screen</Text>;

const chatClient = StreamChat.getInstance(chatApiKey);

const NavigationStack = () => {
  const {clientIsReady} = useChatClient();

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }
  return (
    <OverlayProvider>
      <Chat client={chatClient}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

export default () => {
  return (
    <AppProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            <NavigationStack />
          </NavigationContainer>
        </SafeAreaView>
      </GestureHandlerRootView>
    </AppProvider>
  );
};
