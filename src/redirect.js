import { signInWithGoogle } from "./firebaseAuth"

function redirect() {
    const btnGoogle = document.getElementById('btn-google')
    btnGoogle.addEventListener('click', signInWithGoogle)
}