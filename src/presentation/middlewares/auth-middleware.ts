import { Request, Response, NextFunction } from 'express';

import { Admin } from '@data/admin/models/admin-model';
import { AdminModel } from '@domain/admin/entities/admin';


const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
2
    if (authorization) {
      const idToken = authorization.split('Bearer ')[1];

      // Find the user in the database using the decoded email
      const user: AdminModel | null = await Admin.findOne({ email: idToken });

      req.user = user; // Set the user in the request object

    } else {
      return res.status(401).json({ message: 'You are unauthorized' });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

/*
  Middleware to verify token and authorization for superadmin
*/
const verifyTokenAndAuthorizationToSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyFirebaseToken(req, res, () => {
    if (req.user?.superAdmin) {
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
    if (req.user?.admin) {
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
    if (req.user?.admin || req.user?.superAdmin) {
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
    if (req.user?.admin) {
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
