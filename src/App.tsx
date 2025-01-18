import React, { useState } from 'react';
import { ImageCropper } from './components/ImageCropper';
import { PetCard } from './components/PetCard';
import { themes } from './themes';
import { PetInfo, Theme } from './types';
import { Palette, Download, PawPrint } from 'lucide-react';
import * as htmlToImage from 'html-to-image';

const initialPetInfo: PetInfo = {
  name: '',
  species: '',
  age: '',
  favoriteFood: '',
  accent: '',
  extraInfo: '',
  photo: ''
};

function App() {
  const [petInfo, setPetInfo] = useState<PetInfo>(initialPetInfo);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);

  const handleImageCropped = (croppedImage: string) => {
    setPetInfo(prev => ({ ...prev, photo: croppedImage }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPetInfo(prev => ({ ...prev, [name]: value }));
  };

  const downloadCard = async () => {
    const card = document.getElementById('pet-card');
    if (card) {
      const dataUrl = await htmlToImage.toPng(card);
      const link = document.createElement('a');
      link.download = `${petInfo.name}-pet-card.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
      <div className="absolute inset-0 bg-repeat opacity-5 pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z' fill='%23000000'/%3E%3C/svg%3E")` }}>
      </div>
      
      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <PawPrint className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Pet ID Card Generator</h1>
            <p className="text-xl text-white/90">Create a pawsome ID card for your furry friend! 🐾</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div className="space-y-6 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <ImageCropper onImageCropped={handleImageCropped} />

              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Pet's Name"
                  value={petInfo.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white/80"
                />

                <input
                  type="text"
                  name="species"
                  placeholder="Species (e.g., Cat, Dog, Hamster)"
                  value={petInfo.species}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white/80"
                />

                <input
                  type="text"
                  name="age"
                  placeholder="Age"
                  value={petInfo.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white/80"
                />

                <input
                  type="text"
                  name="favoriteFood"
                  placeholder="Favorite Food"
                  value={petInfo.favoriteFood}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white/80"
                />

                <input
                  type="text"
                  name="accent"
                  placeholder="Accent (e.g., British, Southern)"
                  value={petInfo.accent}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white/80"
                />

                <textarea
                  name="extraInfo"
                  placeholder="Any funny or extra information about your pet"
                  value={petInfo.extraInfo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white/80 h-24"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-purple-600" />
                  <span className="text-gray-700 font-medium">Choose a Theme</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme)}
                      className={`p-4 rounded-xl ${theme.bgColor} ${
                        theme.textColor
                      } border-2 transition-all duration-200 hover:scale-105 ${
                        selectedTheme.id === theme.id
                          ? 'border-purple-500 shadow-lg scale-105'
                          : 'border-transparent'
                      }`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-purple-900">Preview</h2>
                <button
                  onClick={downloadCard}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Card
                </button>
              </div>
              <div className="flex justify-center transform hover:scale-[1.02] transition-transform duration-200">
                <PetCard pet={petInfo} theme={selectedTheme} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;