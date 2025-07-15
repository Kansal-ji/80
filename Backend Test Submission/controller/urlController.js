const { createShortUrl, getUrlStats, getOriginalUrl } = require('../service/urlService');

exports.shortenUrl = async (req, res) => {
  try {
    const result = await createShortUrl(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const result = await getUrlStats(req.params.shortcode);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.redirectToUrl = async (req, res) => {
  try {
    const originalUrl = await getOriginalUrl(req.params.shortcode, req);
    res.redirect(originalUrl);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
