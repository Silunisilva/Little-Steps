import { useState } from 'react';
import { X, ZoomIn, Images } from 'lucide-react';

const categories = ['All', 'Classrooms', 'Outdoor Play', 'Art & Craft', 'Events', 'Field Trips'];

const photos = [
  { id: 1, src: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800', thumb: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Classrooms', caption: 'Learning through play in our toddler room' },
  { id: 2, src: 'https://images.pexels.com/photos/8612927/pexels-photo-8612927.jpeg?auto=compress&cs=tinysrgb&w=800', thumb: 'https://images.pexels.com/photos/8612927/pexels-photo-8612927.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Classrooms', caption: 'Storytime with Ms. Sarah' },
  { id: 3, src: 'https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=800', thumb: 'https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Classrooms', caption: 'Pre-K science exploration' },
  { id: 4, src: 'https://images.pexels.com/photos/8613164/pexels-photo-8613164.jpeg?auto=compress&cs=tinysrgb&w=800', thumb: 'https://images.pexels.com/photos/8613164/pexels-photo-8613164.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Classrooms', caption: 'Kindergarten ready activities' },
  { id: 5, src: 'https://images.pexels.com/photos/8612990/pexels-photo-8612990.jpeg?auto=compress&cs=tinysrgb&w=800', thumb: 'https://images.pexels.com/photos/8612990/pexels-photo-8612990.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Art & Craft', caption: 'Creative painting sessions' },
  { id: 6, src: 'https://images.pexels.com/photos/8612944/pexels-photo-8612944.jpeg?auto=compress&cs=tinysrgb&w=800', thumb: 'https://images.pexels.com/photos/8612944/pexels-photo-8612944.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Art & Craft', caption: 'Clay modeling fun' },
  { id: 7, src: 'https://images.pexels.com/photos/8535220/pexels-photo-8535220.jpeg?auto=compress&cs=tinysrgb&w=800', thumb: 'https://images.pexels.com/photos/8535220/pexels-photo-8535220.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Outdoor Play', caption: 'Outdoor adventures on our playground' },
  { id: 8, src: 'https://images.pexels.com/photos/8535232/pexels-photo-8535232.jpeg?auto=compress&cs=tinysrgb&w=800', thumb: 'https://images.pexels.com/photos/8535232/pexels-photo-8535232.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Outdoor Play', caption: 'Nature exploration in the garden' },
  { id: 9, src: 'https://images.pexels.com/photos/6936465/pexels-photo-6936465.jpeg?auto=compress&cs=tinysrgb&w=800', thumb: 'https://images.pexels.com/photos/6936465/pexels-photo-6936465.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Events', caption: 'Annual Spring Concert' },
  { id: 10, src: 'https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg?auto=compress&cs=tinysrgb&w=800', thumb: 'https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Events', caption: 'Graduation ceremony 2024' },
  { id: 11, src: 'https://images.pexels.com/photos/8535230/pexels-photo-8535230.jpeg?auto=compress&cs=tinysrgb&w=800', thumb: 'https://images.pexels.com/photos/8535230/pexels-photo-8535230.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Field Trips', caption: 'Trip to the local farm' },
  { id: 12, src: 'https://images.pexels.com/photos/8535229/pexels-photo-8535229.jpeg?auto=compress&cs=tinysrgb&w=800', thumb: 'https://images.pexels.com/photos/8535229/pexels-photo-8535229.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Field Trips', caption: 'Museum of Natural History visit' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxPhoto, setLightboxPhoto] = useState<typeof photos[0] | null>(null);

  const filtered = activeCategory === 'All' ? photos : photos.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-warm-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-warm-50 dark:bg-warm-900/30 rounded-full px-4 py-1.5 mb-6">
            <Images className="w-4 h-4 text-warm-500" />
            <span className="text-sm font-semibold text-warm-600 dark:text-warm-400">Photo Gallery</span>
          </div>
          <h1 className="section-title dark:text-white mb-6">
            A Glimpse Into Our{' '}
            <span className="text-gradient">Happy World</span>
          </h1>
          <p className="section-subtitle dark:text-gray-400 mx-auto">
            Browse photos from our classrooms, outdoor play, special events, and field trips.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((photo) => (
              <div
                key={photo.id}
                className="break-inside-avoid group cursor-pointer relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => setLightboxPhoto(photo)}
              >
                <img
                  src={photo.thumb}
                  alt={photo.caption}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <p className="text-white text-xs font-medium">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={() => setLightboxPhoto(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxPhoto.src}
              alt={lightboxPhoto.caption}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <p className="text-white text-center mt-4 font-medium">{lightboxPhoto.caption}</p>
            <p className="text-gray-400 text-center text-sm">{lightboxPhoto.category}</p>
          </div>
        </div>
      )}
    </div>
  );
}
