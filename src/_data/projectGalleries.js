const fs = require("fs");
const path = require("path");

module.exports = function () {
  const projectsDir = "./src/projects";
  const projectGalleries = {};
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];

  try {
    if (fs.existsSync(projectsDir)) {
      // Top-level dirs are now category folders
      const categoryFolders = fs
        .readdirSync(projectsDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);

      categoryFolders.forEach((cat) => {
        const catPath = path.join(projectsDir, cat);
        try {
          const projectFolders = fs
            .readdirSync(catPath, { withFileTypes: true })
            .filter((d) => d.isDirectory())
            .map((d) => d.name);

          projectFolders.forEach((folder) => {
            const galleryPath = path.join(catPath, folder, "gallery");
            try {
              if (!fs.existsSync(galleryPath)) return;
              const files = fs
                .readdirSync(galleryPath)
                .filter((file) =>
                  imageExtensions.includes(path.extname(file).toLowerCase())
                )
                .sort();

              if (files.length > 0) {
                projectGalleries[folder] = files.map((file) => ({
                  filename: file,
                  path: `/projects/${cat}/${folder}/gallery/${file}`,
                  name: path.parse(file).name,
                  ext: path.extname(file),
                }));
              }
            } catch (err) {
              console.warn(`Could not read gallery for ${folder}:`, err.message);
            }
          });
        } catch (err) {
          console.warn(`Could not read category folder ${cat}:`, err.message);
        }
      });
    }
  } catch (err) {
    console.warn("Could not read projects directory:", err.message);
  }

  return projectGalleries;
};
