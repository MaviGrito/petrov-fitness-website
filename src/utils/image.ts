export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  class?: string;
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

export function renderImage(props: ImageProps): string {
  const loading = props.loading ?? 'lazy';
  const width = props.width ?? 800;
  const height = props.height ?? 450;
  const safeAlt = escapeAttr(props.alt);
  const safeSrc = escapeAttr(props.src);
  return `<img src="${safeSrc}" alt="${safeAlt}" loading="${loading}" width="${width}" height="${height}"${props.class ? ` class="${escapeAttr(props.class)}"` : ''} />`;
}
