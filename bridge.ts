import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getCurrentUser, getUserData } from "./firestore";

const db = getFirestore();


export const createBridgeUser = async ()  => {
  try {
    const response = await fetch('/api/bridge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: 'users',
        body: {},
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

export const getBridgeToken = async (user_uuid: string) => {
  try {
      const response = await fetch('/api/bridge', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: 'authenticate',
          body: {"user_uuid": user_uuid}
        })
    });

    if (!response.ok) {
        throw new Error('Failed to get token');
      }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch token:', error);
  }
}

export const getSession = async () => {
  try {
    const user = await getUserData();
    const token = await isTokenValid()
    const response = await fetch('/api/bridge', {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: 'connect/items/add',
          'token': token,
          body: {
            "prefill_email": user.email,
            "country": "fr"
        }
    })})
    if (!response.ok) {
        throw new Error('Failed to get item');
      }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch session:', error);
  }
}

export const isTokenValid = async  () => {
    const user = await getUserData()
    
    const currentTime = new Date().getTime();
    const expirationTime = new Date(user.expirationBridgeToken).getTime();
  
      if (currentTime < expirationTime) {
        return user.bridgeToken;
      } else {
        return await refreshAccessToken(user.bridge_uuid);
      }
  }

export const refreshAccessToken = async  (uuid: string) => {
    const user = await getCurrentUser();
    const userDoc = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDoc);
    
    if (userSnap.exists()) {
      const tokens = await getBridgeToken(uuid, user.uid);
  
      await updateDoc(userDoc, {
        bridgeToken: tokens.access_token,
        expirationBridgeToken: tokens.expires_at
      });
      return tokens.accessToken;
    } else {
      throw new Error("Utilisateur non trouvé");
    }
  }