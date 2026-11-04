import type { StudioPhoto } from '../data/studioPhotos';
import { PhotoCarousel } from './PhotoCarousel';

interface StudioPhotoGridProps {
  images: readonly StudioPhoto[];
  label: string;
}

/** Cada fotografía está visible; la ampliación usa el diálogo accesible existente. */
export function StudioPhotoGrid({ images, label }: StudioPhotoGridProps) {
  return (
    <div data-studio-photo-grid className={`grid grid-cols-2 ${images.length === 4 ? 'lg:grid-cols-4' : 'md:grid-cols-3'} gap-3 sm:gap-5 lg:gap-6`}>
      {images.map((image, index) => (
        <PhotoCarousel key={image.src} images={[image]} label={`${label} · Fotografía ${index + 1}`}
          frameClassName="aspect-[3/4] rounded-xl" />
      ))}
    </div>
  );
}
