function startAnimation() {
    const velocity = document.getElementById('velocity').value;
    const distance = document.getElementById('distance').value;
    const time = document.getElementById('time').value;
    const scale = document.getElementById('scale').value;
    const meterStep = document.getElementById('meterStep').checked;
    const maxDistance = meterStep ? Math.min(800, Math.floor(distance * scale)) : Math.min(800, distance * scale);
  
    const object = document.getElementById('object');
    const arrow = document.getElementById('arrow');
    const distanceLabel = document.getElementById('distanceLabel');
    const info = document.getElementById('info');
    const timer = document.getElementById('timer');
  
    const animationDuration = meterStep ? (time * 1000 / scale) / distance : time * 1000 / scale;
  
    object.style.transition = `left ${animationDuration}ms linear`;
    object.style.left = `${maxDistance}px`;
  
    arrow.style.display = 'block';
    arrow.style.left = `${maxDistance - 20}px`;
    distanceLabel.innerText = `${distance} m`;
    distanceLabel.style.left = `${maxDistance}px`;
    distanceLabel.style.display = 'block';
    info.textContent = `速度: ${velocity} m/s, 移動距離: ${distance} m, 経過時間: ${time} s, 倍率: ${scale}x`;
  
    let elapsed = 0;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      elapsed += 1; // Update interval is now 1 millisecond
      timer.textContent = `経過時間: ${(elapsed / 1000).toFixed(3)} s`;
      if (elapsed >= animationDuration) {
        clearInterval(timerInterval);
        timer.textContent += " - 完了";
      }
    }, 1); // Update every 1 millisecond for 0.001 second accuracy
  
    animationRequest = setTimeout(() => {
      object.style.left = `${maxDistance}px`;
      clearInterval(timerInterval);
    }, animationDuration);
  }
  
  