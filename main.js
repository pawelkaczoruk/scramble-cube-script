function draw() {
  const canvas = document.getElementById('scrambled-cube');

  // if browser supports canvas
  if(canvas.getContext) {
    const ctx = canvas.getContext('2d');


    // gray background around sticker
    ctx.fillStyle = '#707070';
    ctx.beginPath();
    ctx.moveTo(106,100);
    ctx.lineTo(127,100);
    ctx.arcTo(133,100,133,106,8);
    ctx.lineTo(133,127);
    ctx.arcTo(133,133,127,133,8);
    ctx.lineTo(106,133);
    ctx.arcTo(100,133,100,127,8);
    ctx.lineTo(100,106);
    ctx.arcTo(100,100,106,100,8);
    ctx.fill();

    // colored sticker itself
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.moveTo(107,101);
    ctx.lineTo(126,101);
    ctx.arcTo(132,101,132,107,8);
    ctx.lineTo(132,126);
    ctx.arcTo(132,132,126,132,8);
    ctx.lineTo(107,132);
    ctx.arcTo(101,132,101,126,8);
    ctx.lineTo(101,107);
    ctx.arcTo(101,101,106,101,8);
    ctx.fill();
  }  
}



