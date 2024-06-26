export async function updateUser(accountId: `0x${string}` | undefined, displayName: string, image: string | ArrayBuffer | null) {
  try {
    const response = await fetch(`http://localhost:3001/api/updateUser/${accountId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ displayName, image }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user. Server responded with status ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      console.log('User updated successfully!');
    } else {
      console.error('Failed to update user:', data.error);
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
}
