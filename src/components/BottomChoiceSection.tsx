import { useNavigation } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {View, Text, TouchableOpacity, Animated } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export type SortFilerOption = {
    id: string;
    label: string;
  };

type BottomChoiceSectionProps = {
    slideAnim: Animated.Value;
    toggleBottomSheet: () => void;
    sortedBy: string;
    setSortedBy: React.Dispatch<React.SetStateAction<string>>;
    label :string;
    options : SortFilerOption[];
  };

export function BottomChoiceSection({
    slideAnim,
    toggleBottomSheet,
    sortedBy,
    setSortedBy,
    label,
    options,
  }: BottomChoiceSectionProps) {
    const { t } = useTranslation();
  
    const handleSelectSortOption = (optionId: string) => {
      setSortedBy(optionId);
      toggleBottomSheet();
    };
  
    return (
      <>
        <TouchableOpacity
          onPress={() => toggleBottomSheet()}
          className="absolute bottom-0 left-0 right-0 top-0"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        />
        <Animated.View
          className="absolute left-0 right-0 h-64 bg-white p-5 shadow-lg"
          style={{ top: slideAnim }}>
          <Text className="mb-2 text-xs font-extrabold text-gray-400">{t(label)}</Text>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              className="flex-row justify-between py-3"
              onPress={() => handleSelectSortOption(option.id)}>
              <Text className="text-lg font-semibold text-black">{t(option.label)}</Text>
              {sortedBy === option.id && (
                <FontAwesome6 name="circle-dot" size={20} color="[#0F9D58]" />
              )}
            </TouchableOpacity>
          ))}
        </Animated.View>
      </>
    );
  }
  