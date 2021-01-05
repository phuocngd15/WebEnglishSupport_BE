export const uploadFile = (File) => {
  File.mv(`public/upload/${File.name}`, err => {
    if (err) {
      console.error(err);
    }
  });
};
