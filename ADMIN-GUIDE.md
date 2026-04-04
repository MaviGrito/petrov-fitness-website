# Admin Guide — Petrov Fitness CMS

## Accessing the CMS
1. Go to `https://petrovfitness.com.au/admin`
2. Log in with your Netlify Identity credentials
3. You'll see the Content Manager dashboard

## Creating a New Blog Post
1. Click **"New Blog Post"** in the Blog Posts collection
2. Fill in the required fields:
   - **Title**: The post headline
   - **Publish Date**: When to publish
   - **Category**: Select from the dropdown
   - **Featured Image**: Upload the main image (shown in blog grid)
   - **Carousel Images**: Add multiple images for the post carousel
   - **Excerpt**: 1-2 sentence summary (max 200 chars)
   - **Body**: Write your article in the markdown editor
   - **Tags**: Add relevant tags (comma-separated)
   - **Author**: Defaults to "Mikhail Petrov"
   - **Draft**: Toggle ON to save without publishing

## Adding Carousel Images
1. In the **Carousel Images** field, click **"Add carousel_images"**
2. Upload an image
3. Optionally add a caption
4. Repeat for each image (3-10 recommended)

## Markdown Basics
- `# Heading 1`, `## Heading 2`, `### Heading 3`
- `**bold text**`, `*italic text*`
- `- item` for bullet lists
- `1. item` for numbered lists
- `[link text](https://url.com)` for links
- `> blockquote text` for quotes

## Publishing vs Draft
- **Draft ON**: Saves the post but doesn't publish it to the site
- **Draft OFF**: Post will be live after the next site build (usually 1-2 minutes on Netlify)

## Editing Existing Posts
1. Click on the post in the Blog Posts list
2. Make your changes
3. Click **"Save"** — changes go live after the next build

## Uploading Images
- Images are stored in `/public/uploads/`
- Recommended size: 1200x800px for blog images
- Format: JPG or WebP (max 500KB)
- Use descriptive filenames (e.g., `hypertrophy-training-squat.jpg`)
