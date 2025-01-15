import React from 'react';
import { View, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import Feather from '@expo/vector-icons/Feather';

type SearchBarProps = {
    searchQuery: string;
    setSearchQuery: (text: string) => void;
};

export default function SearchBar({searchQuery, setSearchQuery}:SearchBarProps) {
    const {t} = useTranslation();

    return (
        <View className="h-15 relative mb-5 mt-36 rounded-3xl border border-[#E4E4E4] p-3">
            <View className="flex-row items-center">
            <Feather name="search" size={28} color="black" className="mr-1"/>
            <TextInput
                className="ml-8 flex-1 text-lg"
                placeholder={t('search')}
                placeholderTextColor="#000"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
            />
            </View>
        </View>
    );
}