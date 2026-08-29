-- ============================================================================
-- VAISHAGH G. CINEMATIC VIDEO EDITOR PORTFOLIO - SEED DATA
-- ============================================================================

-- 1. SEED PROJECTS
INSERT INTO public.projects (
  number, title, slug, subtitle, category, year, client, role, aspect_ratio,
  duration, fps, software, short_description, description, deliverables,
  metrics, video_url, thumbnail_url, color_grade, sort_order, featured, published
) VALUES
(
  '01',
  'NEO VISIONS',
  'neo-visions-showreel-2026',
  'SHOWREEL 2026 // COMMERCIAL & SHORT-FORM',
  'SHOWREEL / BRAND',
  '2026',
  'SELECTED CLIENTS',
  'Lead Editor / Sound Design / Colorist',
  '16:9',
  '01:24',
  '23.976 fps',
  '["Premiere Pro", "After Effects", "DaVinci Resolve"]'::jsonb,
  'A high-octane visual showcase blending fast-paced rhythmic cuts, kinetic typography, and deep cinematic sound design.',
  'Curated collection of high-energy commercial cuts, short-form viral storytelling, and narrative moments. Designed to test the limits of audio-visual synchronization, dynamic speed ramps, and seamless invisible transitions.',
  '["Master 4K 16:9 Edit", "Social 9:16 Cuts", "Custom Sound Design Stems", "Color LUT Package"]'::jsonb,
  '2.4M+ Organic Impressions across channels',
  'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-neon-lights-and-flying-cars-42998-large.mp4',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
  'Kodak 2383 / Cyber Cyan & Red Punch',
  1,
  true,
  true
),
(
  '02',
  'REDLINE APEX',
  'redline-apex-commercial',
  'STREET CULTURE // COMMERCIAL EDIT',
  'COMMERCIAL EDIT',
  '2025',
  'HYPERDRIVE GEAR',
  'Offline Editor & Kinetic Motion',
  '16:9',
  '00:48',
  '59.94 fps',
  '["Premiere Pro", "After Effects", "Photoshop"]'::jsonb,
  'Adrenaline-fueled automotive brand film cutting to roaring engine transients and heavy bass impacts.',
  'Built for maximum retention. Leveraged micro-match cuts on wheel rotations, custom motion blur tracking, and glitch sound design to elevate a nighttime street drift film into a stylized brand anthem.',
  '["4K Master Commercial", "3x 9:16 Viral Reels", "Sound Mix & SFX Stems"]'::jsonb,
  '480K Views / 18% Higher Engagement',
  'https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-neon-lights-42997-large.mp4',
  'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
  'Deep Shadow Noir & High Contrast Sodium',
  2,
  true,
  true
),
(
  '03',
  'KINETIC MATRIX',
  'kinetic-matrix-motion',
  '3D TITLE SEQUENCE // MOTION GRAPHICS',
  'MOTION GRAPHICS',
  '2025',
  'SYNAPSE STUDIOS',
  'Motion Designer & Compositor',
  '2.39:1',
  '00:36',
  '24.00 fps',
  '["After Effects", "Illustrator", "Premiere Pro"]'::jsonb,
  'Futuristic typography title sequence with brutalist UI overlays and fluid camera inertia.',
  'An experimental typographic exploration combining parametric grid distortion, custom timecode HUDs, and mechanical typography reveals for a sci-fi documentary title sequence.',
  '["Title Sequence", "Lower Thirds Package", "MOGRT Templates for Premiere"]'::jsonb,
  'Official Selection Design Showcase 2025',
  'https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-connection-mesh-42999-large.mp4',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  'Monochrome Graphite & Crimson Laser',
  3,
  true,
  true
),
(
  '04',
  'ECHOES OF SILENCE',
  'echoes-of-silence-narrative',
  'NARRATIVE SHORT FILM // COLOR & PACING',
  'NARRATIVE / SHORT',
  '2025',
  'INDEPENDENT FILMMAKERS',
  'Picture Editor & DaVinci Colorist',
  '2.35:1',
  '04:12',
  '23.976 fps',
  '["DaVinci Resolve", "Premiere Pro"]'::jsonb,
  'A haunting, atmospheric narrative cut where silence and micro-expressions carry the tension.',
  'Pacing was dialed down to create visceral suspense. Every cut respects character eyelines and breathing rhythms, finished with a custom film emulation color pipeline built in DaVinci Resolve.',
  '["DCI 4K Film Master", "Color Grading Project (.drp)", "ProRes 4444 Master"]'::jsonb,
  'Winner: Best Editing (Regional Indie Fest)',
  'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
  'Fuji Eterna 250D Print Emulation',
  4,
  true,
  true
),
(
  '05',
  'VELOCITY REELS',
  'velocity-reels-social-campaign',
  'HIGH-RETENTION SOCIAL // VIRAL CAMPAIGN',
  'INSTAGRAM / SHORT FORM',
  '2026',
  'FOUNDER & CREATOR ACCOUNTS',
  'Short-Form Specialist & Script Editor',
  '9:16',
  '00:32',
  '60.00 fps',
  '["Premiere Pro", "After Effects", "Photoshop"]'::jsonb,
  'Sub-3-second hook structure, custom graphic callouts, and hypnotic audio triggers for viral reach.',
  'Crafted for maximum watch time and 85%+ retention rate. Engineered with dynamic caption animations, B-roll jump-cuts every 1.8 seconds, and punchy whooshes/risers to keep audiences hooked until the final loop.',
  '["15x 9:16 Master Reels", "CapCut / MOGRT Templates", "Sound FX Library"]'::jsonb,
  '12.8M+ Total Views / 4.2x Retention Spike',
  'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-41534-large.mp4',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  'Vibrant Social Saturation & Clean Skin Tones',
  5,
  true,
  true
),
(
  '06',
  'CHRONO PULSE',
  'chrono-pulse-music-recap',
  'AUDIO-VISUAL SYNTHESIS // MUSIC RECAP',
  'MUSIC / EVENT',
  '2025',
  'SONIC NIGHTS',
  'Offline Editor & Sound Designer',
  '16:9',
  '01:15',
  '24.00 fps',
  '["Premiere Pro", "After Effects", "DaVinci Resolve"]'::jsonb,
  'Strobe cuts, bass drop warp transitions, and crowd euphoria captured with frame-accurate precision.',
  'An explosive live music recap synchronizing multi-camera concert footage with audio stem transients. Utilized speed ramping, lens distortion flashes, and camera whip pans to simulate being front row in the crowd.',
  '["Concert Aftermovie 4K", "3x Teaser Clips", "Vertical Story Edits"]'::jsonb,
  'Over 350K Views in first 48 hours',
  'https://assets.mixkit.co/videos/preview/mixkit-dj-mixing-music-at-a-club-41484-large.mp4',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
  'Deep Magenta & Amber Stage Glow',
  6,
  false,
  true
);

