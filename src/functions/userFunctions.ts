// Function to add new user to the database
export async function addNewUser(accountId: string, displayName: string, image: string) {
  try {
    const response = await fetch('http://localhost:3001/api/addNewUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accountId, displayName, image }),
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
  }
}

// Function to update the username and avatar
export async function updateUser(accountId: string, displayName: string, image: string) {
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

// Function to check if user exists on the database
export async function checkUserExists(accountId: string) {
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

// Function to grab the information of the user on the database
export async function getUserInformation(accountId: string) {
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

    if (data.success) {
      const { accountId, displayName, image } = data.user;
      return { accountId, displayName, image };
    } else {
      console.log('Failed to get user.');
    }
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}