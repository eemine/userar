const saveFile = async (req, res) => {
  const { images } = req.files;
  const { body } = req;

  const now = new Date();

  let ext = images.name.split('.');

  if (!Array.isArray(ext) && ext.length > 1) {
    ext = images.mimeType.split('/');
  }

  const dateToString = `${now.getDay()}_${now.getMonth()}_${now.getFullYear()}`;
  images.mv(
    `${__dirname}/../public/${body.entity}/img_${body.entityId}_${dateToString}.${ext.pop()}`,
  );
  res.send(201);
};

export { saveFile };
