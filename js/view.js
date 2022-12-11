export class View {
  constructor() {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xFAD7C3);
    const loader = new THREE.TextureLoader();
		this.scene.background = loader.load( 'images/bg.jpg' );
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.renderer = new THREE.WebGLRenderer();
    this.lightAmbient = new THREE.AmbientLight(0x9eaeff, 0.5);
    this.lightDirectional = new THREE.DirectionalLight(0xffffff, 0.8);
    this.lightDirectional.position.set(5, 5, 5);
  }

  render() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.render(this.scene, this.camera);
    document.body.appendChild(this.renderer.domElement);
    const titleText = document.getElementById('title');
    titleText.innerHTML = "Trivia Quiz";
  }

  init() {
    this.render();
    this.scene.add(this.camera);
    this.scene.add(this.lightAmbient);
    this.scene.add(this.lightDirectional);
    window.addEventListener("resize", () => {
      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerHeight;

      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();
    });
  }
}
