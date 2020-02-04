function draw() {
  const canvas = document.getElementById('scrambled-cube'),
        cubeScheme = {
          front: ['#FFFFFF', '#08EE10', '#08EE10',
                  '#08EE10', '#08EE10', '#08EE10',
                  '#08EE10', '#08EE10', '#08EE10'],
          top: ['#FFFFFF', '#FFFFFF', '#FFFFFF',
                '#FFFFFF', '#FFFFFF', '#FFFFFF',
                '#FFFFFF', '#FFFFFF', '#FFFFFF'],
          left: ['#F58A1F', '#F58A1F', '#F58A1F',
                '#F58A1F', '#F58A1F', '#F58A1F',
                '#F58A1F', '#F58A1F', '#F58A1F'],
          right: ['#FF0000', '#FF0000', '#FF0000',
                  '#FF0000', '#FF0000', '#FF0000',
                  '#FF0000', '#FF0000', '#FF0000'],
          back: ['#1900FF', '#1900FF', '#1900FF',
                '#1900FF', '#1900FF', '#1900FF',
                '#1900FF', '#1900FF', '#1900FF'],
          bottom: ['#DCE90D', '#DCE90D', '#DCE90D',
                  '#DCE90D', '#DCE90D', '#DCE90D',
                  '#DCE90D', '#DCE90D', '#DCE90D']
                };
  const scramble = ["R2", "D", "B2", "D", "F2", "L2", "D'", "L2", "U", "R2", "B2", "F", "D", "L'", "B", "D2", "R", "F2", "U2"];
  const scrambledCubeScheme = scrambleCube(scramble, cubeScheme);

  // if browser supports canvas
  if(canvas.getContext) {
    const ctx = canvas.getContext('2d');

    displayOneCubeSide(99, 99, cubeScheme.front); // front
    displayOneCubeSide(99, 0, cubeScheme.top); // top
    displayOneCubeSide(0, 99, cubeScheme.left); // left
    displayOneCubeSide(198, 99, cubeScheme.right); // right
    displayOneCubeSide(297, 99, cubeScheme.back); // back
    displayOneCubeSide(99, 198, cubeScheme.bottom); // bottom


    // x and y coordinates are top left corner of side of cube,
    // stickers - colors array (left to right, top to bottom)
    function displayOneCubeSide(x, y, stickers) {
      let xp = x,
          yp = y,
          color;
      
      // grey rect behind stickers of one cube side
      ctx.fillStyle = '#707070';
      ctx.fillRect(x+25, y+25, 49, 49);
      
      // calculate position of sticker and draw it
      for(let i=1; i<=9; i++) {
        color = stickers[i-1];

        switch(i) {
          case 1: xp = x; yp = y; break;
          case 2: xp = x + 33; yp = y; break;
          case 3: xp = x + 2*33; yp = y; break;
          case 4: xp = x; yp = y + 33; break;
          case 5: xp = x + 33; yp = y + 33; break;
          case 6: xp = x + 2*33; yp = y + 33; break;
          case 7: xp = x; yp = y + 2*33; break;
          case 8: xp = x + 33; yp = y + 2*33; break;
          case 9: xp = x + 2*33; yp = y + 2*33; break;
        }

        drawOneSticker(xp, yp, color);
      }

    }

    // function for drawind one sticker of cube, takes x and y coordinates and color of sticker
    function drawOneSticker(x, y, color) {

      // gray background around sticker - as a border
      ctx.fillStyle = '#707070';
      ctx.beginPath();
      ctx.moveTo(x+6, y);
      ctx.lineTo(x+27, y);
      ctx.arcTo(x+33, y, x+33, y+6, 8);
      ctx.lineTo(x+33, y+27);
      ctx.arcTo(x+33, y+33, x+27, y+33, 8);
      ctx.lineTo(x+6, y+33);
      ctx.arcTo(x, y+33, x, y+27, 8);
      ctx.lineTo(x, y+6);
      ctx.arcTo(x, y, x+6, y, 8);
      ctx.fill();

      // colored sticker itself
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x+7, y+1);
      ctx.lineTo(x+26, y+1);
      ctx.arcTo(x+32, y+1, x+32, y+7, 7);
      ctx.lineTo(x+32, y+26);
      ctx.arcTo(x+32, y+32, x+26, y+32, 7);
      ctx.lineTo(x+7, y+32);
      ctx.arcTo(x+1, y+32, x+1, y+26, 7);
      ctx.lineTo(x+1, y+7);
      ctx.arcTo(x+1, y+1, x+7, y+1, 7);
      ctx.fill();
    }
    
  }

}

function scrambleCube(scramble, colorScheme) {
  let scrambledCube = colorScheme;

  for(let i=0; i<scramble.length; i++) {
    const letterLength = scramble[i].length;
    const move = scramble[i][0];
    let modifier;

    // for counter clockwise moves do 3x turn, for duble moves do 2x turn
    modifier = letterLength === 1 ? 1 : scramble[i][1] === '2' ? 2 : 3;
    
    switch(scramble[i][0]) {
      case 'F': scrambledCube.front = doFaceMove(scrambledCube.front, modifier);

                break;
      case 'U': scrambledCube.top = doFaceMove(scrambledCube.top, modifier);
                break;
      case 'L': scrambledCube.left = doFaceMove(scrambledCube.left, modifier);
                break;
      case 'R': scrambledCube.right = doFaceMove(scrambledCube.right, modifier);
                break;
      case 'B': scrambledCube.back = doFaceMove(scrambledCube.back, modifier);
                break;
      case 'D': scrambledCube.bottom = doFaceMove(scrambledCube.bottom, modifier);
                break;
    }
  }

  return scrambledCube;
}

function doFaceMove(cubeSide, turns) {
  let newSide,
      tempSide = cubeSide;

  for(let i=0; i<turns; i++) {
    newSide = [
      tempSide[6], tempSide[3], tempSide[0],
      tempSide[7], tempSide[4], tempSide[1],
      tempSide[8], tempSide[5], tempSide[2]
    ];
    tempSide = newSide;
  }

  return newSide;
}