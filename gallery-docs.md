# Photo Gallery Module

A reusable photo gallery component for project pages that creates a responsive grid with lightbox functionality.

## Features

- ✅ Responsive grid (2, 3, or 4 columns)
- ✅ Click to open full-size lightbox
- ✅ Navigation with arrow keys or buttons
- ✅ Optional captions
- ✅ Hover effects and animations
- ✅ Mobile-responsive
- ✅ Multiple galleries per page
- ✅ Works with both Nunjucks and Liquid templating

## Workflows

### Option 1: Auto-Discovery Gallery (Recommended)

1. **Create project folder**: `/src/assets/projects/{project-name}/`
2. **Add all images** to that folder (supports .jpg, .jpeg, .png, .gif, .webp, .svg)
3. **Insert auto-gallery code** into your project page
4. **Build and test** - images are automatically discovered and displayed

### Option 2: Manual Gallery

1. **Add your images** to `/src/assets/img/` directory
2. **Choose template syntax** based on your page type
3. **Manually specify each image** in the gallery code
4. **Build and test** the site

## Usage

### Auto-Discovery Gallery (Easiest)

**For any project page:**

```liquid
{% assign project_folder = "project-name" %}
{% assign gallery_columns = 3 %}
{% include "auto-gallery.njk" %}
```

This automatically finds and displays ALL images from `/src/assets/projects/project-name/`:

- Supports: .jpg, .jpeg, .png, .gif, .webp, .svg
- Auto-generates captions from filenames (e.g., "workshop-performance.jpg" → "Workshop performance")
- Images sorted alphabetically
- No need to manually list each image!

### Manual Gallery (More Control)

### For Project Pages (.md files using Liquid)

**Basic 3-column gallery:**

```liquid
{% assign gallery_images = "photo1.jpg,photo2.jpg,photo3.jpg" | split: "," %}
{% assign gallery_alts = "Description 1,Description 2,Description 3" | split: "," %}
{% assign gallery_columns = 3 %}
{% include "gallery-liquid.njk" %}
```

**Gallery with captions:**

```liquid
{% assign gallery_images = "performance1.jpg,installation1.jpg" | split: "," %}
{% assign gallery_alts = "Performance documentation,Installation view" | split: "," %}
{% assign gallery_captions = "Opening night at Synthesis Center,Interactive setup" | split: "," %}
{% assign gallery_columns = 2 %}
{% include "gallery-liquid.njk" %}
```

### For Nunjucks Templates (.njk files)

**Basic gallery:**

```nunjucks
{% include "gallery.njk", {
  images: [
    { src: "/assets/img/photo1.jpg", alt: "Description 1" },
    { src: "/assets/img/photo2.jpg", alt: "Description 2" }
  ],
  columns: 3
} %}
```

**Gallery with captions:**

```nunjucks
{% include "gallery.njk", {
  images: [
    {
      src: "/assets/img/performance1.jpg",
      alt: "Performance documentation",
      caption: "Opening night performance"
    }
  ],
  columns: 2
} %}
```

## Parameters

### Liquid Version (`gallery-liquid.njk`)

- **gallery_images**: Comma-separated image filenames
- **gallery_alts**: Comma-separated alt text (same order as images)
- **gallery_captions**: Comma-separated captions (optional)
- **gallery_columns**: Number of columns (2, 3, or 4)

### Nunjucks Version (`gallery.njk`)

- **images**: Array of image objects with `src`, `alt`, `caption` properties
- **columns**: Number of columns (2, 3, or 4)

## File Structure

### Auto-Discovery Setup (Recommended)

```
src/
  assets/
    projects/
      project-name/
        image1.jpg
        image2.png
        workshop-session.jpg
        etc...
      another-project/
        photo1.jpg
        diagram.png
```

### Manual Setup

```
src/
  assets/
    img/
      photo1.jpg
      photo2.jpg
      etc...
```

## Examples

### Real Example: The Gift Project

**Folder structure:**

```
src/assets/projects/the-gift/
  ├── gift-ledger-diagram.png
  ├── participants-discussion.jpg
  └── workshop-performance.jpg
```

**Code in the-gift.md:**

```liquid
{% assign project_folder = "the-gift" %}
{% assign gallery_columns = 3 %}
{% include "auto-gallery.njk" %}
```

**Result:** Automatically creates a 3-column gallery with:

- "Gift Ledger Diagram"
- "Participants Discussion"
- "Workshop Performance"

### Benefits of Auto-Discovery

✅ **Zero maintenance** - just drop images in folder  
✅ **Auto-captions** from filenames  
✅ **Alphabetical sorting**  
✅ **Multiple file formats** supported  
✅ **No manual image listing** required  
✅ **Consistent naming** across projects

## Keyboard Navigation in Lightbox

- **Escape**: Close lightbox
- **Left Arrow**: Previous image
- **Right Arrow**: Next image

## Mobile Behavior

- 4 columns → 2 columns on tablets
- 3 columns → 2 columns on tablets
- All grids → 1 column on phones
- Captions always visible on mobile

## Troubleshooting

**Gallery displays in single column instead of grid:**
This happens when Liquid wraps gallery items in `<p>` tags. The CSS fix is already included:

```css
.gallery-grid > p {
  margin: 0;
  padding: 0;
  display: contents;
}
```

The system is production-ready and tested! 🎉
