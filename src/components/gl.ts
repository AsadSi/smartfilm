/**
 * The little WebGL both pictures need: one quad covering the canvas and one
 * fragment shader doing all the work. Null when there is no WebGL, and the
 * caller keeps its plain version.
 */
export function quad(canvas: HTMLCanvasElement, frag: string, names: string[]) {
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
  if (!gl) return null;

  const prog = gl.createProgram()!;
  for (const [type, src] of [
    [gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'],
    [gl.FRAGMENT_SHADER, frag],
  ] as const) {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    gl.attachShader(prog, sh);
  }
  gl.bindAttribLocation(prog, 0, 'p');
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  const u = Object.fromEntries(names.map((n) => [n, gl.getUniformLocation(prog, n)]));
  return { gl, u };
}

/** A texture for a photograph or a canvas of any size — no mipmaps, no repeat. */
export function texture(gl: WebGLRenderingContext) {
  const t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return t;
}

/** Keeps the drawing buffer at the canvas's size on screen; returns it in device pixels. */
export function fit(gl: WebGLRenderingContext, canvas: HTMLCanvasElement, dpr: number) {
  const w = Math.round(canvas.clientWidth * dpr);
  const h = Math.round(canvas.clientHeight * dpr);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
  }
  return [w, h] as const;
}
