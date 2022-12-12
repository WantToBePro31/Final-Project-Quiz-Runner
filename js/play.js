import { Helper } from "./helper.js"
import { View } from "./view.js"
import { Figure } from "./figure.js"

const helper = new Helper()
const view = new View()
view.init()
const figure = new Figure()
figure.init(view.scene)
figure.head.rotation.y += 3.5;

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
	figure.bounce(),
	view.render()
})