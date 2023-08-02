import admin from '@main/config/firebase-sdk/firebase-config';
import { Admin } from '@data/admin/models/admin-model';
import { Request, Response, NextFunction } from 'express';


/*
  Middleware to verify Firebase token and set user in the request object
*/
const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    
    

    if (authorization) {
      const idToken = authorization.split('Bearer ')[1];
      // Verify the Firebase token
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      console.log(decodedToken);

      // Find the user in the database using the decoded email
      const user = await Admin.findOne({ email: decodedToken.email });

      
      req.user = user; // Set the user in the request object
    } else {
      return res.status(401).json({ message: 'You are unauthorized' });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "No error"
    });
  }
};

/*
  Middleware to verify token and authorization for superadmin
*/
const verifyTokenAndAuthorizationToSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyFirebaseToken(req, res, () => {
    if (req.user && req.user.superAdmin) {
      next();
    } else {
      return res.status(403).json('You are not allowed to do that!');
    }
  });
};

/*
  Middleware to verify token and authorization for admin
*/
const verifyTokenAndAuthorizationToAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyFirebaseToken(req, res, () => {
    if (req.user && req.user.admin) {
      next();
    } else {
      return res.status(403).json('You are not allowed to do that!');
    }
  });
};

/*
  Middleware to verify token and authorization for admin or superadmin
*/
const verifyTokenAndAuthorizationToAdminAndSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyFirebaseToken(req, res, () => {
    if (req.user && (req.user.admin || req.user.superAdmin)) {
      next();
    } else {
      return res.status(403).json('You are not allowed to do that!');
    }
  });
};

/*
  Middleware to check admin's active status
*/
const adminActiveStatus = (req: Request, res: Response, next: NextFunction) => {
  verifyFirebaseToken(req, res, () => {
    if (req.user && req.user.admin) {
      if (req.user.active) {
        next();
      } else {
        return res.status(403).json('Your account is suspended!');
      }
    } else {
      return res.status(403).json('You are not allowed to do that!');
    }
  });
};

export {
  verifyFirebaseToken,
  verifyTokenAndAuthorizationToSuperAdmin,
  verifyTokenAndAuthorizationToAdmin,
  verifyTokenAndAuthorizationToAdminAndSuperAdmin,
  adminActiveStatus,
};
