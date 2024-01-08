export async function saveImage (currentHighestId: number | null, imageSrc: string | ArrayBuffer | null) {
    try {
      const responseSaveImage = await fetch('http://localhost:3001/api/saveImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenId: currentHighestId, image: imageSrc }),
      });
  
      if (!responseSaveImage.ok) {
        console.log(`Failed to save image. Server responded with status ${responseSaveImage.status}`);
      }
  
      const data = await responseSaveImage.json();
  
      if (data.success) {
        console.log('Image saved successfully!');
      } else {
        console.error('Failed to save image:', data.error);
      }
    } catch (error: any) {
      console.error('Error saving image:', error);
      console.error(error.stack); // Log the stack trace
    }
  };
  