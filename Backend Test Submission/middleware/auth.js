module.exports = (req, res, next) => {
  const clientId = req.headers.clientid;
  const clientSecret = req.headers.clientsecret;

  if (!clientId || !clientSecret) {
    return res.status(401).json({ error: 'Missing credentials' });
  }
  if (clientId !== 'a6659aa1-f8b8-486a-bb5f-61fbaf37ae3e' || clientSecret !== 'xPJcQNffRdmwSGFV') {
    return res.status(403).json({ error: 'Invalid credentials' });
  }

  next();
};
