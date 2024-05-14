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
  function showHelp(selection) {
    let helpText = document.getElementById('helpText');
    switch (selection) {
      case 'basic':
        helpText.innerHTML = '<p>移動距離(m)と時間(s)を入力し、速度を計算します<br>実行を押し、シミュレーションが開始します<br>停止ボタンを押すことでシミュレーションを停止できます<br>再度シミュレーションをする場合にはリセットボタンを押してから実行してください</p>';
        break;
      case 'advanced':
        helpText.innerHTML = '<p>倍率。移動距離、時間の倍率を変更することができます。<br>1mステップシュミレータを使うことで1mの移動距離に対応ができます</p>';
        break;
      case 'data':
        helpText.innerHTML = '<p>等速直線運動の式が確認できます<br>実行ボタンを押すと経過時間が測定され、リアルタイムで表示されます</p>';
        break;
      default:
        helpText.innerHTML = '';
        break;
    }
  }
  
  
  