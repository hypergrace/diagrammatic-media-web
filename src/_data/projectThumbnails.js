const fs = require("fs");
const path = require("path");

module.exports = function () {
  const projectsDir = "./src/projects";
  const thumbnails = {};
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];

  try {
    if (fs.existsSync(projectsDir)) {
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

          projectFolders.forEach((slug) => {
            const thumbPath = path.join(catPath, slug, "thumbnail");
            try {
              if (!fs.existsSync(thumbPath)) return;
              const files = fs
                .readdirSync(thumbPath)
                .filter((file) =>
                  imageExtensions.includes(path.extname(file).toLowerCase())
                )
                .sort();
              if (files.length > 0) {
                thumbnails[slug] = `/projects/${cat}/${slug}/thumbnail/${files[0]}`;
              }
            } catch (err) {
              // skip missing dirs
            }
          });
        } catch (err) {
          // skip
        }
      });
    }
  } catch (err) {
    console.warn("Could not read projects dir:", err.message);
  }

  return thumbnails;
};
