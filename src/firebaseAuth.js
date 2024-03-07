import app from "./firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      window.location.href = "index.html"
      console.log(user);
      // Puedes realizar acciones adicionales después de la autenticación
    })
    .catch((error) => {
      console.error(error.message);
    });
};

export { signInWithGoogle };