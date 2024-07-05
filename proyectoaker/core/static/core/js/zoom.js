function zoom(e) {
  var zoom = e.currentTarget;
  e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.touches[0].pageX);
  e.offsetY ? (offsetY = e.offsetY) : (offsetX = e.touches[0].pageX);
  x = (offsetX / zoom.offsetWidth) * 100;
  y = (offsetY / zoom.offsetHeight) * 100;
  zoom.style.backgroundPosition = x + "% " + y + "%";
}

