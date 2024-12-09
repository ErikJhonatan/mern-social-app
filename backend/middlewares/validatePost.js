import mongoose from 'mongoose';

export function validatePostId(req, res, next) {
  if (!mongoose.isObjectIdOrHexString(req.params.id)) {
    return res.status(400).json({ message: 'ID de publicación inválido' });
  }
  next();
}

export function validatePostBody(req, res, next) {
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ message: 'Publicación inválida' });
  }
  if (Object.keys(body).some(key => !['desc', 'img', 'userId'].includes(key)) ||
      (body.userId !== undefined && body.userId !== req.auth.id) ||
      (body.desc !== undefined && (typeof body.desc !== 'string' || body.desc.length > 500)) ||
      (body.img !== undefined && (typeof body.img !== 'string' ||
        (body.img !== '' && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(body.img))))) {
    return res.status(400).json({ message: 'Datos de publicación inválidos' });
  }
  const hasChanges = body.desc !== undefined || body.img !== undefined;
  if (!hasChanges || (req.method === 'POST' && !body.desc?.trim() && !body.img)) {
    return res.status(400).json({ message: 'La publicación necesita texto o imagen' });
  }
  req.postData = Object.fromEntries(['desc', 'img'].filter(key => body[key] !== undefined).map(key => [key, body[key]]));
  next();
}
