registerPaint('curly-bracket', class {
  paint(ctx, geom, properties) {
    const x = geom.width / 2;
    const y = geom.height / 2;
    const radius = 5;
    ctx.beginPath();
    ctx.moveTo(radius * 2, 0);
    ctx.lineTo(radius, radius);
    ctx.lineTo(radius, geom.height / 2 -radius);
    ctx.lineTo(0, geom.height / 2);
    ctx.lineTo(radius, geom.height / 2 + radius);
    ctx.lineTo(radius, geom.height - radius);
    ctx.lineTo(radius * 2, geom.height);
    ctx.stroke();
  }
});
