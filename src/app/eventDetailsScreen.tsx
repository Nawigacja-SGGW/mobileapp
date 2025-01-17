import { useNavigation } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Drawer from 'expo-router/drawer';
import React, { useRef, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

import TopHeader from '~/components/TopHeader';
import {getDateRange} from "~/components/DateFormat";

import {useEventStore} from '~/store/useEventStore';

export default function EventDetailsScreen() {
    const { objectId } = useLocalSearchParams();
    const eventsStore = useEventStore();
    const event = eventsStore.objects.find((n) => n.id === Number(objectId));
    if (!event) return null;

    const displayData = {
        date: getDateRange(event.eventStart!, event.eventEnd),
        location: event.name ?? 'location',
        address: `${event.address?.city} ${event.address?.street} ${event.address?.postalCode}`,
        description: event.description ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        photos: [1, 2, 3]
    };

    const {t} = useTranslation();

    return (
    <>
        <Drawer.Screen
            options={{
            headerShown: true,
            header: () => <TopHeader onlyBack modeSearch={false} toggleSearchBar={() => {}} />,
            }}
        />
        <View className="flex-1 bg-[#003228]">
            {/* Header */}

            <ScrollView className="mt-28 px-4">
            {/* Title */}
            <Text className="text-white text-3xl font-bold mb-1 text-center">{displayData.date}</Text>
            <View className='mb-6 flex justify-center items-center'>
                <Text>
                    <Ionicons name="book-outline" size={45} color="black"/>
                </Text>
            </View>

            {/* Location Details */}
            <View className="gap-4 mb-12">
                <View className="flex-row items-center gap-3">
                    <Feather name="map-pin" size={20} color="white" />
                    <Text className="text-white text-lg">{displayData.location}</Text>
                </View>

                <View className="flex-row items-center gap-3">
                    <FontAwesome5 name="building" size={20} color="white" />
                    <Text className="text-white text-lg w-[300px] flex-wrap">{displayData.address}</Text>
                </View>
            </View>

            {/* Description */}
            <Text className="text-white text-lg leading-6 mb-6">{event.description}</Text>

            {/* Navigation Button */}
            <TouchableOpacity className="bg-white mx-auto w-[50%] py-3 rounded-3xl items-center mb-6">
                <Text className="text-[#003228] font-semibold">{t('object.navigate')}</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    </>
    );
}