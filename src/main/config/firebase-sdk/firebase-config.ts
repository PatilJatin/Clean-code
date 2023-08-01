import * as admin from 'firebase-admin';
import {serviceAccount} from './service-account'; // The path to your serviceAccount.json file


const appOptions: admin.AppOptions = {
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount), // Cast the serviceAccount to admin.ServiceAccount

};

admin.initializeApp(appOptions);

export default admin;