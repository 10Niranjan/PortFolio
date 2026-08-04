import { motion } from 'framer-motion'

/* 
  Real Spotify Embed — compact layout renders at height <= 152px
  Playlist: https://open.spotify.com/playlist/395vDKihoAXaP3akmWoecF
*/
export default function SpotifyPlayer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: '100%', maxWidth: 320, flexShrink: 0 }}
    >
      <iframe
        style={{
          borderRadius: '12px',
          border: 0,
          display: 'block',
          width: '100%',
        }}
        src="https://open.spotify.com/embed/playlist/395vDKihoAXaP3akmWoecF?utm_source=generator&theme=0&locale=en_US"
        height="152"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Player"
      />
    </motion.div>
  )
}