-- 2. SEED PROFILE
INSERT INTO public.profile (
  name, title, role_subtitle, editor_id, short_bio, long_bio,
  philosophy_quote, location, availability, profile_image_url,
  email, phone, instagram_handle, instagram_url, linkedin_handle, linkedin_url,
  youtube_handle, youtube_url, specializations
) VALUES (
  'VAISHAGH G.',
  'VIDEO EDITOR / MOTION DESIGNER',
  'POST-PRODUCTION LEAD',
  'VG-2026',
  'I am a freelance video editor and motion designer obsessed with the craft of visual storytelling. Whether it''s cutting a high-octane 30-second commercial reel that converts, or editing a nuanced brand documentary, I treat every frame with mathematical precision.',
  'My process combines non-linear editing mastery, dynamic audio engineering, bespoke motion graphics, and ACES-standard color grading to ensure your footage looks like an international cinema release.',
  'Pacing is emotion. Every millisecond between cuts dictates how the viewer feels, remembers, and reacts.',
  'INDIA (IST / REMOTE)',
  'AVAILABLE WORLDWIDE',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
  'vaishagh.cut@gmail.com',
  '+91 98765 43210',
  '@vaishagh.edits',
  'https://instagram.com',
  'Vaishagh G.',
  'https://linkedin.com',
  '@vaishaghedits',
  'https://youtube.com',
  '["Instagram & High-Retention Short-Form Reels", "Commercial Brand Films & Product Spots", "Corporate Storytelling & Conference Recaps", "Kinetic Typography & Motion Graphics (After Effects)", "DaVinci Resolve Color Grading & Sound Polish"]'::jsonb
);

