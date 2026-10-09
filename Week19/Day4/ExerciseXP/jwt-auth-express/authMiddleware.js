const jwt = require('jsonwebtoken');

const ACCESS_SECRET = 'fallback_secret_key';
const REFRESH_SECRET = 'refresh_secret_key';

									 
function authenticateJWT(req, res, next) {
  const accessToken = req.cookies.token;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token not found' });
  }

  jwt.verify(accessToken, ACCESS_SECRET, (err, user) => {
    if (err) {
										 
      if (!refreshToken) {
        return res.status(403).json({ message: 'Token verification failed' });
      }

      jwt.verify(refreshToken, REFRESH_SECRET, (err, decodedUser) => {
        if (err) {
          return res.status(403).json({ message: 'Refresh token verification failed' });
        }

        const newAccessToken = jwt.sign(
          { id: decodedUser.id, username: decodedUser.username }, 
          ACCESS_SECRET, 
          { expiresIn: '15m' }
        );
        res.cookie('token', newAccessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });

        req.user = decodedUser;
        next();
      });
    } else {
      req.user = user;
      next();
    }
  });
}

module.exports = authenticateJWT;
