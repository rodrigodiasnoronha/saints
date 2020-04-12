import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import 'firebase/firebase-storage';

class Fire {
    public firebaseReference = firebase;

    constructor() {
        this.init();
    }

    private init() {
        const firebaseConfig = {
            apiKey: 'AIzaSyCCyVNcaACWX_0v3DfpFT2NPKQ2BJc2EAU',
            authDomain: 'defensor-saints.firebaseapp.com',
            databaseURL: 'https://defensor-saints.firebaseio.com',
            projectId: 'defensor-saints',
            storageBucket: 'defensor-saints.appspot.com',
            messagingSenderId: '715218934071',
            appId: '1:715218934071:web:431a42a0a45ff88e1b22b2',
            measurementId: 'G-JDLZBWME55'
        };

        this.firebaseReference.initializeApp(firebaseConfig);
    }
}

export default new Fire().firebaseReference;
