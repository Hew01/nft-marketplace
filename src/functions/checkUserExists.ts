export async function checkUserExists(accountId: `0x${string}` | undefined) {
    try {
      const response = await fetch(`http://localhost:3001/api/checkAccount/${accountId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        console.log(`Failed to check user existence. Server responded with status ${response.status}`);
      }
  
      const data = await response.json();
  
      return data.success; // Will be true if user exists, false if not
    } catch (error) {
      console.error('Error checking user:', error);
      return false; // Return false in case of an error
    }
  }