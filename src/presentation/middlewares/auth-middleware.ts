const admin = require('@main/config/firebase-sdk/firebase-config');
const { Admin } = require('../../models/models.index');

/*
  Middleware to verify Firebase token and set user in the request object
*/
const verifyFirebaseToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const idToken = authorization.split('Bearer ')[1];

      // Verify the Firebase token
      const decodedToken = await admin.auth().verifyIdToken(idToken);

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
      message: error.message,
    });
  }
};

/*
  Middleware to verify token and authorization for superadmin
*/
const verifyTokenAndAuthorizationToSuperAdmin = (req, res, next) => {
  verifyFirebaseToken(req, res, () => {
    if (req.user.superAdmin) {
      next();
    } else {
      return res.status(403).json('You are not allowed to do that!');
    }
  });
};

/*
  Middleware to verify token and authorization for admin
*/
const verifyTokenAndAuthorizationToAdmin = (req, res, next) => {
  verifyFirebaseToken(req, res, () => {
    if (req.user.admin) {
      next();
    } else {
      return res.status(403).json('You are not allowed to do that!');
    }
  });
};

/*
  Middleware to verify token and authorization for admin or superadmin
*/
const verifyTokenAndAuthorizationToAdminAndSuperAdmin = (req, res, next) => {
  verifyFirebaseToken(req, res, () => {
    if (req.user.admin || req.user.superAdmin) {
      next();
    } else {
      return res.status(403).json('You are not allowed to do that!');
    }
  });
};

/*
  Middleware to check admin's active status
*/
const adminActiveStatus = (req, res, next) => {
  verifyFirebaseToken(req, res, () => {
    if (req.user.admin) {
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

module.exports = {
  verifyFirebaseToken,
  verifyTokenAndAuthorizationToSuperAdmin,
  verifyTokenAndAuthorizationToAdmin,
  verifyTokenAndAuthorizationToAdminAndSuperAdmin,
  adminActiveStatus,
};