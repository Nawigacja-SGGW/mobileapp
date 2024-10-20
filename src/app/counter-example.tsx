import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { Button } from '~/components/Button';

export default function CounterExample() {
  const [counter, setCounter] = useState<number>(0);
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="my-4 text-center text-5xl">Counter Example</Text>
      <View className="flex-row justify-center">
        <Button className="m-4 w-max" title="Decrement" onPress={() => setCounter((n) => n - 1)} />
        <Button className="m-4 w-max" title="Increment" onPress={() => setCounter((n) => n + 1)} />
      </View>
      <Text className="my-4 h-auto text-center text-3xl">Counter: {counter}</Text>
    </View>
  );
}
