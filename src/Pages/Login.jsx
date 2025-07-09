import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, mdp);
            navigate("/dashboard");
        } catch (e) {
            alert("Erreur de connexion : " + e.message);
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl mb-6">Connexion</h2>
                <input type="email" placeholder="Email"
                       className="w-full p-2 mb-4 rounded bg-gray-700"
                       onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Mot de passe"
                       className="w-full p-2 mb-4 rounded bg-gray-700"
                       onChange={(e) => setMdp(e.target.value)} />
                <button onClick={handleLogin}
                        className="bg-green-500 w-full py-2 rounded hover:bg-green-600">Se connecter</button>
            </div>
        </div>
    );
}
