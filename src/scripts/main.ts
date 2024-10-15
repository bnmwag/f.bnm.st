import * as THREE from 'three'
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'

const getContainerSize = () => {
	const container = document.getElementById('canvas')?.parentElement
	const { width, height } = container?.getBoundingClientRect() || {
		width: 0,
		height: 0,
	}

	return { width, height }
}

const initializeScene = () => {
	const scene = new THREE.Scene()
	const vMouse = new THREE.Vector2()
	const vMouseDamp = new THREE.Vector2()
	const vResolution = new THREE.Vector2()
	let w = 1
	let h = 1
	const aspect = w / h
	const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000)

	const canvas = document.getElementById('canvas') as HTMLCanvasElement
	const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })

	const resize = () => {
		const dpr = Math.min(window.devicePixelRatio, 2)
		const { width, height } = getContainerSize()
		w = width
		h = height

		renderer.setSize(w, h)
		renderer.setPixelRatio(dpr)

		camera.left = -width / 2
		camera.right = width / 2
		camera.top = height / 2
		camera.bottom = -height / 2
		camera.updateProjectionMatrix()

		quad.scale.set(width, height, 1)
		vResolution.set(width, height).multiplyScalar(dpr)
		mat.uniforms.u_pixelRatio.value = dpr
	}

	window.addEventListener('resize', resize)

	window.addEventListener('mousemove', (e: MouseEvent) => {
		vMouse.set(e.clientX, e.clientY)
	})
	window.addEventListener('pointermove', (e: MouseEvent) => {
		vMouse.set(e.clientX, e.clientY)
	})

	const geo = new THREE.PlaneGeometry(1, 1)
	const mat = new THREE.ShaderMaterial({
		vertexShader,
		fragmentShader,
		uniforms: {
			u_mouse: { value: vMouseDamp },
			u_resolution: { value: vResolution },
			u_pixelRatio: { value: 2 },
		},
	})
	const quad = new THREE.Mesh(geo, mat)
	scene.add(quad)

	camera.position.z = 1

	let lastTime = 0
	const update = () => {
		const time = performance.now() * 0.001
		const dt = time - lastTime
		lastTime = time

		vMouseDamp.lerp(vMouse, 1 - Math.exp(-8 * dt))

		requestAnimationFrame(update)
		renderer.render(scene, camera)
	}

	resize()
	update()
}

initializeScene()
