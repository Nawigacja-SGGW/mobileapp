import React, { useState } from 'react';
import { X, ArrowLeft, MapPin, Building, Mail } from 'lucide-react';
import { DrawerActions } from '@react-navigation/native';

export default function ObjectExample() {
    return (
      <Drawer.Screen 
        name="object_example"
        component={LocationDetailsModal}
      />
    );
  }

const ObjectExample = () => {
  const [showDetails, setShowDetails] = useState(false);
  
  const locationData = {
    title: "Centrum Wodne SGGW",
    buildingNo: "Budynek nr 49",
    address: "ul. Nowoursynowska 159, 02-776 Warszawa",
    email: "centrum_wodne@sggw.edu.pl",
    description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    photos: [1, 2, 3, 4] // Przykładowa lista zdjęć
  };

  const BaseModal = ({ children }) => (
    <div className="fixed inset-x-0 bottom-0 bg-green-900 text-white rounded-t-lg p-4 max-w-xl mx-auto">
      <div className="relative">
        {children}
      </div>
    </div>
  );

  if (showDetails) {
    return (
      <div className="fixed inset-0 bg-green-900 text-white">
        <div className="p-4">
          <button 
            onClick={() => setShowDetails(false)}
            className="p-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="mt-4">
            <h1 className="text-2xl font-bold mb-6">{locationData.title}</h1>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 mt-1" />
                <span>{locationData.buildingNo}</span>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1" />
                <span>{locationData.address}</span>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1" />
                <span>{locationData.email}</span>
              </div>
            </div>

            <p className="mt-6 text-gray-200">
              {locationData.description}
            </p>

            <button className="w-full bg-gray-100 text-green-900 rounded-lg py-3 mt-6">
              Nawiguj
            </button>

            <div className="mt-8">
              <h2 className="text-center mb-4">photos</h2>
              <div className="flex justify-center gap-2 mt-4">
                {locationData.photos.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-white' : 'bg-gray-400'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (


    <BaseModal>
      <button 
        className="absolute right-0 top-0"
        onClick={() => setShowDetails(false)}
      >
        <X className="w-5 h-5" />
      </button>

      <h2 className="text-xl font-bold mb-4">{locationData.title}</h2>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{locationData.buildingNo}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4" />
          <span className="text-sm">{locationData.address}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span className="text-sm">{locationData.email}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          className="flex-1 bg-gray-100 text-green-900 rounded-lg py-2"
        >
          Nawiguj
        </button>
        <button 
          className="flex-1 bg-gray-100 text-green-900 rounded-lg py-2"
          onClick={() => setShowDetails(true)}
        >
          Więcej informacji
        </button>
      </div>
    </BaseModal>
  );
};

export default LocationDetailsModal;