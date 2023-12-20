import React, { useState } from 'react';
import { MintNFTButton } from '@/components/TokenInteraction/Buttons/MintNFTButton';

const NFTTestView: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {selectedImage && (
        <MintNFTButton img={selectedImage} src={imageSrc} onSuccess={() => console.log('Mint success')} />
      )}
    </div>
  );
};

export default NFTTestView;
