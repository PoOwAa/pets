import React from 'react';
import { PetInfo, Theme } from '../types';
import { PawPrint, Heart, Coffee, MessageCircle, Info } from 'lucide-react';

interface PetCardProps {
  pet: PetInfo;
  theme: Theme;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, theme }) => {
  return (
    <div 
      className={`w-[400px] ${theme.bgColor} rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-200 hover:shadow-3xl`}
      id="pet-card"
    >
      {pet.photo && (
        <div className="w-full h-64 overflow-hidden">
          <img 
            src={pet.photo} 
            alt={pet.name} 
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
          />
        </div>
      )}
      <div className="p-8">
        <h2 className={`text-3xl font-bold ${theme.textColor} mb-6`}>{pet.name || "Pet's Name"}</h2>
        
        <div className="space-y-4">
          <div className={`flex items-center ${theme.textColor} transform transition-all duration-200 hover:translate-x-2`}>
            <PawPrint className="w-5 h-5 mr-3" />
            <span>{pet.species || "Species"}</span>
          </div>
          
          <div className={`flex items-center ${theme.textColor} transform transition-all duration-200 hover:translate-x-2`}>
            <Heart className="w-5 h-5 mr-3" />
            <span>{pet.age ? `${pet.age} years old` : "Age"}</span>
          </div>
          
          <div className={`flex items-center ${theme.textColor} transform transition-all duration-200 hover:translate-x-2`}>
            <Coffee className="w-5 h-5 mr-3" />
            <span>{pet.favoriteFood ? `Loves ${pet.favoriteFood}` : "Favorite Food"}</span>
          </div>
          
          <div className={`flex items-center ${theme.textColor} transform transition-all duration-200 hover:translate-x-2`}>
            <MessageCircle className="w-5 h-5 mr-3" />
            <span>{pet.accent ? `Speaks with ${pet.accent} accent` : "Accent"}</span>
          </div>
          
          {(pet.extraInfo || !pet.name) && (
            <div className={`flex items-center ${theme.textColor} transform transition-all duration-200 hover:translate-x-2`}>
              <Info className="w-5 h-5 mr-3" />
              <span>{pet.extraInfo || "Extra Info"}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};