-- 3. SEED SERVICES
INSERT INTO public.services (
  number, title, tagline, description, deliverables, software, preview_image, turnaround, ideal_for, sort_order, published
) VALUES
(
  '01',
  'LONG-FORM & COMMERCIAL EDITING',
  'Rhythm, pacing, and narrative architecture.',
  'Transforming hours of raw footage into polished, emotionally gripping stories. I handle everything from multicam sync, narrative pacing, and story structure to final sound and color balance.',
  '["4K Master ProRes/H.264", "Full Multicam Offline Edits", "Project Archive (.prproj / .drp)", "Multiple Aspect Ratios"]'::jsonb,
  '["Adobe Premiere Pro", "DaVinci Resolve"]'::jsonb,
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
  '3–7 Business Days',
  'Brand films, documentaries, YouTube long-form, commercial spots',
  1,
  true
),
(
  '02',
  'VIRAL SHORT-FORM & REELS',
  'Sub-3-second hooks and retention-engineered pacing.',
  'High-retention vertical editing (9:16) tailored for Instagram Reels, TikTok, and YouTube Shorts. Built with pattern interrupts, animated kinetic captions, sound design hits, and pacing that maximizes average view duration.',
  '["9:16 4K Ultra-Sharp Exports", "Burned-in Animated Captions", "Audio Stems & Sound FX", "Batch Content Delivery"]'::jsonb,
  '["Premiere Pro", "After Effects", "Photoshop"]'::jsonb,
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
  '24–48 Hours per Batch',
  'Creators, founders, personal brands, agency clients',
  2,
  true
),
(
  '03',
  'MOTION GRAPHICS & KINETIC TYPOGRAPHY',
  'Visual identity that moves with weight and elegance.',
  'Custom lower-thirds, title sequences, 2D/3D kinetic typography, logo reveals, UI animation mockups, and infographic motion tracking that elevate static footage into dynamic visuals.',
  '["Custom After Effects Comps", "MOGRT Motion Templates", "Transparent Alpha Video (ProRes 4444)", "Vector Animation Assets"]'::jsonb,
  '["Adobe After Effects", "Illustrator", "Photoshop"]'::jsonb,
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
  '2–4 Days',
  'Title sequences, tech explainers, advertising overlays, HUD designs',
  3,
  true
),
(
  '04',
  'SOCIAL MEDIA & CREATOR SYSTEMS',
  'End-to-end content pipeline for consistent output.',
  'A complete post-production ecosystem for high-volume content creators. Developing brand visual guidelines, reusable motion kits, automated caption styles, and fast turnaround workflows.',
  '["Weekly/Monthly Content Batches", "Thumbnail Graphic Direction", "Asset Library & Presets", "Dedicated Slack/Discord Sync"]'::jsonb,
  '["Premiere Pro", "After Effects", "Photoshop"]'::jsonb,
  'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80',
  'Weekly Retainer Schedule',
  'Agencies, high-growth podcasters, creator ecosystems',
  4,
  true
),
(
  '05',
  'CORPORATE & EVENT RECAPS',
  'High-energy pacing meets professional corporate polish.',
  'Capturing the energy of live conferences, product launches, summits, and festival stages. Crafting dynamic montage recaps that hype audiences and generate future sponsor buy-in.',
  '["Same-Day / Next-Day Teaser Cut", "Full Event Recap (2-3 mins)", "Speaker Highlight Snippets", "Sponsor-Branded Vertical Stories"]'::jsonb,
  '["Premiere Pro", "DaVinci Resolve", "After Effects"]'::jsonb,
  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
  '24–72 Hours',
  'Tech conferences, product reveals, festivals, corporate summits',
  5,
  true
),
(
  '06',
  'COLOR GRADING & SOUND DESIGN',
  'Cinematic depth, film emulation, and punchy acoustic transients.',
  'The finishing touch that separates amateur edits from cinema. Precise skin-tone isolation, film print emulation (Kodak/Fuji), atmospheric foley, whoosh risers, sub-drops, and broadcast-standard loudness leveling (-14 LUFS).',
  '["DaVinci Resolve Color Grade", "Custom 3D LUTs (.cube)", "Full Sound Design Mix (Dialogue, SFX, Music Stems)", "Master Stereo & 5.1 Stems"]'::jsonb,
  '["DaVinci Resolve Studio", "Adobe Audition"]'::jsonb,
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
  '1–3 Days',
  'Commercial spots, short films, music videos, premium reels',
  6,
  true
);

