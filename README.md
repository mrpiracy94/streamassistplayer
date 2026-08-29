# StreamAssist Media Hub

Build a modern desktop media manager app UI called "StreamAssist" in Light / Day Mode, inspired by Stremio and Popcorn Time, featuring a fully functional embedded Video Player.

### Key Layout & Aesthetics:

- **Theme:** Clean Light/Day Mode using off-white (#F8FAFC), light gray (#E2E8F0), dark slate text (#0F172A), and vibrant teal/cyan accents (#14B8A6).

- **Sidebar (Left):** 

  - Logo "StreamAssist" with a sleek play icon.

  - Navigation: "Discover" (Trending, Popular), "My Library" (Filmes Locais - active), "Tools" (Add-ons, Local Files), "Sistema" (Settings).

  - Bottom Status Widget: Status indicators for "Python Online" (local server connected) and "Add-ons" (green badge "Connected").

- **Main Content Area (Movie Grid):**

  - Responsive grid of movie posters with rounded corners and hover elevation effects.

  - Each card includes: High-res poster, quality tag ("4K"/"1080p"), Title, Year, Genres, IMDb yellow badge with rating, audio/subtitle language flags.

  - **Clicking any movie poster triggers the Video Player modal.**

### Embedded Video Player (In-App Playback Feature):

- **Full-Screen / Modal Player Interface:**

  - Dark overlay/backdrop when a video is playing.

  - HTML5 `<video>` custom player interface with sleek controls.

  - **Control Bar:**

    - Play / Pause, Seek Forward/Backward (10s), Volume slider with mute toggle.

    - Interactive Timeline Scrubbing Bar with hover time preview.

    - **Audio & Subtitles Menu:** Popover selector for embedded/external subtitle tracks (.srt, .vtt) and audio streams (e.g., PT-PT, ENG 5.1).

    - **Playback Speed Selector:** 0.5x, 1.0x, 1.25x, 1.5x, 2.0x.

    - Fullscreen toggle button.

  - Top Left Overlay: Back button to return to library, movie title, and video resolution indicator (e.g., "1080p • Direct Play").

### Interactivity & Polish:

- Smooth transition between the grid view and the player view.

- Micro-animations on poster hover (scale up, play icon overlay).

- Lucide React icons for all UI controls.

- Tailwind CSS layout.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://streamassistplayer.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/07e9d7aa-f25b-4317-b2de-800d3a0c78c3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
