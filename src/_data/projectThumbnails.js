const fs = require("fs");
const path = require("path");

// Pre-generated resized thumbnails live here (created by scripts/resize-thumbs.js)
const THUMBS_DIR = path.resolve(__dirname, "../../docs/assets/thumbs");

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
                const filename   = files[0];
                const resizedName = `${slug}-${filename}`;
                const resizedPath = path.join(THUMBS_DIR, resizedName);
                // Prefer the pre-resized copy in docs/assets/thumbs/ if it exists
                if (fs.existsSync(resizedPath)) {
                  thumbnails[slug] = `/assets/thumbs/${resizedName}`;
                } else {
                  thumbnails[slug] = `/projects/${cat}/${slug}/thumbnail/${filename}`;
                }
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