-- 4. SEED PROCESS STEPS
INSERT INTO public.process_steps (
  number, phase, title, description, timeline_track, timeline_track_color, duration_percent, tasks, output, sort_order, published
) VALUES
(
  '01',
  'PHASE 01 // DISCOVERY & INGEST',
  'UNDERSTAND',
  'Deconstructing the core brief, target audience psychology, emotional rhythm, and brand aesthetic guidelines before placing a single cut.',
  'BIN / INGEST',
  '#3B82F6',
  15,
  '["Brief & Reference Analysis", "Asset Ingest & Proxy Generation", "Audio / Multicam Sync", "Pacing & Moodboard Alignment"]'::jsonb,
  'Organized NLE Project & Creative Blueprint',
  1,
  true
),
(
  '02',
  'PHASE 02 // SELECTION & SCRIPTING',
  'SELECT',
  'Sifting through hours of footage to isolate golden soundbites, micro-expressions, dynamic b-roll angles, and decisive emotional beats.',
  'SELECTS REEL',
  '#EAB308',
  20,
  '["String-out of A-Roll dialogue", "B-Roll rating & tagging", "Hook selection (first 3 seconds)", "Audio transcription & keyword search"]'::jsonb,
  'Pristine Selects Sequence (Top 10% Footage)',
  2,
  true
),
(
  '03',
  'PHASE 03 // THE OFFLINE CUT',
  'EDIT',
  'Building the skeletal rhythm, narrative arc, dynamic match cuts, speed ramps, and scene pacing. This is where footage transforms into an irresistible story.',
  'V1 / MAIN STORY',
  '#10B981',
  35,
  '["Rough cut assembly", "Beat & tempo synchronization", "Pattern interrupts & jump cuts", "Pacing refinement with client feedback"]'::jsonb,
  'Locked Offline Edit (V1 / Picture Lock)',
  3,
  true
),
(
  '04',
  'PHASE 04 // MOTION & TYPOGRAPHY',
  'DESIGN',
  'Layering custom kinetic typography, animated lower thirds, screen mockups, visual effects, and graphic callouts that keep viewer attention locked.',
  'V2 / MOGRT & VFX',
  '#8B5CF6',
  15,
  '["Kinetic title animations", "Motion tracking & rotoscoping", "Graphic callouts & UI elements", "Custom transition design"]'::jsonb,
  'Motion Compositions & Visual Polish',
  4,
  true
),
(
  '05',
  'PHASE 05 // SOUND & COLOR GRADE',
  'POLISH',
  'The cinema standard finish. Custom Foley sound effects, sub-bass impacts, vocal equalization, and precise DaVinci Resolve color grading.',
  'A1-A3 / COLOR LUT',
  '#E50914',
  15,
  '["DaVinci Resolve color grade & film LUT", "Dialogue cleanup & noise reduction", "Layered SFX (whooshes, hits, ambient foley)", "Master loudness normalization (-14 LUFS)"]'::jsonb,
  'Final 4K ProRes Master + Social Deliverables',
  5,
  true
);

