export const getHighestId = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/getHighestId', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        console.log(`Failed to get the highest ID. Server responded with status ${response.status}`);
      }
  
      const highestIdData = await response.json();
      let highestId = 1;
  
      if (highestIdData.success) {
        highestId = highestIdData.highestId + 1;
      }
  
      return {highestId}
    } catch (error: any) {
      console.error('Error getting highest ID:', error);
      console.error(error.stack); // Log the stack trace
    }
  };
  