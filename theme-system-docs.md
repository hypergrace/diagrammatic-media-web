# Theme System - Colors & Fonts

Your site now has CSS custom properties systems for both colors and fonts, allowing for rapid theme switching.

## How It Works

CSS custom properties (variables) are defined in the `:root` selector at the top of `style.css`:

### Color System

```css
:root {
  --primary-color: #6f2dbd;    /* Main accent color (links, buttons) */
  --primary-hover: #1b065e;    /* Hover state for primary elements */
  --background-color: #232121; /* Page background */
  --text-color: #f5eccd;       /* Body text */
  --secondary-bg: #1a1a1a;     /* Cards, tiles, gallery items */
  --accent-color: #5bc3eb;     /* Secondary accent (currently unused) */
}
```

### Font System

```css
:root {
  --primary-font: "Azeret", "Golos Text", sans-serif;     /* Main body text */
  --secondary-font: "Azeret Mono", "Major Mono Display", monospace; /* Headers, hashtags, titles */

  /* Font Weight Variables */
  --font-weight-light: 300;    /* Light text, captions */
  --font-weight-normal: 400;   /* Body text, paragraphs */
  --font-weight-medium: 500;   /* Emphasized text, buttons */
  --font-weight-semibold: 600; /* Subheadings, important elements */
  --font-weight-bold: 700;     /* Main headings, strong emphasis */
}
```

## Available Themes

**1. Dark Purple (Current/Default)**

- Modern, professional look
- Purple accents with warm cream text

**2. Warm Orange**

- Energetic, creative vibe
- Orange/red accents with warm backgrounds

**3. Cool Blue**

- Clean, tech-focused appearance
- Blue accents with cool grays

**4. Forest Green**

- Natural, calming aesthetic
- Green accents with dark backgrounds

**5. Sunset**

- Bold, artistic feel
- Red/orange gradient with warm tones

## Available Font Schemes

**1. Modern Mix (Current/Default)**

- Primary: "Golos Text" - Clean, readable sans-serif
- Secondary: "Major Mono Display" - Distinctive monospace

**2. Classic Serif**

- Primary: Georgia serif - Traditional, readable
- Secondary: Monaco monospace - Clean coding font

**3. Sans Serif Clean**

- Primary: Helvetica Neue - Modern, professional
- Secondary: Courier New - Classic monospace

**4. Futura Modern**

- Primary: Futura - Geometric, contemporary
- Secondary: SF Mono - Apple's system monospace

**5. Playful Mix**

- Primary: Inter - Modern system font
- Secondary: JetBrains Mono - Developer-focused monospace

## How to Switch Themes

### Colors

1. **Open** `src/css/style.css`
2. **Find** the color `:root` section (around lines 3-35)
3. **Comment out** the current color theme by wrapping it in `/* */`
4. **Uncomment** your desired color theme by removing `/* */`
5. **Save and rebuild** the site

### Fonts

1. **Open** `src/css/style.css`
2. **Find** the font `:root` section (around lines 37-65)
3. **Comment out** the current font scheme by wrapping it in `/* */`
4. **Uncomment** your desired font scheme by removing `/* */`
5. **Save and rebuild** the site

### Example: Switching to Cool Blue Theme

```css
:root {
  /* Primary Color Scheme - Dark Purple
  --primary-color: #6f2dbd;
  --primary-hover: #1b065e;
  --background-color: #232121;
  --text-color: #f5eccd;
  --secondary-bg: #1a1a1a;
  --accent-color: #5bc3eb;
  */

  /* Cool Blue Theme */
  --primary-color: #3742fa;
  --primary-hover: #2f3542;
  --background-color: #1e272e;
  --text-color: #dfe4ea;
  --secondary-bg: #2c3e50;
  --accent-color: #00d8d6;
}
```

## What Updates Automatically

### Color Changes

When you switch color themes, these elements change automatically:

✅ **Links and buttons** (primary-color)  
✅ **Hover states** (primary-hover)  
✅ **Page background** (background-color)  
✅ **All text** (text-color)  
✅ **Project tiles** (secondary-bg)  
✅ **Gallery items** (secondary-bg)  
✅ **Hashtag filters** (primary-color)  
✅ **Lightbox elements** (text-color, primary-color)

### Font Changes

When you switch font schemes, these elements change automatically:

✅ **Body text** (primary-font)  
✅ **Headers** (secondary-font)  
✅ **Project titles** (secondary-font)  
✅ **Hashtag buttons** (secondary-font - now smaller and more subtle)  
✅ **Project placeholders** (secondary-font)

## Creating Custom Themes

You can create your own theme by:

1. **Copy** an existing theme block
2. **Change** the color values to your preferences
3. **Use** a color picker or palette generator
4. **Test** the theme by switching to it

### Best Practices:

- **Ensure sufficient contrast** between text and backgrounds
- **Keep primary and hover colors related** but distinct
- **Test on both light and dark displays**
- **Consider accessibility** (WCAG contrast guidelines)

## Recent Updates

### 🎨 NEW: Azeret Font Collection Implementation ✨

- **Custom Typography**: Added complete Azeret font family to the project
- **Three Font Families**: Azeret (sans), Azeret Mono (mono), Azeret Semi Mono (semi-mono)
- **Full Weight Range**: Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700)
- **Proper @font-face**: Optimized loading with woff2 + ttf fallbacks
- **Typography Hierarchy**: Semantic weight assignments across all elements
- **Now Default**: Azeret is the new default font scheme (Scheme 1)

### Hashtag Button Improvements ✨

- **Smaller size**: Reduced from 0.9rem to 0.7rem font size
- **Tighter padding**: More compact appearance under project headers
- **Secondary font**: Now uses the secondary font variable for consistency
- **Responsive**: Even smaller on mobile (0.6rem)

## Pro Tips

- **Mix and match**: You can combine any color theme with any font scheme
- **Preview themes quickly** by switching between them and refreshing
- **Use browser dev tools** to test colors live before editing CSS
- **Keep a backup** of your current theme before experimenting
- **Document** any custom themes you create
- **Test readability**: Ensure sufficient contrast with your chosen combinations
