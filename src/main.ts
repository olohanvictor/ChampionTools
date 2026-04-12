const BTNEVSTOPTS = document.getElementById("btnEVsToPoints") as HTMLButtonElement
const BTNPTSTOEVS = document.getElementById("btnPointsToEVs") as HTMLButtonElement
const INPUTEVSPTS = document.getElementById("evPointsInput") as HTMLInputElement
const ANSWERME = document.getElementById("btnAnswer") as HTMLButtonElement
const RESULTCONV = document.getElementById("resultConvert") as HTMLParagraphElement

let calcPtsEvsMode: string = ""

BTNEVSTOPTS.addEventListener("click", () => {
  calcPtsEvsMode = "EvsToPoints"
  INPUTEVSPTS.placeholder = "EVs (0-252)"
  INPUTEVSPTS.min="0" 
  INPUTEVSPTS.max="252" 
})

BTNPTSTOEVS.addEventListener("click", () => {
  calcPtsEvsMode = "PointsToEVs"
  INPUTEVSPTS.placeholder = "Points (0-32)"
  INPUTEVSPTS.min="0" 
  INPUTEVSPTS.max="32" 
})

ANSWERME.addEventListener("click", () => {
  let value = Number(INPUTEVSPTS.value)

  if(value <= 0){
    RESULTCONV.textContent = `The value cannot be zero.`
    return
  }else if(value > Number(INPUTEVSPTS.max)){
    RESULTCONV.textContent = `Value to high.`
    return
  }

  if (calcPtsEvsMode == "EvsToPoints") {
    RESULTCONV.textContent = `${value} tradicional Evs in Pokemon Champions Champions Points: ${convertEVsToPoints(value)}`
  } else if (calcPtsEvsMode == "PointsToEVs") {
    RESULTCONV.textContent = `${value} Pokemon Champions Champions Points in tradicional EVs: ${convertPointsToEVs(value)}`
  }else {
    RESULTCONV.textContent = "Select a mode first"
  }
})

function convertEVsToPoints(ev: number): number {
  return (ev + 4) / 8;
}
function convertPointsToEVs(points: number): number {
  return (points * 8) - 4;
}

