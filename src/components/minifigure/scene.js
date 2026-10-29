import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const clamp = THREE.MathUtils.clamp;
const mix = THREE.MathUtils.lerp;

export function createMinifigureScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = new RoomEnvironment();
  const env = pmrem.fromScene(environment, .04);
  scene.environment = env.texture;
  environment.dispose();
  pmrem.dispose();
  const camera = new THREE.PerspectiveCamera(31, 1, .1, 50);
  camera.position.set(4.3, 3.7, 9.5);
  camera.lookAt(0, 2, 0);
  scene.add(new THREE.HemisphereLight(0xfff8ed, 0x627380, 2));
  const key = new THREE.DirectionalLight(0xffdfb6, 4);
  key.position.set(-3, 6, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xc5dcff, 3);
  rim.position.set(4, 5, -3);
  scene.add(rim);
  const stage = new THREE.Group();
  scene.add(stage);
  const person = new THREE.Group();
  stage.add(person);

  const plastic = (color, roughness = .3) => new THREE.MeshPhysicalMaterial({ color, roughness, metalness: .02, clearcoat: .6, clearcoatRoughness: .25 });
  const skin = plastic('#e5ad78');
  const navy = plastic('#20334f', .38);
  const cloth = plastic('#243956', .43);
  const hair = plastic('#171619', .34);
  const black = plastic('#101215', .2);
  const lens = plastic('#111b28', .1);
  const white = plastic('#f8f4e9');
  const metal = plastic('#a9b0b6', .25);
  const red = plastic('#e3432e');
  const wood = plastic('#cfa46c', .5);
  const olive = plastic('#7a8153', .5);
  const shirtColor = new THREE.Color();

  function mesh(parent, geometry, material, x = 0, y = 0, z = 0) {
    const value = new THREE.Mesh(geometry, material);
    value.position.set(x, y, z);
    parent.add(value);
    return value;
  }
  function box(parent, size, material, x = 0, y = 0, z = 0, radius = .045) {
    return mesh(parent, new RoundedBoxGeometry(...size, 3, radius), material, x, y, z);
  }
  function ball(parent, size, material, x, y, z) {
    const value = mesh(parent, new THREE.SphereGeometry(1, 24, 16), material, x, y, z);
    value.scale.set(...size);
    return value;
  }
  function tube(parent, points, radius, material) {
    const curve = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point)));
    return mesh(parent, new THREE.TubeGeometry(curve, 20, radius, 8, false), material);
  }
  function panel(parent, points, material, depth = .035) {
    const shape = new THREE.Shape();
    points.forEach(([x, y], index) => index ? shape.lineTo(x, y) : shape.moveTo(x, y));
    shape.closePath();
    return mesh(parent, new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false }), material);
  }

  // Molded trapezoid torso, separate lapels, shirt and tie.
  const torsoShape = new THREE.Shape();
  torsoShape.moveTo(-.64, 0); torsoShape.lineTo(-.48, 1.14);
  torsoShape.lineTo(.48, 1.14); torsoShape.lineTo(.64, 0); torsoShape.closePath();
  mesh(person, new THREE.ExtrudeGeometry(torsoShape, { depth: .56, bevelEnabled: true, bevelSize: .055, bevelThickness: .055, bevelSegments: 3 }), cloth, 0, 1.55, -.28);
  box(person, [1.22, .2, .65], navy, 0, 1.48, 0);
  const formal = new THREE.Group();
  formal.position.set(0, 1.58, .345);
  person.add(formal);
  panel(formal, [[-.24, 1.08], [.24, 1.08], [.16, .23], [-.16, .23]], white);
  panel(formal, [[-.46, 1.07], [-.24, 1.1], [-.04, .33], [-.38, .66], [-.23, .8]], navy);
  panel(formal, [[.46, 1.07], [.24, 1.1], [.04, .33], [.38, .66], [.23, .8]], navy);
  const tie = panel(formal, [[0, 1.01], [-.075, .91], [-.035, .8], [-.1, .3], [0, .2], [.1, .3], [.035, .8], [.075, .91]], navy);
  tie.position.z = .055;
  for (let y = .33; y < .8; y += .16) {
    const stripe = box(formal, [.13, .025, .012], metal, 0, y, .099, .002);
    stripe.rotation.z = -.5;
  }
  box(person, [.26, .14, .025], metal, 0, 1.49, .345, .015);
  box(person, [.17, .075, .03], black, 0, 1.49, .365, .005);
  const sportsNumber = box(person, [.1, .36, .025], white, 0, 2.12, .365, .005);

  const head = new THREE.Group();
  head.position.y = 3.22;
  person.add(head);
  mesh(person, new THREE.CylinderGeometry(.23, .23, .27, 24), skin, 0, 2.79, 0);
  box(head, [1.2, 1.04, 1.01], skin, 0, 0, 0, .23);
  ball(head, [.1, .16, .14], skin, -.62, -.05, 0);
  ball(head, [.1, .16, .14], skin, .62, -.05, 0);
  // Solid tinted lenses, thick frames and actual temple arms.
  [-1, 1].forEach(side => {
    const frame = box(head, [.52, .34, .13], black, side * .29, .08, .49, .09);
    frame.rotation.z = side * -.035;
    box(head, [.42, .245, .035], lens, side * .29, .08, .572, .07);
    box(head, [.06, .08, .5], black, side * .59, .14, .27, .025);
  });
  box(head, [.13, .065, .09], black, 0, .13, .555, .02);
  tube(head, [[-.18, -.25, .51], [-.06, -.29, .529], [.08, -.28, .529], [.2, -.2, .51]], .019, black);
  // Layered, swept locks instead of a flat hair silhouette.
  ball(head, [.65, .29, .54], hair, 0, .48, -.025);
  for (let i = 0; i < 15; i++) {
    const x = -.54 + (i % 5) * .24;
    const z = .38 - Math.floor(i / 5) * .3;
    tube(head, [[x - .08, .39, z], [x - .12, .65, z + .08], [x + .1, .79 + .035 * Math.sin(i * 4), z - .05], [x + .25, .59, z - .21]], .09 + (i % 3) * .012, hair);
  }
  for (const side of [-1, 1]) ball(head, [.12, .33, .38], hair, side * .56, .26, -.12);

  function arm(side) {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * .68, 2.55, 0);
    person.add(shoulder);
    mesh(shoulder, new THREE.CapsuleGeometry(.22, .34, 5, 16), cloth, side * .06, -.23, 0).rotation.z = side * .1;
    const elbow = new THREE.Group();
    elbow.position.set(side * .1, -.5, 0);
    shoulder.add(elbow);
    mesh(elbow, new THREE.CylinderGeometry(.19, .15, .46, 20), cloth, 0, -.19, 0);
    mesh(elbow, new THREE.CylinderGeometry(.125, .125, .17, 20), skin, 0, -.46, 0);
    const hand = new THREE.Group();
    hand.position.set(0, -.6, .02);
    elbow.add(hand);
    const grip = mesh(hand, new THREE.TorusGeometry(.145, .075, 10, 24, Math.PI * 1.55), skin);
    grip.rotation.z = .7;
    return { shoulder, elbow, hand };
  }
  function leg(side) {
    const hip = new THREE.Group();
    hip.position.set(side * .32, 1.4, 0);
    person.add(hip);
    const joint = mesh(hip, new THREE.CylinderGeometry(.26, .26, .53, 24), navy, 0, -.15, 0);
    joint.rotation.z = Math.PI / 2;
    box(hip, [.53, .95, .51], navy, 0, -.64, .01, .045);
    box(hip, [.55, .28, .77], navy, 0, -1.12, .12, .035);
    return hip;
  }
  const leftArm = arm(-1), rightArm = arm(1), leftLeg = leg(-1), rightLeg = leg(1);

  const laptop = new THREE.Group();
  laptop.position.set(0, 1.38, .65);
  person.add(laptop);
  box(laptop, [1.12, .07, .77], metal);
  const display = new THREE.Group();
  display.position.set(0, .03, .34); display.rotation.x = -.2;
  laptop.add(display);
  box(display, [1.12, .7, .07], metal, 0, .35, 0);
  box(display, [.97, .55, .025], black, 0, .35, -.046);
  const code = plastic('#b9d786');
  for (let i = 0; i < 4; i++) box(display, [.22 + (i % 2) * .3, .023, .015], code, -.1, .18 + i * .1, -.064, .002);

  const football = new THREE.Group(); stage.add(football);
  ball(football, [.29, .29, .29], white, 0, 0, 0);
  for (let i = 0; i < 12; i++) {
    const phi = Math.acos(1 - 2 * (i + .5) / 12), theta = i * 2.4;
    const patch = mesh(football, new THREE.CircleGeometry(.09, 5), black, .294 * Math.sin(phi) * Math.cos(theta), .294 * Math.cos(phi), .294 * Math.sin(phi) * Math.sin(theta));
    patch.lookAt(patch.position.clone().multiplyScalar(2));
  }
  const backpack = new THREE.Group(); person.add(backpack);
  box(backpack, [1, .95, .43], olive, 0, 2.1, -.58, .12);
  box(backpack, [.75, .34, .25], wood, 0, 2.7, -.62, .1);
  const pole = new THREE.Group(); rightArm.hand.add(pole);
  mesh(pole, new THREE.CylinderGeometry(.03, .025, 1.65, 12), metal, 0, -.45, 0);
  box(pole, [.08, .28, .08], black, 0, .3, 0);
  const bat = new THREE.Group(); rightArm.hand.add(bat);
  mesh(bat, new THREE.CylinderGeometry(.04, .04, .4, 12), black, 0, -.15, 0);
  box(bat, [.24, .9, .1], wood, 0, -.8, 0, .04);
  const cricketBall = ball(stage, [.13, .13, .13], red, 1, .15, .5);

  const car = new THREE.Group(); stage.add(car);
  box(car, [1.18, .3, 2.7], red, 0, .52, .1, .14);
  box(car, [.46, .25, 1.55], red, 0, .49, 1.45, .07);
  box(car, [2.4, .1, .38], black, 0, .32, 2.05, .03);
  box(car, [2.2, .1, .42], red, 0, .96, -1.25, .02);
  box(car, [.1, .6, .12], black, -.6, .67, -1.2);
  box(car, [.1, .6, .12], black, .6, .67, -1.2);
  box(car, [1.6, .25, 1.05], red, 0, .64, -.18, .1);
  const wheels = [];
  for (const x of [-1, 1]) for (const z of [-.85, 1.3]) {
    const wheel = mesh(car, new THREE.CylinderGeometry(.37, .37, .33, 24), black, x, .4, z);
    wheel.rotation.z = Math.PI / 2;
    wheels.push(wheel);
    const hub = mesh(car, new THREE.CylinderGeometry(.15, .15, .35, 16), metal, x, .4, z);
    hub.rotation.z = Math.PI / 2;
  }

  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = shadowCanvas.height = 128;
  const ctx = shadowCanvas.getContext('2d');
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(35,37,39,.26)'); gradient.addColorStop(1, 'rgba(35,37,39,0)');
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, 128, 128);
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadow = mesh(stage, new THREE.PlaneGeometry(3.5, 2.5), new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false }), 0, .015, 0);
  shadow.rotation.x = -Math.PI / 2;

  const palette = ['#243956', '#6a9676', '#cb4030', '#c48450', '#e5dfcd'].map(color => new THREE.Color(color));
  function update(pose, time, travel) {
    const phase = clamp(pose, 0, 4);
    const weights = Array.from({ length: 5 }, (_, index) => Math.max(0, 1 - Math.abs(phase - index)));
    const [developer, soccer, racing, hiking, cricket] = weights;
    const cycle = Math.sin(time * 3.7);
    const kick = Math.max(0, Math.sin(time * 3));
    const swing = Math.sin(time * 2);
    const transition = Math.sin(Math.PI * (phase % 1));
    person.position.y = .04 * Math.sin(time * 2) + transition * .5 - racing * .38;
    stage.rotation.y = -.22 + Math.sin(travel * 1.5) * .3;
    person.rotation.y = transition * .42 + Math.sin(time * .7) * .05;
    head.rotation.set(0, Math.sin(time * .9) * .13, Math.sin(time * 1.3) * .04);
    leftArm.shoulder.rotation.set(-.7 * developer + .4 * soccer - .9 * racing + cycle * .5 * hiking - .45 * cricket, 0, -.1 - .25 * soccer - .08 * hiking);
    rightArm.shoulder.rotation.set(-.75 * developer - .25 * soccer - .9 * racing - cycle * .5 * hiking - (1 + swing) * .8 * cricket, 0, .1 + .3 * soccer + .15 * hiking - .3 * cricket);
    leftArm.elbow.rotation.x = -.55 * developer + Math.sin(time * 7) * .08 * developer - .4 * racing;
    rightArm.elbow.rotation.x = -.55 * developer - Math.sin(time * 7) * .08 * developer - .4 * racing - .5 * cricket;
    leftLeg.rotation.x = .1 * developer + cycle * .65 * hiking - 1.35 * racing + .2 * soccer;
    rightLeg.rotation.x = -.1 * developer - cycle * .65 * hiking - 1.35 * racing - kick * 1.1 * soccer - .2 * cricket;
    rightLeg.rotation.z = -.13 * cricket;
    leftLeg.rotation.z = .13 * cricket;
    shirtColor.setRGB(0, 0, 0);
    palette.forEach((color, index) => { shirtColor.r += color.r * weights[index]; shirtColor.g += color.g * weights[index]; shirtColor.b += color.b * weights[index]; });
    cloth.color.copy(shirtColor);
    formal.scale.setScalar(Math.max(.001, developer)); formal.visible = developer > .01;
    sportsNumber.scale.setScalar(soccer); sportsNumber.visible = soccer > .01;
    laptop.scale.setScalar(Math.max(.001, developer)); laptop.visible = developer > .01;
    football.visible = soccer > .01; football.scale.setScalar(soccer);
    football.position.set(.95 + kick * .8, .3 + kick * .5, .65); football.rotation.z = -time * 2;
    car.visible = racing > .01; car.scale.setScalar(Math.max(.001, racing)); car.position.x = (1 - racing) * 2;
    wheels.forEach(wheel => { wheel.rotation.x = time * 7; });
    backpack.visible = hiking > .01; backpack.scale.setScalar(Math.max(.001, hiking));
    pole.visible = hiking > .01; pole.scale.setScalar(Math.max(.001, hiking));
    bat.visible = cricket > .01; bat.scale.setScalar(Math.max(.001, cricket)); bat.rotation.z = -.15;
    cricketBall.visible = cricket > .01; cricketBall.scale.setScalar(cricket);
    cricketBall.position.set(.85 + Math.max(0, swing) * .8, .2 + Math.max(0, swing) * .4, .5);
    stage.scale.setScalar(1 - racing * .13);
    shadow.scale.setScalar(1 - transition * .15);
    renderer.render(scene, camera);
  }
  function resize() {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  return {
    update,
    dispose() {
      resizeObserver.disconnect();
      const geometries = new Set(), materials = new Set();
      scene.traverse(object => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.material) (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material));
      });
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      shadowTexture.dispose(); env.dispose(); renderer.dispose();
    },
  };
}
