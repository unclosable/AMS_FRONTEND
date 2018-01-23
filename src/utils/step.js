const getStepFunc = (stepSpeed, act, nexAct) => {
  return() => {
    if (act) {
      act();
    }
    if (nexAct) {
      setTimeout(nexAct, stepSpeed);
    }
  }
}
export default(stepSpeed, endAct, ...steps) => {
  let act = getStepFunc(stepSpeed, endAct, null);
  for (let i = steps.length - 1; i >= 0; i--) {
    act = getStepFunc(stepSpeed, steps[i], act);
  }
  return act;
}
