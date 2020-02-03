function draw() {
  const canvas = document.getElementById('scrambled-cube'),
        cubeScheme = {
          front: [{1: '#08EE10'}, {2: '#08EE10'}, {3: '#08EE10'},
                  {4: '#08EE10'}, {5: '#08EE10'}, {6: '#08EE10'},
                  {7: '#08EE10'}, {8: '#08EE10'}, {9: '#08EE10'}],
          top: [{1: '#FFFFFF'}, {2: '#FFFFFF'}, {3: '#FFFFFF'},
                {4: '#FFFFFF'}, {5: '#FFFFFF'}, {6: '#FFFFFF'},
                {7: '#FFFFFF'}, {8: '#FFFFFF'}, {9: '#FFFFFF'}],
          left: [{1: '#F58A1F'}, {2: '#F58A1F'}, {3: '#F58A1F'},
                {4: '#F58A1F'}, {5: '#F58A1F'}, {6: '#F58A1F'},
                {7: '#F58A1F'}, {8: '#F58A1F'}, {9: '#F58A1F'}],
          right: [{1: '#FF0000'}, {2: '#FF0000'}, {3: '#FF0000'},
                  {4: '#FF0000'}, {5: '#FF0000'}, {6: '#FF0000'},
                  {7: '#FF0000'}, {8: '#FF0000'}, {9: '#FF0000'}],
          back: [{1: '#1900FF'}, {2: '#1900FF'}, {3: '#1900FF'},
                {4: '#1900FF'}, {5: '#1900FF'}, {6: '#1900FF'},
                {7: '#1900FF'}, {8: '#1900FF'}, {9: '#1900FF'}],
          bottom: [{1: '#DCE90D'}, {2: '#DCE90D'}, {3: '#DCE90D'},
                  {4: '#DCE90D'}, {5: '#DCE90D'}, {6: '#DCE90D'},
                  {7: '#DCE90D'}, {8: '#DCE90D'}, {9: '#DCE90D'}],};


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
        color = stickers[i-1][i];

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





