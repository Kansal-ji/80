const urlModel = require('../models/urlModel');
const generateShortcode = require('../utils/generateShortcode');

exports.createShortUrl = async ({ url, validity, shortcode }) => {
  if (!url) throw new Error('URL is required');

  const code = shortcode || generateShortcode();
  const expiry = new Date(Date.now() + (validity || 30) * 60000);

  const existing = await urlModel.findOne({ shortcode: code });
  if (existing) throw new Error('Shortcode already exists');

  const newUrl = await urlModel.create({
    originalUrl: url,
    shortcode: code,
    createdAt: new Date(),
    expiry,
    clicks: [],
  });

  return {
    shortLink: `http://localhost:3000/${code}`,
    expiry,
  };
};

exports.getUrlStats = async (shortcode) => {
  const data = await urlModel.findOne({ shortcode });
  if (!data) throw new Error('Shortcode not found');

  return {
    url: data.originalUrl,
    createdAt: data.createdAt,
    expiry: data.expiry,
    clicks: data.clicks.length,
    clickStats: data.clicks,
  };
};

exports.getOriginalUrl = async (shortcode, req) => {
  const data = await urlModel.findOne({ shortcode });
  if (!data) throw new Error('Invalid shortcode');

  if (new Date() > data.expiry) throw new Error('Link expired');

  data.clicks.push({
    timestamp: new Date(),
    ip: req.ip,
    referer: req.get('referer') || 'N/A',
  });

  await data.save();
  return data.originalUrl;
};
