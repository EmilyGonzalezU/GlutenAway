import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth, 
    private firestore: Firestore,
    private router: Router) {}

  async registerUser(email: string, password: string, nombre: string): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      const userRef = doc(this.firestore, `users/${user.email}`);
      await setDoc(userRef, {
        email: user.email,
        nombre: nombre
      });

      return user;
    } catch (error) {
      console.error('No se ha podido agregar el usuario:');
    }
  }

  //Cumin sun inicio con Google

  async loginUser(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      const userRef = doc(this.firestore, `users/${user.email}`);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        return user;
      } else {
        throw new Error('El correo no existe.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  isLoggedIn(): boolean {
    const user = this.auth.currentUser;
    return user !== null;  //
  }

  // Method  logOut
  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);  
    });
  }
}
