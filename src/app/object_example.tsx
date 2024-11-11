import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { useNavigation } from 'expo-router';

const ObjectExample = () => {
  const [showDetails, setShowDetails] = useState(false);
  const navigation = useNavigation();
  
  const locationData = {
    title: "Centrum Wodne SGGW",
    buildingNo: "Budynek nr 49",
    address: "ul. Nowoursynowska 159, 02-776 Warszawa",
    email: "centrum_wodne@sggw.edu.pl",
    description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    photos: [1, 2, 3, 4]
  };

  const BaseModal = ({ children }) => (
    <View style={{ 
      position: 'absolute', 
      bottom: 0, 
      left: 0, 
      right: 0,
      backgroundColor: '#166534', 
      padding: 16,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    }}>
      <View>{children}</View>
    </View>
  );

  if (showDetails) {
    return (
      <View style={{ flex: 1, backgroundColor: '#166534' }}>
        <ScrollView style={{ padding: 16 }}>
          <TouchableOpacity 
            onPress={() => setShowDetails(false)}
            style={{ padding: 8 }}
          >
            <FontAwesome5 name="arrow-left" color="white" size={24} />
          </TouchableOpacity>
          
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 24 }}>
              {locationData.title}
            </Text>
            
            <View style={{ gap: 16 }}>
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                <FontAwesome5 name="building" color="white" size={20} />
                <Text style={{ color: 'white' }}>{locationData.buildingNo}</Text>
              </View>
              
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                <FontAwesome5 name="map-marker-alt" color="white" size={20} />
                <Text style={{ color: 'white' }}>{locationData.address}</Text>
              </View>

              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                <FontAwesome5 name="envelope" color="white" size={20} />
                <Text style={{ color: 'white' }}>{locationData.email}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <BaseModal>
      <TouchableOpacity 
        onPress={() => setShowDetails(false)}
        style={{ alignItems: 'flex-end', marginBottom: 16 }}
      >
        <FontAwesome5 name="times" color="white" size={20} />
      </TouchableOpacity>
      {/* Rest of your modal content */}
    </BaseModal>
  );
};

export default ObjectExample;