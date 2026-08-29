import React, { useState, useEffect } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Film,
  Copy,
  Check,
  Trash2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { supabase, isSupabaseConfigured, uploadMediaFile } from '@/lib/supabase';

interface MediaItem {
  id: string;
  name: string;
  bucket: 'portfolio-images' | 'portfolio-videos';
  size: number;
  created_at: string;
  publicUrl: string;
  type: 'image' | 'video';
}

export const MediaLibrary: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'images' | 'videos'>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<MediaItem | null>(null);

  const fetchMedia = async () => {
    if (!isSupabaseConfigured) return;
    setIsLoading(true);

    try {
      const items: MediaItem[] = [];

      // Fetch images
      const { data: imagesData } = await supabase.storage
        .from('portfolio-images')
        .list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

      if (imagesData) {
        for (const file of imagesData) {
          if (file.name === '.emptyFolderPlaceholder') continue;
          const { data: urlData } = supabase.storage
            .from('portfolio-images')
            .getPublicUrl(file.name);

          items.push({
            id: `img-${file.id || file.name}`,
            name: file.name,
            bucket: 'portfolio-images',
            size: file.metadata?.size || 0,
            created_at: file.created_at || new Date().toISOString(),
            publicUrl: urlData.publicUrl,
            type: 'image',
          });
        }
      }

      // Fetch videos
      const { data: videosData } = await supabase.storage
        .from('portfolio-videos')
        .list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

      if (videosData) {
        for (const file of videosData) {
          if (file.name === '.emptyFolderPlaceholder') continue;
          const { data: urlData } = supabase.storage
            .from('portfolio-videos')
            .getPublicUrl(file.name);

          items.push({
            id: `vid-${file.id || file.name}`,
            name: file.name,
            bucket: 'portfolio-videos',
            size: file.metadata?.size || 0,
            created_at: file.created_at || new Date().toISOString(),
            publicUrl: urlData.publicUrl,
            type: 'video',
          });
        }
      }

      setMediaItems(items);
    } catch (err: any) {
      console.warn('Storage fetch warning:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (!isSupabaseConfigured) {
      setFeedback({
        type: 'error',
        message: 'Supabase storage is not configured yet. Please configure your .env credentials.',
      });
      return;
    }

    setIsUploading(true);
    setFeedback(null);

    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isVideo = file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov)$/i);
      const bucket = isVideo ? 'portfolio-videos' : 'portfolio-images';

      if (isVideo && file.size > 50 * 1024 * 1024) {
        if (!confirm(`Warning: "${file.name}" is large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Proceed?`)) {
          continue;
        }
      }

      const res = await uploadMediaFile(file, bucket);
      if (res.url) {
        successCount++;
      } else if (res.error) {
        setFeedback({ type: 'error', message: res.error });
      }
    }

    setIsUploading(false);
    if (successCount > 0) {
      setFeedback({ type: 'success', message: `Uploaded ${successCount} file(s) successfully.` });
      fetchMedia();
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleDelete = async (item: MediaItem) => {
    if (!isSupabaseConfigured) return;

    try {
      const { error } = await supabase.storage.from(item.bucket).remove([item.name]);
      if (error) throw error;
      setFeedback({ type: 'success', message: `Deleted ${item.name}` });
      setDeleteConfirmItem(null);
      fetchMedia();
    } catch (err: any) {
      setFeedback({ type: 'error', message: `Delete failed: ${err.message}` });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const filteredItems = mediaItems.filter((item) => {
    if (activeTab === 'images') return item.type === 'image';
    if (activeTab === 'videos') return item.type === 'video';
    return true;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-bebas text-3xl sm:text-5xl tracking-wide text-white">
            MEDIA <span className="text-[#E50914]">LIBRARY</span>
          </h1>
          <p className="font-mono-code text-xs text-[#9E9B93] mt-1">
            Upload and manage images, video clips, posters, and assets stored in Supabase.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchMedia}
            disabled={isLoading}
            className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-mono-code text-xs flex items-center gap-1.5 cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <label className="px-5 py-2.5 bg-[#E50914] hover:bg-[#FF2A2A] text-white font-mono-code text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'UPLOADING...' : 'UPLOAD MEDIA'}</span>
            <input
              type="file"
              multiple
              accept="image/*,video/mp4,video/webm"
              className="hidden"
              onChange={handleUpload}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {/* Notice Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 font-mono-code text-xs ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 font-mono-code text-xs">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeTab === 'all' ? 'bg-[#E50914] text-white font-bold' : 'text-[#9E9B93] hover:text-white'
          }`}
        >
          All Assets ({mediaItems.length})
        </button>
        <button
          onClick={() => setActiveTab('images')}
          className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'images' ? 'bg-[#E50914] text-white font-bold' : 'text-[#9E9B93] hover:text-white'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Images ({mediaItems.filter((m) => m.type === 'image').length})</span>
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'videos' ? 'bg-[#E50914] text-white font-bold' : 'text-[#9E9B93] hover:text-white'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          <span>Videos ({mediaItems.filter((m) => m.type === 'video').length})</span>
        </button>
      </div>

      {/* Media Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-12 text-center font-mono-code text-xs text-[#6B6862] space-y-3">
          <Upload className="w-8 h-8 text-[#E50914] mx-auto opacity-50" />
          <p>No media files found in your Supabase storage buckets.</p>
          <p className="text-[11px] text-[#9E9B93]">
            Click "UPLOAD MEDIA" to upload images (JPG/PNG/WebP) or video clips (MP4/WebM).
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 font-mono-code text-xs">
          {filteredItems.map((item) => {
            const isVideo = item.type === 'video';

            return (
              <div
                key={item.id}
                className="bg-[#0f0f0f] border border-white/10 hover:border-white/30 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between group"
              >
                {/* Media Stage */}
                <div className="aspect-video bg-black relative overflow-hidden flex items-center justify-center">
                  {isVideo ? (
                    <video
                      src={item.publicUrl}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={item.publicUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  {/* Badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[9px] text-white flex items-center gap-1">
                    {isVideo ? <Film className="w-3 h-3 text-[#E50914]" /> : <ImageIcon className="w-3 h-3 text-purple-400" />}
                    <span>{isVideo ? 'VIDEO' : 'IMAGE'}</span>
                  </div>
                </div>

                {/* Info & Action Bar */}
                <div className="p-3.5 space-y-2 bg-[#121212]">
                  <div>
                    <span className="text-white block font-medium truncate text-xs" title={item.name}>
                      {item.name}
                    </span>
                    <div className="flex items-center justify-between text-[10px] text-[#6B6862] mt-0.5">
                      <span>{formatFileSize(item.size)}</span>
                      <span>{item.bucket}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <button
                      onClick={() => handleCopyUrl(item.publicUrl)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-white text-[10px] cursor-pointer"
                      title="Copy public URL"
                    >
                      {copiedUrl === item.publicUrl ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>COPY URL</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1">
                      <a
                        href={item.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded hover:bg-white/10 text-[#9E9B93] hover:text-white"
                        title="Open file in new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => setDeleteConfirmItem(item)}
                        className="p-1.5 rounded hover:bg-red-500/20 text-[#9E9B93] hover:text-red-400"
                        title="Delete file"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121212] border border-white/15 p-6 rounded-xl max-w-md w-full font-mono-code text-xs space-y-4">
            <h3 className="font-bebas text-2xl text-white">DELETE MEDIA FILE</h3>
            <p className="text-[#9E9B93] leading-relaxed">
              Are you sure you want to delete <strong className="text-white">{deleteConfirmItem.name}</strong> from storage?
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmItem(null)}
                className="px-4 py-2 rounded bg-white/10 text-white font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmItem)}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                Delete File
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
