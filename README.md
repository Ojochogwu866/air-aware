# AirAware Browser Extension

## Prerequisites

- Node.js (version 18+)
- npm or yarn

## Project Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/Ojochogwu866/air-aware.git
cd air-aware
npm install
```

## Available Scripts

### Development

#### `npm start`
Runs the app in development mode with hot reloading.

#### `npm run build:extension`
Builds the browser extension for production:
- Compiles TypeScript
- Bundles React components
- Prepares extension files for Chrome/Firefox

### Testing

#### `npm test`
Launches the test runner in interactive watch mode.

## Extension Installation

### Chrome
1. Build the extension using `npm run build:extension`
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `build` directory

### Firefox
1. Build the extension using `npm run build:extension`
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox" in the sidebar
4. Click "Load Temporary Add-on"
5. Navigate to the `build` directory and select the `manifest.json`

## Project Structure

- `src/`: Source code for React components
- `public/`: Static assets and `manifest.json`
- `webpack.config.js`: Webpack configuration for extension bundling

## Technologies

- React 18
- TypeScript
- Tailwind CSS
- Recharts
- WebExtensions API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License

Copyright (c) [2025] [Ojochogwu Dickson]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Support

For issues or feature requests, please open a GitHub issue.