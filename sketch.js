let lineCount = 150; // 增加水草數量
let lines = []; // 儲存水草的資料
let colors = []; // 儲存指定的五種顏色

function setup() { // 初始值設定
  let canvas = createCanvas(windowWidth, windowHeight); // 畫布大小
  canvas.style('position', 'absolute'); // 設定畫布位置
  canvas.style('z-index', '2'); // 將畫布層級設為更高，確保水草在前面
  canvas.style('pointer-events', 'none'); // 讓畫布不攔截滑鼠事件，確保 iframe 可操作

  // 定義顏色調色盤，加入透明度
  colors = [
    color('#9b5de5' + '99'), // 紫色，透明度 150
    color('#f15bb5' + '99'), // 粉紅色，透明度 150
    color('#fee440' + '99'), // 黃色，透明度 150
    color('#00bbf9' + '99'), // 藍色，透明度 150
    color('#00f5d4' + '99')  // 綠色，透明度 150
  ];

  // 初始化水草資料
  for (let i = 0; i < lineCount; i++) {
    lines.push({
      x: random(width), // 水草的水平位置
      height: random(100, 300), // 增加水草的高度範圍
      color: random(colors), // 隨機選擇一種顏色
      thickness: random(15, 30), // 增加水草的粗細範圍
      frequency: random(0.01, 0.05), // 水草搖晃的頻率
    });
  }

  // 創建 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw'); // 設定 iframe 的網址
  iframe.style('position', 'absolute');
  iframe.style('top', '10%'); // 設定 iframe 距離視窗頂部 10%
  iframe.style('left', '10%'); // 設定 iframe 距離視窗左側 10%
  iframe.style('width', '80%'); // 設定 iframe 寬度為視窗的 80%
  iframe.style('height', '80%'); // 設定 iframe 高度為視窗的 80%
  iframe.style('border', 'none'); // 移除 iframe 的邊框
  iframe.style('z-index', '1'); // 將 iframe 層級設為較低，確保在水草後面
}

function draw() { // 畫圖
  clear(); // 清除畫布，讓背景透明

  // 繪製每條水草
  for (let i = 0; i < lines.length; i++) {
    drawWavingLine(lines[i]);
  }
}

function drawWavingLine(line) {
  stroke(line.color); // 設定水草顏色
  strokeWeight(line.thickness); // 設定水草粗細
  noFill(); // 無填充

  beginShape();
  for (let y = height; y > height - line.height; y -= 10) {
    let offsetX = sin(frameCount * line.frequency + y * 0.05) * map(y, height - line.height, height, 10, 0);
    vertex(line.x + offsetX, y);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 畫布大小隨視窗大小改變

  // 重新初始化水草資料
  lines = [];
  for (let i = 0; i < lineCount; i++) {
    lines.push({
      x: random(width), // 水草的水平位置
      height: random(100, 300), // 增加水草的高度範圍
      color: random(colors), // 隨機選擇一種顏色
      thickness: random(15, 30), // 增加水草的粗細範圍
      frequency: random(0.01, 0.05), // 水草搖晃的頻率
    });
  }
}