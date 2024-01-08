interface UserInformation {
    accountId: `0x${string}`;
    displayName: string;
    image: string;
}

export async function getUserInformation(accountId: `0x${string}` | undefined) {
    try {
      const response = await fetch(`http://localhost:3001/api/getUser/${accountId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        console.log(`Failed to get user. Server responded with status ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.success && data.user) {
        const { accountId, displayName, image } = data.user;
        return { accountId, displayName, image } as UserInformation;
      } else {
        console.log('Failed to get user.');
      }
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }