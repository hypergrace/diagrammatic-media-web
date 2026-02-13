let images = [];
let imageNum = 6;
let currentIndex = 0;
let nextIndex = 1;
let swapPending = false;
let noiseScale = 0.003;
let fadeFrames = 60;
let fadeFrame = 0;
let fadeFeather = 0.08;
let renderScale = 0.3;
let renderBuffer;
let renderWidth = 0;
let renderHeight = 0;

let noiseGraph = [];

let message = "happy valentine's day, Willington!";
let words = [];
let wordDuration = 750;
let blinkInterval = 250;
let blinkCount = 6;
let pauseDuration = 3000;
let cycleStart = 0;

let neonStroke = [255, 120, 200];
let neonFill = [255, 190, 230];

function preload(){
  for(let i = 0;i<imageNum;i++){
    images[i] = loadImage("assets/image" + (i + 1)+ ".jpg");
  }
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  imageMode(CORNER);
  textAlign(CENTER, CENTER);
  textFont("UnifrakturMaguntia");
  cycleStart = millis();
  words = message.split(" ");
  initRenderBuffer();
}

function initRenderBuffer() {
  renderWidth = max(1, floor(width * renderScale));
  renderHeight = max(1, floor(height * renderScale));
  renderBuffer = createGraphics(renderWidth, renderHeight);
  renderBuffer.pixelDensity(1);

  for (let i of images) {
    i.resize(renderWidth, renderHeight);
  }

  noiseGraph = [];
  for (let x = 0; x < renderWidth; x++) {
    noiseGraph[x] = [];
    for (let y = 0; y < renderHeight; y++) {
      let n = noise(x * noiseScale, y * noiseScale);
      n = lerp(fadeFeather, 1 - fadeFeather, n);
      noiseGraph[x][y] = n;
    }
  }
}

function draw() {
  if (swapPending) {
    currentIndex = nextIndex;
    nextIndex = (nextIndex + 1) % images.length;
    swapPending = false;
  }

  let img = images[currentIndex];
  let img2 = images[nextIndex];

  let t = fadeFrame / (fadeFrames - 1);
  t = constrain(t, 0, 1);

  img.loadPixels();
  img2.loadPixels();
  renderBuffer.loadPixels();

  for (let y = 0; y < renderHeight; y++) {
    for (let x = 0; x < renderWidth; x++) {
      let idx = 4 * (x + y * renderWidth);
      let n = noiseGraph[x][y];
      let mask = 0;
      if (t >= 1) {
        mask = 1;
      } else if (t > 0) {
        mask = smoothstep(n - fadeFeather, n + fadeFeather, t);
      }

      let r1 = img.pixels[idx];
      let g1 = img.pixels[idx + 1];
      let b1 = img.pixels[idx + 2];

      let r2 = img2.pixels[idx];
      let g2 = img2.pixels[idx + 1];
      let b2 = img2.pixels[idx + 2];

      renderBuffer.pixels[idx] = lerp(r1, r2, mask);
      renderBuffer.pixels[idx + 1] = lerp(g1, g2, mask);
      renderBuffer.pixels[idx + 2] = lerp(b1, b2, mask);
      renderBuffer.pixels[idx + 3] = 255;
    }
  }

  renderBuffer.updatePixels();
  tint(255, 100, 200);
  stroke(255, 192, 203);
  image(renderBuffer, 0, 0, width, height);

  drawNeonWords();

  fadeFrame++;
  if (fadeFrame >= fadeFrames) {
    fadeFrame = 0;
    swapPending = true;
  }
}

function drawNeonWords() {
  let elapsed = millis() - cycleStart;
  let revealDuration = words.length * wordDuration;
  let blinkDuration = blinkCount * blinkInterval;
  let cycleDuration = revealDuration + blinkDuration + pauseDuration;

  if (elapsed > cycleDuration) {
    cycleStart = millis();
    elapsed = 0;
  }

  let visibleCount = 0;
  let showAll = false;
  if (elapsed < revealDuration) {
    visibleCount = floor(elapsed / wordDuration) + 1;
  } else if (elapsed < revealDuration + blinkDuration) {
    let blinkTime = elapsed - revealDuration;
    let blinkIndex = floor(blinkTime / blinkInterval);
    showAll = blinkIndex % 2 === 0;
    visibleCount = showAll ? words.length : 0;
  } else {
    visibleCount = 0;
  }

  let lineCount = words.length;
  let lineSpacing = height / (lineCount + 1);

  for (let i = 0; i < visibleCount; i++) {
    let wordSize = getWordSize(words[i], lineSpacing);
    textSize(wordSize);
    let y = lineSpacing * (i + 1);
    drawNeonText(words[i], width / 2, y);
  }
}

function getWordSize(word, lineSpacing) {
  let targetWidth = width * 0.92;
  let maxSize = lineSpacing * 0.9;
  textSize(10);
  let measured = max(1, textWidth(word));
  let scale = targetWidth / measured;
  return min(maxSize, 10 * scale);
}

function drawNeonText(str, x, y) {
  let glowColor = color(neonStroke[0], neonStroke[1], neonStroke[2]);
  drawingContext.shadowColor = glowColor;
  drawingContext.shadowBlur = 24;
  stroke(neonStroke[0], neonStroke[1], neonStroke[2]);
  strokeWeight(6);
  fill(neonFill[0], neonFill[1], neonFill[2]);
  text(str, x, y);

  drawingContext.shadowBlur = 8;
  stroke(255, 230, 245);
  strokeWeight(2);
  fill(255, 230, 245);
  text(str, x, y);
}

function smoothstep(edge0, edge1, x) {
  let t = constrain((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}