-- 5. SEED TOOLS
INSERT INTO public.tools (
  tool_id, name, category, level, description, shortcut, role, featured_feature, sort_order, published
) VALUES
(
  'premiere-pro',
  'ADOBE PREMIERE PRO',
  'PRIMARY NLE',
  'MASTER / 5+ YEARS',
  'Lightning-fast ripple edits, dynamic multicam assemblies, nested sequences, and audio-reactive speed ramping.',
  'Q / W / C / V',
  'Core Narrative & Offline Editing Engine',
  'Lumetri Color Sync & Dynamic Link',
  1,
  true
),
(
  'after-effects',
  'ADOBE AFTER EFFECTS',
  'MOTION & VFX',
  'ADVANCED / 4+ YEARS',
  'Complex keyframe easing, 3D camera tracking, kinetic typography expressions, rotoscoping, and bespoke visual effects.',
  'F9 / U / Alt+[ / Ctrl+D',
  'Motion Graphics & Compositing Powerhouse',
  'Graph Editor Precision & Expressions',
  2,
  true
),
(
  'davinci-resolve',
  'DAVINCI RESOLVE STUDIO',
  'COLOR & AUDIO',
  'PROFESSIONAL / 3+ YEARS',
  'Node-based color grading, ACES color management, skin-tone isolation, film print emulation, and Fairlight sound mixing.',
  'Alt+S / Shift+H / Ctrl+D',
  'Colorist Suite & Final Picture Finish',
  'Color Wheels, Curves & 3D LUTs',
  3,
  true
),
(
  'photoshop',
  'ADOBE PHOTOSHOP',
  'DESIGN & GRAPHICS',
  'ADVANCED / 5+ YEARS',
  'Asset cutouts, background matte painting, high-CTR YouTube thumbnail composite art, and frame-by-frame texture painting.',
  'Ctrl+J / Ctrl+T / B / M',
  'Visual Direction & Poster Design',
  'Layer Masking & Generative Polish',
  4,
  true
),
(
  'illustrator',
  'ADOBE ILLUSTRATOR',
  'DESIGN & GRAPHICS',
  'PROFICIENT / 3+ YEARS',
  'Crisp vector iconography, typography glyph manipulation, and custom badge assets ready for After Effects animation.',
  'P / V / A / Ctrl+G',
  'Vector Identity & Typography Customization',
  'Infinite Scale Vector Shapes',
  5,
  true
),
(
  'audition',
  'ADOBE AUDITION',
  'COLOR & AUDIO',
  'PROFICIENT / 3+ YEARS',
  'Spectral frequency cleanup, room reverb reduction, multiband compression, and loudness normalization for broadcast.',
  'R / S / Shift+P',
  'Acoustic Cleanup & Transient Polishing',
  'Spectral Repair & Parametric EQ',
  6,
  true
);

