import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';


export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
      }}>
      <Tabs.Screen
        name="(index)"
        
        options={{
          title: 'Home',
          href: '(tabs)/(index)/',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={"black"} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          href:"(tabs)/favorite",
          title: 'Favorite',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'heart' : 'heart-outline'} color={focused?'red':'black'} />
          ),
        }}
      />
    </Tabs>
  );
}
