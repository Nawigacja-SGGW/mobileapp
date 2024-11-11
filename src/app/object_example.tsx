import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { X, ArrowLeft, MapPin, Building, Mail } from 'lucide-react';
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
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
          
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 24 }}>
              {locationData.title}
            </Text>
            
            <View style={{ gap: 16 }}>
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                <Building color="white" size={20} />
                <Text style={{ color: 'white' }}>{locationData.buildingNo}</Text>
              </View>
              
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                <MapPin color="white" size={20} />
                <Text style={{ color: 'white' }}>{locationData.address}</Text>
              </View>
              
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                <Mail color="white" size={20} />
                <Text style={{ color: 'white' }}>{locationData.email}</Text>
              </View>
            </View>

            <Text style={{ marginTop: 24, color: '#e5e7eb' }}>
              {locationData.description}
            </Text>

            <TouchableOpacity 
              style={{ 
                backgroundColor: '#f3f4f6',
                padding: 12,
                borderRadius: 8,
                marginTop: 24,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: '#166534' }}>Nawiguj</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 32, alignItems: 'center' }}>
              <Text style={{ color: 'white', marginBottom: 16 }}>Photos</Text>
              <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
                {locationData.photos.map((_, idx) => (
                  <View 
                    key={idx}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: idx === 0 ? 'white' : '#9ca3af'
                    }}
                  />
                ))}
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
        style={{ position: 'absolute', right: 0, top: 0 }}
        onPress={() => navigation.goBack()}
      >
        <X color="white" size={20} />
      </TouchableOpacity>

      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 16 }}>
        {locationData.title}
      </Text>
      
      <View style={{ marginBottom: 16, gap: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <MapPin color="white" size={16} />
          <Text style={{ fontSize: 14, color: 'white' }}>{locationData.buildingNo}</Text>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Building color="white" size={16} />
          <Text style={{ fontSize: 14, color: 'white' }}>{locationData.address}</Text>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Mail color="white" size={16} />
          <Text style={{ fontSize: 14, color: 'white' }}>{locationData.email}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity 
          style={{ 
            flex: 1,
            backgroundColor: '#f3f4f6',
            padding: 8,
            borderRadius: 8,
            alignItems: 'center'
          }}
        >
          <Text style={{ color: '#166534' }}>Nawiguj</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ 
            flex: 1,
            backgroundColor: '#f3f4f6',
            padding: 8,
            borderRadius: 8,
            alignItems: 'center'
          }}
          onPress={() => setShowDetails(true)}
        >
          <Text style={{ color: '#166534' }}>Więcej informacji</Text>
        </TouchableOpacity>
      </View>
    </BaseModal>
  );
};

export default function Page() {
  return (
    <>
      <Drawer.Screen 
        name="object_example"
        options={{
          headerShown: true,
          title: "Object Details"
        }}
      />
      <ObjectExample />
    </>
  );
}