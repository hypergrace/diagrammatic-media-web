const fs = require("fs");
const path = require("path");

module.exports = function () {
  const projectsImageDir = "./src/assets/projects";
  const projectGalleries = {};

  try {
    // Check if the projects directory exists
    if (fs.existsSync(projectsImageDir)) {
      // Get all subdirectories (project folders)
      const projectFolders = fs
        .readdirSync(projectsImageDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

      // For each project folder, get all image files
      projectFolders.forEach((folder) => {
        const folderPath = path.join(projectsImageDir, folder);
        const imageExtensions = [
          ".jpg",
          ".jpeg",
          ".png",
          ".gif",
          ".webp",
          ".svg",
        ];

        try {
          const files = fs
            .readdirSync(folderPath)
            .filter((file) => {
              const ext = path.extname(file).toLowerCase();
              return imageExtensions.includes(ext);
            })
            .sort(); // Sort alphabetically

          if (files.length > 0) {
            projectGalleries[folder] = files.map((file) => ({
              filename: file,
              path: `/assets/projects/${folder}/${file}`,
              name: path.parse(file).name,
              ext: path.extname(file),
            }));
          }
        } catch (err) {
          console.warn(`Could not read project folder ${folder}:`, err.message);
        }
      });
    }
  } catch (err) {
    console.warn("Could not read projects image directory:", err.message);
  }

  return projectGalleries;
};
