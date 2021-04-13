function getW0(k, m) {
    const res = Math.sqrt(k/m)
    return res.toFixed(3)
}

function xFormula(x0, t, w0) {
    let res = x0*Math.cos(w0*t)
    return res.toFixed(3)
}

function getT(k, m) {
    return 2*Math.PI*Math.sqrt(m/k)
}