import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp, getFirestore, Timestamp, updateDoc } from 'firebase/firestore';
import {app, auth} from  './firebase'
import { onAuthStateChanged } from "firebase/auth";

const db = getFirestore(app)

export const addUser = async (userId: string, name: string, email: string, uuid: string, bridgeToken: string, expirationBridgeToken: number) => {
    await setDoc(doc(db, 'users', userId), {
      name,
      email,
      bridge_uuid: uuid,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      bridgeToken: bridgeToken,
      expirationBridgeToken: expirationBridgeToken
    });
  };
  
  // Ajouter un compte bancaire à un utilisateur
  export const addAccount = async (userId: string, accountNumber: string, bankName: string) => {
    const docRef = await addDoc(collection(db, `users/${userId}/accounts`), {
      account_number: accountNumber,
      bank_name: bankName,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
    return docRef.id;
  };
  
  // Ajouter une transaction à un compte bancaire
  export const addTransaction = async (userId: string, accountId: string, transaction: any) => {
    await addDoc(collection(db, `users/${userId}/accounts/${accountId}/transactions`), {
      ...transaction,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
  };
  
  // Ajouter une catégorie
  export const addCategory = async (categoryName: string) => {
    await addDoc(collection(db, 'categories'), {
      name: categoryName,
    });
  };
//Récuperer les données de l'utilisateur
  export const getUserData = async () => {
    const user = await getCurrentUser();
    const userDoc = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDoc);
  
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      throw new Error("No such document!");
    }
  };

  export const updateUserProfile = async (profileData : any) => {
    
    try {
      const userDoc = doc(db, 'users', profileData.uid);
      
      await updateDoc(userDoc, {
        bridgeToken: profileData.bridgeToken,
        bridge_uuid: profileData.bridge_uuid,
        email: profileData.email,
        name: profileData.name,
        updated_at: serverTimestamp()
      });
      console.log('Profil mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil :', error);
      throw new Error('Erreur lors de la mise à jour du profil');
    }
  };

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, user => {
        if (user) {
          resolve(user);
        } else {
          reject('No user is signed in.');

        }
      });
    });
  };