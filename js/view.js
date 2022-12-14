export class View {
  constructor() {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.scene = new THREE.Scene();
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

    // Road
    this.planeTexture = new THREE.TextureLoader().load('images/road.jpg');
    this.planeTexture.wrapS = THREE.RepeatWrapping;
    this.planeTexture.wrapT = THREE.RepeatWrapping;
    this.planeTexture.repeat.set(1, 20);
    this.planeGeometry = new THREE.PlaneGeometry(15, 500);
    this.planeMaterial = new THREE.MeshBasicMaterial({
      map: this.planeTexture,
    });
    this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
    this.plane.rotateX(-Math.PI * 0.5);
    this.plane.castShadow = true;
    this.plane.receiveShadow = true;
    this.plane.position.y = -5;
    this.plane.position.z = -30;
  }

  render() {
    // Road animation
    this.plane.position.z += 0.3;
    if(this.plane.position.z > 40) this.plane.position.z = -30;
    
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.render(this.scene, this.camera);
    document.body.appendChild(this.renderer.domElement);
    const titleText = document.getElementById('title');
    titleText.innerHTML = "Trivia Quiz";
    // Initialize the scores and difficulty.
    var score = 0;
    document.getElementById("score").innerHTML = "Score:"  + " " + score;
  }

  init() {
    this.render();
    this.scene.add(this.camera);
    this.scene.add(this.lightAmbient);
    this.scene.add(this.lightDirectional);
    this.scene.add(this.plane);
    window.addEventListener("resize", () => {
      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerHeight;

      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();
    });
  }
}
