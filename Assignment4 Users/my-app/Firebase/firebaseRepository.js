import firebase from 'firebase';
import 'firebase/firestore';
import {firestoreDb} from './firebaseConfiguration';

export const metricsToFirestore = (TimeStamp, Precense_Time, scrolling) => {
    const metrics = {
    TimeStamp,
    Precense_Time,
    scrolling
    };
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        const metricsCollection = firestoreDb.collection('user/${user.uid}/metrics');

        metricsCollection.add(metrics)
        .then((docRef) => console.log('Metrics Tracker', docRef.id))
        .catch((error) => console.error('There was an errpr while loading the metrics: ', error));
        }
    });
}