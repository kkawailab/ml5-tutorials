# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an ml5.js tutorial project demonstrating sound classification using Teachable Machine models with p5.js for visualization. The project runs entirely in the browser with no build step required.

## Architecture

### Core Stack
- **p5.js (v1.7.0)**: Canvas rendering and sketch lifecycle management
- **ml5.js (v0.12.2)**: Machine learning library wrapping Teachable Machine models
- **Teachable Machine**: Pre-trained sound classification model hosted at Google

### Application Flow
1. `setup()` in sketch.js initializes the p5.js canvas and loads the ml5 sound classifier
2. Model loads asynchronously from Teachable Machine URL (`soundModel + 'model.json'`)
3. Once loaded, `modelReady()` callback starts continuous classification via `classifier.classify(gotResult)`
4. `gotResult()` callback receives classification results and updates the label
5. `draw()` loop continuously renders the current classification label to canvas

### Key Files
- **index.html**: CDN-based loading of p5.js and ml5.js libraries, entry point
- **sketch.js**: Main application logic with p5.js lifecycle methods and ml5 integration
- **style.css**: Minimal styling to reset margins and display canvas as block element

## Development

### Running the Project
Since this is a static HTML/JS project, serve it with any local web server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if http-server is installed)
npx http-server -p 8000
```

Then open http://localhost:8000 in a browser that supports microphone access.

**Important**: The browser will request microphone permissions. The sound classifier requires active microphone input to function.

### Teachable Machine Integration
The sound model URL is hardcoded in sketch.js:3. To use a different Teachable Machine model:
1. Train a sound model at https://teachablemachine.withgoogle.com/
2. Export the model and get the hosted URL
3. Update the `soundModel` constant (ensure it ends with a trailing slash)
4. The classifier expects `model.json` to be available at `soundModel + 'model.json'`

### ml5.js Configuration
The classifier uses a probability threshold of 0.5 (sketch.js:10). Adjust this value to make classification more or less sensitive:
- Lower threshold: More sensitive, may have false positives
- Higher threshold: More conservative, may miss classifications

## Language
The codebase uses Japanese for UI labels and comments. The HTML lang attribute is set to "ja".
