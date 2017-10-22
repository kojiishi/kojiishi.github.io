registerPaint('curly-bracket', class {
  paint(ctx, geom, properties) {
    const radius = 5;
    const height = geom.height;
    const centerY = height / 2;
    ctx.moveTo(radius * 2, 0);
    ctx.arcTo(radius, 0, radius, radius, radius);
    ctx.lineTo(radius, centerY -radius);
    ctx.arcTo(radius, centerY, 0, centerY, radius);
    ctx.arcTo(radius, centerY, radius, centerY + radius, radius);
    ctx.lineTo(radius, geom.height - radius);
    ctx.arcTo(radius, height, radius * 2, height, radius);
    ctx.stroke();
  }
});
