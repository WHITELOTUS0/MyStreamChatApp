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
import {Chat, OverlayProvider, ChannelList} from 'stream-chat-react-native'; // Or stream-chat-expo
import { StreamChat } from 'stream-chat';
import { chatApiKey, chatUserId } from './chatConfig';

const Stack = createStackNavigator();

const filters = {
  members: {
    '$in': [chatUserId]
  },
};

const sort = { last_message_at: 'desc' };

const ChannelListScreen = (props:any) => {
  return (
    <ChannelList
      filters={filters}
      sort={sort}
    />
  );
}

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
      <Stack.Screen name="ChannelList" component={ChannelListScreen} />
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
