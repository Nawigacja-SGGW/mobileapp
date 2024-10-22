import React from 'react';
import { View, Text } from 'react-native';

import { Button } from '~/components/Button';
import { useCounterStore } from '~/store/counterStore';

export default function CounterExample() {
  const { counter, increment: inc, decrement: dec } = useCounterStore();
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="my-4 text-center text-5xl">Counter Example</Text>
      <View className="flex-row justify-center">
        <Button className="m-4 w-max" title="Decrement" onPress={dec} />
        <Button className="m-4 w-max" title="Increment" onPress={inc} />
      </View>
      <Text className="my-4 h-auto text-center text-3xl">Counter: {counter}</Text>
    </View>
  );
}
