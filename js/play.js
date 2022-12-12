import { Helper } from "./helper.js"
import { View } from "./view.js"
import { Figure } from "./figure.js"

const helper = new Helper()
const view = new View()
view.init()
const figure = new Figure()
figure.init(view.scene)
figure.head.rotation.y += 3.5;
figure.head.position.x = 0;
// figure.head.position.y = 0;
figure.body.position.x = 0;
// figure.body.position.y = -;

gsap.set(figure.params, {
	y: -1.5
})

gsap.to(figure.params, {
	y: 0,
	armRotation: helper.degreesToRadians(90),
	repeat: -1,
	yoyo: true,
	duration: 1,
})

gsap.ticker.add(() => {
	document.addEventListener("keydown", (e) => {
		if (e.key === "ArrowLeft") {
			if(figure.head.position.x === 0 && figure.body.position.x === 0){
				figure.head.position.x = -2
				figure.body.position.x = -2
			}
			if(figure.head.position.x === 2 && figure.body.position.x === 2) {
				figure.head.position.x = 0
				figure.body.position.x = 0
			}
		} else if (e.key === "ArrowRight") {
			if(figure.head.position.x === 0 && figure.body.position.x === 0) {
				figure.head.position.x = 2
				figure.body.position.x = 2
			}
			if(figure.head.position.x === -2 && figure.body.position.x === -2) {
				figure.head.position.x = 0
				figure.body.position.x = 0
			}
		} else if(e.key === "ArrowUp") {  // jump tp belom didefinisikan posisi y nya
			figure.head.position.y += 0.3
			figure.body.position.y += 0.3
		}
	})
	// figure.bounce(),
	view.render()
})