
const framePerSecond = 25

window.onload = () => {
  const mInput = document.getElementById('param-m')
  const kInput = document.getElementById('param-k')
  const x0Input = document.getElementById('param-x0')
  const playButton = document.getElementById('play')
  const stopButton = document.getElementById('stop')
  const timeInput = document.getElementById('hesitation__time')
  const hesitationSum = document.getElementById('hesitation__sum')
  const frequency = document.getElementById('frequency')
  const xCoord = document.getElementById('x_coord')

  frequency.value = getW0(+kInput.value, +mInput.value)
  playAnimation(+mInput.value, +x0Input.value)

  mInput.addEventListener('input', (e) => {
    frequency.value = getW0(+kInput.value, +mInput.value)
    playAnimation(+mInput.value, +x0Input.value)
  })
  kInput.addEventListener('input', (e) => {
    frequency.value = getW0(+kInput.value, +mInput.value)
    playAnimation(+mInput.value, +x0Input.value)
  })
  x0Input.addEventListener('input', (e) => {
    playAnimation(+mInput.value, +x0Input.value)
  })

  playButton.addEventListener('click', (e) => {
    const m = +mInput.value
    const k = +kInput.value
    const x0 = +x0Input.value
    const T = getT(k, m)
    const w0 = getW0(k, m)
    frequency.value = w0
    
    let time = 0
    let step = 1 / framePerSecond

    const interval = setInterval(() => {
        time += step
        let tm = time.toFixed(2)
        let hesitates = tm/T
        let x = xFormula(x0, tm, w0)

        timeInput.value = tm
        hesitationSum.value = hesitates.toFixed(0)
        xCoord.value = x

        playAnimation(m, x)

    }, step*1000)

    disableInputs()
    playButton.setAttribute('style', 'display: none')
    stopButton.setAttribute('style', 'display: inline-block')

    stopButton.addEventListener('click', (e) => {
      enableInputs()
      playButton.setAttribute('style', 'display: inline-block')
      stopButton.setAttribute('style', 'display: none')
      
      clearInterval(interval)
    })
  })

  function disableInputs() {
    mInput.setAttribute('disabled', '')
    kInput.setAttribute('disabled', '')
    x0Input.setAttribute('disabled', '')
  }

  function enableInputs() {
    mInput.removeAttribute('disabled', '')
    kInput.removeAttribute('disabled', '')
    x0Input.removeAttribute('disabled', '')
  }
}

