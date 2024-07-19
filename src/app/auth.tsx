import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';


const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        // Si l'utilisateur n'est pas sur la page de connexion, le rediriger vers la page de connexion
        if (router.pathname !== '/login') {
          router.push('/login');
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  return user;
};

export default useAuth;