-- 6. SEED EXPERIENCE
INSERT INTO public.experience (
  item_id, period, role, organization, location, type, highlights, tools_used, status, sort_order, published
) VALUES
(
  'freelance-lead',
  '2026 — PRESENT',
  'FREELANCE VIDEO EDITOR & MOTION DESIGNER',
  'INDEPENDENT CREATIVE PRACTICE',
  'INDIA (REMOTE / GLOBAL CLIENTS)',
  'FREELANCE',
  '["Partnering directly with founders, brand agencies, and content creators worldwide to produce cinematic commercial edits and high-retention social campaigns.", "Delivered over 120+ finished video cuts with an aggregate 50M+ organic views across Instagram, YouTube, and digital ad campaigns.", "Architected custom automated motion templates (MOGRTs) that shortened client post-production turnaround by 40%."]'::jsonb,
  '["Premiere Pro", "After Effects", "DaVinci Resolve", "Photoshop"]'::jsonb,
  'CURRENTLY ACTIVE',
  1,
  true
),
(
  'mca-degree',
  '2026 — 2028',
  'MASTER OF COMPUTER APPLICATIONS (MCA)',
  'KRISTU JAYANTI UNIVERSITY',
  'BANGALORE, INDIA',
  'EDUCATION',
  '["Pursuing postgraduate studies in Computer Science, focusing on Software Architecture, Digital Media Processing, and Computational Graphics.", "Synthesizing technical problem-solving with high-end creative post-production workflows and video rendering pipelines."]'::jsonb,
  '["Algorithms", "Web Technologies", "Digital Signal Processing"]'::jsonb,
  'IN PROGRESS',
  2,
  true
),
(
  'content-lead-past',
  '2024 — 2026',
  'LEAD VIDEO EDITOR & CONTENT STRATEGIST',
  'DIGITAL MEDIA & CREATIVE LABS',
  'INDIA',
  'AGENCY / COLLAB',
  '["Led end-to-end post-production for fast-turnaround corporate reels, product launches, and brand summit aftermovies.", "Managed offline assembly, color grading pipelines, and sound design tracks across multicamera setups.", "Mentored junior editors on rhythm pacing, speed ramps, and keyframe easing in After Effects."]'::jsonb,
  '["Premiere Pro", "After Effects", "Audition", "Photoshop"]'::jsonb,
  NULL,
  3,
  true
),
(
  'bachelor-degree',
  '2021 — 2024',
  'BACHELOR''S DEGREE IN COMPUTER APPLICATIONS (BCA)',
  'UNIVERSITY CAMPUS',
  'INDIA',
  'EDUCATION',
  '["Graduated with foundational excellence in programming, multimedia computing, and interactive user interfaces.", "Directed multimedia club visual productions and edited institutional event films."]'::jsonb,
  '["Computer Graphics", "UI/UX Foundations", "Video Production"]'::jsonb,
  NULL,
  4,
  true
);

-- 7. SEED METRICS
INSERT INTO public.metrics (label, value, change, sort_order) VALUES
('ORGANIC VIEWS GENERATED', '50M+', '+12M in 2025/26', 1),
('COMMERCIAL CUTS DELIVERED', '120+', 'Zero missed deadlines', 2),
('AVERAGE RETENTION BOOST', '82%', 'Above platform baseline', 3),
('YEARS OF FRAME OBSESSION', '4+', 'Precision in every cut', 4);

-- 8. SEED SITE SETTINGS
INSERT INTO public.site_settings (
  site_title, site_description, hero_tagline, hero_badge_text,
  hero_heading_line1, hero_heading_line2, hero_heading_line3, hero_heading_line4,
  hero_manifesto, hero_video_url, hero_poster_url, hero_cta_text, showreel_url,
  footer_headline, footer_manifesto
) VALUES (
  'Vaishagh G. | Video Editor & Motion Designer Portfolio',
  'Vaishagh G. - Professional Video Editor & Motion Designer specializing in high-retention commercial cuts, cinematic storytelling, and kinetic typography.',
  '[ 2026 REEL ] POST-PRODUCTION • MOTION • COLOR',
  'AVAILABLE FOR HIRE',
  'I CUT',
  'MOMENTS',
  'INTO',
  'STORIES.',
  'Turning raw, chaotic footage into high-retention stories that leave an indelible mark on the screen.',
  'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-neon-lights-and-flying-cars-42998-large.mp4',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
  'WATCH 2026 SHOWREEL',
  'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-neon-lights-and-flying-cars-42998-large.mp4',
  'VAISHAGH G.',
  'Turning raw, unstructured footage into cinematic visual experiences that captivate audiences and drive action.'
);
