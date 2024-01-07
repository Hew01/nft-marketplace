export async function addNewUser(accountId: number, image: string): Promise<void> {
  try {
    const response = await fetch('http://localhost:3001/api/addNewUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accountId, image }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add new user. Server responded with status ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      console.log('User added successfully!');
    } else {
      console.error('Failed to add new user:', data.error);
    }
  } catch (error) {
    console.error('Error adding new user:', error);
    throw error;
  }
}

export async function updateUser(accountId: number, image: string): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3001/api/updateUser/${accountId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image }),
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
    throw error;
  }
}