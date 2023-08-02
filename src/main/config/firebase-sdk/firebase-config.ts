import * as admin from 'firebase-admin';
import { serviceAccount } from './service-account'; // The path to your serviceAccount.json file


// const appOptions: admin.AppOptions = {
//     credential: admin.credential.cert(serviceAccount), // Cast the serviceAccount to admin.ServiceAccount
// };

// admin.initializeApp(appOptions);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;