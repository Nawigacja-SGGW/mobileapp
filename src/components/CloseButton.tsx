import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

interface CloseButtonProps {
  onClose: () => void;
}
const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <TouchableOpacity onPress={onClose}>
      <View className="flex h-12 w-12 items-center justify-center rounded-full bg-[#315142]">
        <Text>
          <AntDesign name="close" size={24} color="white" />
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CloseButton;
