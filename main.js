function draw() {
  const canvas = document.getElementById('scrambled-cube'),
        cubeScheme = {
          front: [
            '#08EE10', '#08EE10', '#08EE10',
            '#08EE10', '#08EE10', '#08EE10',
            '#08EE10', '#08EE10', '#08EE10'
          ],
          top: [
            '#FFFFFF', '#FFFFFF', '#FFFFFF',
            '#FFFFFF', '#FFFFFF', '#FFFFFF',
            '#FFFFFF', '#FFFFFF', '#FFFFFF'
          ],
          left: [
            '#F58A1F', '#F58A1F', '#F58A1F',
            '#F58A1F', '#F58A1F', '#F58A1F',
            '#F58A1F', '#F58A1F', '#F58A1F'
          ],
          right: [
            '#FF0000', '#FF0000', '#FF0000',
            '#FF0000', '#FF0000', '#FF0000',
            '#FF0000', '#FF0000', '#FF0000'
          ],
          back: [
            '#1900FF', '#1900FF', '#1900FF',
            '#1900FF', '#1900FF', '#1900FF',
            '#1900FF', '#1900FF', '#1900FF'
          ],
          bottom: [
            '#DCE90D', '#DCE90D', '#DCE90D',
            '#DCE90D', '#DCE90D', '#DCE90D',
            '#DCE90D', '#DCE90D', '#DCE90D'
          ]
        },
        scramble = ["R2", "D", "B2", "D", "F2", "L2", "D'", "L2", "U", "R2", "B2", "F", "D", "L'", "B", "D2", "R", "F2", "U2"],
        scrambledCubeScheme = scrambleCube(scramble, cubeScheme);

        // if browser supports canvas
  if(canvas.getContext) {
    const ctx = canvas.getContext('2d');

    displayOneCubeSide(99, 99, scrambledCubeScheme.front); // front
    displayOneCubeSide(99, 0, scrambledCubeScheme.top); // top
    displayOneCubeSide(0, 99, scrambledCubeScheme.left); // left
    displayOneCubeSide(198, 99, scrambledCubeScheme.right); // right
    displayOneCubeSide(297, 99, scrambledCubeScheme.back); // back
    displayOneCubeSide(99, 198, scrambledCubeScheme.bottom); // bottom


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
  let scrambledCube = {...colorScheme};

  for(let i=0; i<scramble.length; i++) {
    const letterLength = scramble[i].length,
          move = scramble[i][0];
    let modifier,
        modSides;

    // for counter clockwise moves do 3x turn, for duble moves do 2x turn
    modifier = letterLength === 1 ? 1 : scramble[i][1] === '2' ? 2 : 3;
    
    switch(move) {
      case 'F': modSides = {...doVerticalMove(move, scrambledCube.left, scrambledCube.top, 
                              scrambledCube.right, scrambledCube.bottom, modifier)};
  
                scrambledCube = {
                  front: doFaceMove(scrambledCube.front, modifier),
                  top: modSides.top,
                  left: modSides.left,
                  right: modSides.right,
                  back: scrambledCube.back,
                  bottom: modSides.bottom
                };
                break;
      case 'U': modSides = {...doVerticalMove(move, scrambledCube.left, scrambledCube.back, 
                              scrambledCube.right, scrambledCube.front, modifier)};
  
                scrambledCube = {
                  front: modSides.bottom,
                  top: doFaceMove(scrambledCube.top, modifier),
                  left: modSides.left,
                  right: modSides.right,
                  back: modSides.top,
                  bottom: scrambledCube.bottom
                };
                break;
      case 'L': modSides = {...doVerticalMove(move, scrambledCube.back, scrambledCube.top, 
                              scrambledCube.front, scrambledCube.bottom, modifier)};
  
                scrambledCube = {
                  front: modSides.right,
                  top: modSides.top,
                  left: doFaceMove(scrambledCube.left, modifier),
                  right: scrambledCube.right,
                  back: modSides.left,
                  bottom: modSides.bottom
                };
                break;
      case 'R': modSides = {...doVerticalMove(move, scrambledCube.front, scrambledCube.top, 
                              scrambledCube.back, scrambledCube.bottom, modifier)};
  
                scrambledCube = {
                  front: modSides.left,
                  top: modSides.top,
                  left: scrambledCube.left,
                  right: doFaceMove(scrambledCube.right, modifier),
                  back: modSides.right,
                  bottom: modSides.bottom
                };
                break;
      case 'B': modSides = {...doVerticalMove(move, scrambledCube.right, scrambledCube.top, 
                              scrambledCube.left, scrambledCube.bottom, modifier)};
  
                scrambledCube = {
                  front: scrambledCube.front,
                  top: modSides.top,
                  left: modSides.right,
                  right: modSides.left,
                  back: doFaceMove(scrambledCube.back, modifier),
                  bottom: modSides.bottom
                };
                break;
      case 'D': modSides = {...doVerticalMove(move, scrambledCube.left, scrambledCube.front, 
                              scrambledCube.right, scrambledCube.back, modifier)};
  
                scrambledCube = {
                  front: modSides.top,
                  top: scrambledCube.top,
                  left: modSides.left,
                  right: modSides.right,
                  back: modSides.bottom,
                  bottom: doFaceMove(scrambledCube.bottom, modifier)
                };
                break;
    }
  }

  return scrambledCube;
}

// do face move of selected cube side
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

// move contigous side elements
function doVerticalMove(side, sideLeft, sideTop, sideRight, sideBottom, turns) {
  let tempSide1;

  for(let i=0; i<turns; i++) {
    tempSide1 = [...sideLeft];

    if(side === 'F') {
      sideLeft[2] = sideBottom[0];
      sideLeft[5] = sideBottom[1];
      sideLeft[8] = sideBottom[2];

      sideBottom[0] = sideRight[6];
      sideBottom[1] = sideRight[3];
      sideBottom[2] = sideRight[0];

      sideRight[0] = sideTop[6];
      sideRight[3] = sideTop[7];
      sideRight[6] = sideTop[8];

      sideTop[6] = tempSide1[8];
      sideTop[7] = tempSide1[5];
      sideTop[8] = tempSide1[2];
    } 
    else if(side === 'U') {
      sideLeft[0] = sideBottom[0];
      sideLeft[1] = sideBottom[1];
      sideLeft[2] = sideBottom[2];

      sideBottom[0] = sideRight[0];
      sideBottom[1] = sideRight[1];
      sideBottom[2] = sideRight[2];

      sideRight[0] = sideTop[0];
      sideRight[1] = sideTop[1];
      sideRight[2] = sideTop[2];

      sideTop[0] = tempSide1[0];
      sideTop[1] = tempSide1[1];
      sideTop[2] = tempSide1[2];
    }
    else if(side === 'L') {
      sideLeft[2] = sideBottom[6];
      sideLeft[5] = sideBottom[3];
      sideLeft[8] = sideBottom[0];

      sideBottom[6] = sideRight[6];
      sideBottom[3] = sideRight[3];
      sideBottom[0] = sideRight[0];

      sideRight[6] = sideTop[6];
      sideRight[3] = sideTop[3];
      sideRight[0] = sideTop[0];

      sideTop[6] = tempSide1[2];
      sideTop[3] = tempSide1[5];
      sideTop[0] = tempSide1[8];
    }
    else if(side === 'R') {
      sideLeft[2] = sideBottom[2];
      sideLeft[5] = sideBottom[5];
      sideLeft[8] = sideBottom[8];

      sideBottom[2] = sideRight[6];
      sideBottom[5] = sideRight[3];
      sideBottom[8] = sideRight[0];

      sideRight[6] = sideTop[2];
      sideRight[3] = sideTop[5];
      sideRight[0] = sideTop[8];

      sideTop[2] = tempSide1[2];
      sideTop[5] = tempSide1[5];
      sideTop[8] = tempSide1[8];
    }
    else if(side === 'B') {
      sideLeft[2] = sideBottom[8];
      sideLeft[5] = sideBottom[7];
      sideLeft[8] = sideBottom[6];

      sideBottom[8] = sideRight[6];
      sideBottom[7] = sideRight[3];
      sideBottom[6] = sideRight[0];

      sideRight[6] = sideTop[0];
      sideRight[3] = sideTop[1];
      sideRight[0] = sideTop[2];

      sideTop[0] = tempSide1[2];
      sideTop[1] = tempSide1[5];
      sideTop[2] = tempSide1[8];
    }
    else if(side === 'D') {
      sideLeft[8] = sideBottom[8];
      sideLeft[7] = sideBottom[7];
      sideLeft[6] = sideBottom[6];

      sideBottom[8] = sideRight[8];
      sideBottom[7] = sideRight[7];
      sideBottom[6] = sideRight[6];

      sideRight[8] = sideTop[8];
      sideRight[7] = sideTop[7];
      sideRight[6] = sideTop[6];

      sideTop[8] = tempSide1[8];
      sideTop[7] = tempSide1[7];
      sideTop[6] = tempSide1[6];
    }
  }

  return {
    top: sideTop,
    left: sideLeft,
    right: sideRight,
    bottom: sideBottom
  };
}