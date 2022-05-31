import * as THREE from "three";
// import { FirstPersonControls } from "../controls/FirstPersonControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as dat from 'dat.gui'

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from "gsap";


let dataSrc = 'data:image/jpg;base64,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'

//Global variables
let currentRef = null;

const timeline = new gsap.timeline({
  defaults: {
    duration: 1
  }
})

const gui = new dat.GUI({width: 500})


const cameraFolder = gui.addFolder('camera')

let cameraCords = {
  x: 102,
  y: -7,
  z: -18, 
}

let orbitCords = {
  x: 45,
  y: -2.2,
  z: -117,
}



const animationsParams = {
  cube1: {
    target: {
      x:  -7,
      y: 0,
      z: 27,
    },
    camera: {
      x:  -18,
      y: 0,
      z: 25,
    },
    zoom: 1
  },

  cube2: {
    target: {
      x:  -10,
      y: 0,
      z: 10,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
    },
    zoom: 0.5
  },

  cube3: {
    target: {
      x:  -18,
      y: 0,
      z: 0,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
    },
    zoom: 1
  },

  cube4: {
    target: {
      x:  -28,
      y: 0,
      z: -13,
    },
    camera: {
      x:  -21,
      y: 0,
      z: -15,
    },
    zoom: 1
  },

  cube5: {
    target: {
      x:  -35,
      y: 0,
      z: -13,
    },
    camera: {
      x:  -21,
      y: 0,
      z: -15,
    },
    zoom: 1
  },

  cube6: {
    target: {
      x:  -27,
      y: 0,
      z: 27,
    },
    camera: {
      x:  -18,
      y: 0,
      z: 25,
    },
    zoom: 1
  },

  cube7: {
    target: {
      x:  -42,
      y: 0,
      z: 20,
    },
    camera: {
      x:  -18,
      y: 0,
      z: 20,
    },
    zoom: 1
  },

  cube8: {
    target: {
      x:  -58,
      y: -2.2,
      z: 8,
    },
    camera: {
      x:  -18,
      y: 0,
      z: 20,
    },
    zoom: 1
  },

  cube9: {
    target: {
      x:  -72,
      y: 0,
      z: -5,
    },
    camera: {
      x:  -18,
      y: 0,
      z: 20,
    },
    zoom: 1
  },

  cube10: {
    target: {
      x:  -90,
      y: 0,
      z: -5,
    },
    camera: {
      x:  0,
      y: 0,
      z: 0,
    },
    zoom: 1
  },

  cube11: {
    target: {
      x:  -93,
      y: 0,
      z: 4,
    },
    camera: {
      x:  0,
      y: 0,
      z: 0,
    },
    zoom: 1
  },

  cube12: {
    target: {
      x:  -105,
      y: 0,
      z: 9,
    },
    camera: {
      x:  0,
      y: 0,
      z: 0,
    },
    zoom: 1
  },

  cube13: {
    target: {
      x:  -100,
      y: 0,
      z: 21,
    },
    camera: {
      x:  0,
      y: 0,
      z: 0,
    },
    zoom: 1
  },

  cube14: {
    target: {
      x:  -88,
      y: 0,
      z: 24,
    },
    camera: {
      x:  0,
      y: 0,
      z: 0,
    },
    zoom: 1
  },

  cube15: {
    target: {
      x:  -81,
      y: 0,
      z: 30,
    },
    camera: {
      x:  0,
      y: 0,
      z: 0,
    },
    zoom: 1
  },
}



//fog

//linear fog
// var fogFactor = (far - distance) / (far - near)
// var finalColor = mix(currentColor, fogColor, fogFactor)

// // exponential squared fog 

// var fogFactor = 1.0 -  exp(far - distance) / (far - near)
// var finalColor = mix(currentColor, fogColor, fogFactor)



//Scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);

//background


const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(100, 100);

// controls = new THREE.FirstPersonControls;
// const controls = new OrbitControls(camera, document.body);



    const enviromentMap = new THREE.CubeTextureLoader()
    const envMap = enviromentMap.load([
        './textures/px.png',
        './textures/nx.png',
        './textures/py.png',
        './textures/ny.png',
        './textures/pz.png',
        './textures/nz.png',
    ])

    // scene.background = envMap
    // scene.environment = envMap

    //cube
    const cube = new THREE.Mesh(
        new THREE.BoxBufferGeometry(800, 400, 800),
        new THREE.MeshBasicMaterial({
            //para darle color tipo hexadecimal le damos 0x y despues el codigo del color
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: false,
            opacity: 1,
            

            //aqui solo veriamos la geometria de el material
            wireframe: false
        })
    )

    
    scene.add(cube)
    cube.position.z = 0

    // plane
    const geometry = new THREE.PlaneGeometry( 400, 400 );
    const material = new THREE.MeshBasicMaterial( {color: 0x172b1c, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.rotateX(Math.PI / 2)
    plane.position.set(0,-5,0)
    scene.add( plane );
    //esto nos agregara un background a toda la scena

scene.fog = new THREE.Fog(0xDFE9F3, 10, 80)



//OrbitControls

cameraFolder.add(orbitCords, 'x')
.min(-100)
.max(100)
.name('orbX')
.onChange(() => {
  orbitControls.target.setX(orbitCords.x)
  cameraFolder.updateDisplay()
})

cameraFolder.add(orbitCords, 'y')
.min(-100)
.max(100)
.name('orbY')
.onChange(() => {
  orbitControls.target.setY(orbitCords.y)
  cameraFolder.updateDisplay()
})

cameraFolder.add(orbitCords, 'z')
.min(-100)
.max(100)
.name('orbZ')
.onChange(() => {
  orbitControls.target.setZ(orbitCords.z)
  cameraFolder.updateDisplay()
})


const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.minDistance = 0
orbitControls.maxDistance = 1
orbitControls.enableDamping = true;
orbitControls.enableZoom = false
orbitControls.enablePan = false
orbitControls.minPolarAngle = Math.PI / 2.1
orbitControls.maxPolarAngle = Math.PI / 2.1
orbitControls.screenSpacePanning = true
orbitControls.enableRotate = true
orbitControls.autoRotate = false

//Resize canvas
const resize = () => {
  renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
  camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", resize);

//Animate the scene
const mountScene = () => {
  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(mountScene);
};
mountScene();





cameraFolder.add(cameraCords, 'x')
.min(-100)
.max(100)
.name('x')
.onChange(() => {
  camera.position.setX(cameraCords.x);
  cameraFolder.updateDisplay()
})

cameraFolder.add(cameraCords, 'y')
.min(-100)
.max(100)
.name('y')
.onChange(() => {
  camera.position.setY(cameraCords.y);
  cameraFolder.updateDisplay()
})

cameraFolder.add(cameraCords, 'z')
.min(-100)
.max(100)
.name('z')
.onChange(() => {
  camera.position.setZ(cameraCords.z);
  cameraFolder.updateDisplay()
})



// raycaster 

const raycaster = new THREE.Raycaster()



const gsapAnimations = (mesh) => {

 timeline.to(orbitControls.target,{
   x: animationsParams[mesh].target.x,
   y: animationsParams[mesh].target.y,
   z: animationsParams[mesh].target.z,
 })
 // aqui se modifica la camara despues de posicionarse
//  .to(camera.position, {
//    x: animationsParams[mesh].camera.x,
//    y: animationsParams[mesh].camera.y,
//    z: animationsParams[mesh].camera.z,
//  }, '-=1.0')  // no agregar dilay a la primera animacion porque puede ocasionar un error
 .to(camera, {
   zoom:animationsParams.cube1.zoom,
   onUpdate: () => {
     camera.updateProjectionMatrix()
   }
 }, "-=1.0")

 cameraFolder.updateDisplay()
}


//get mouse cords
const pointer = new THREE.Vector2(300, 300)


function onPointerMove( event ) {
  
  // console.log(pointer)
  // console.log(event)
	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

window.addEventListener( 'pointermove',  onPointerMove );


//handle mesh click
let meshCurrentClick = null

const handleMeshsClick = () => {
  try {
    switch (meshCurrentClick.name) {
      case "mesh_185":
        gsapAnimations('cube1')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "mesh_187":
        gsapAnimations('cube2')

        console.log('click cube 2')
        return meshCurrentClick = null 

      case "mesh_188":
        gsapAnimations('cube3')

        console.log('click cube 3')
        return meshCurrentClick = null 

      case "mesh_191":
        gsapAnimations('cube4')

        console.log('click cube 4')
        return meshCurrentClick = null 

      case "mesh_190":
        gsapAnimations('cube5')

        console.log('click cube 5')
        return meshCurrentClick = null 

      case "mesh_186":
        gsapAnimations('cube6')

        console.log('click cube 6')
        return meshCurrentClick = null 
          

      case "mesh_189":
        gsapAnimations('cube7')

        console.log('click cube 7')
        return meshCurrentClick = null 

      case "mesh_193":
        gsapAnimations('cube8')

        console.log('click cube 8')
        return meshCurrentClick = null 

      case "mesh_194":
        gsapAnimations('cube9')

        console.log('click cube 9')
        return meshCurrentClick = null 

      case "mesh_195":
        gsapAnimations('cube10')

        console.log('click cube 10')
        return meshCurrentClick = null 

      case "mesh_196":
        gsapAnimations('cube11')

        console.log('click cube 11')
        return meshCurrentClick = null 

      case "mesh_197":
        gsapAnimations('cube12')

        console.log('click cube 12')
        return meshCurrentClick = null 

      case "mesh_198":
        gsapAnimations('cube13')

        console.log('click cube 13')
        return meshCurrentClick = null 

      case "mesh_199":
        gsapAnimations('cube14')

        console.log('click cube 14')
        return meshCurrentClick = null 

      case "mesh_200":
        gsapAnimations('cube15')

        console.log('click cube 15')
        return meshCurrentClick = null 
          
      default:
        meshCurrentClick = null
        break;
      }
      
    } catch (error) {
    console.log(error)
  }
}

window.addEventListener('click', handleMeshsClick)


//load model 3d

const gltfloader = new GLTFLoader()


let meshCurrentHover = null

let museoScene;

gltfloader.load('./model/scene.gltf', 
(gltf) => {

      gltf.scene.position.set(-115, -5, 55)

      scene.add(gltf.scene)
      // console.log(gltf.scene)

      const campo = gltf.scene.children[0].children.find(el => el.name === "mesh_1")
      let vertices1 = campo.geometry.attributes.position.array
      // let vertices2 = campo.geometry.attributes.position
      // let vertices2 = campo.geometry.attributes.uv
      console.log('campo', campo.geometry.attributes)

      let geometry2 = new THREE.BufferGeometry();
      geometry2.copy(campo.geometry)
      var image = document.createElement('img');
      image.src = dataSrc;
      let sprite = new THREE.Texture(image);
      sprite.needsUpdate = true;
      // let arr = []
      // for (var i = 0; i < 200000; i++) {
      //     var vertex = new THREE.Vector3();
      //     vertex.x = THREE.MathUtils.randFloatSpread(-500, 500 );
      //     vertex.y = -2;
      //     vertex.z = THREE.MathUtils.randFloatSpread( -500, 500 );
      //     const [x,y,z] = vertex
      //     arr.push(x,y,z)
      // }
      // const vertices = new Float32Array(arr)
      // geometry2.setAttribute('position',  new THREE.BufferAttribute(vertices1,3,true))
      // geometry2.rotateX(-80)
      // geometry2.setAttribute('normal', vertices1)
      // geometry2.setAttribute('uv', new THREE.BufferAttribute(vertices,3,true))
      // geometry2.rotateX(360)
      let material2 = new THREE.PointCloudMaterial({
          size: 900,
          sizeAttenuation: false,
          map: sprite,
          transparent: false,
          alphaTest: 1
      });

      // material.color.setHSL(1.0, 0.3, 0.7);
      
      
      let particles = new THREE.Points(geometry2, material2);
      particles.rotateX(Math.PI / 2)
      particles.rotateY(Math.PI / 2 * 2)
      particles.position.set(-115, -3, 55)
      // particles.sortParticles = true;
      // Using material.alphaTest = 0.5 instead
      // Thanks @WestLangley
      scene.add(particles);
      console.log(particles)


      camera.position.set(200, 200, 100);
      camera.lookAt(new THREE.Vector3(20, 70, 200));
      scene.add(camera);



      // camera.position.set(10000, 200, 1700);

  
      
      const cube0 = gltf.scene.children[0].children.find(el => el.name === "mesh_1")
      const cube1 = gltf.scene.children[0].children.find(el => el.name === "mesh_185")
      const cube2 = gltf.scene.children[0].children.find(el => el.name === "mesh_187")
      const cube3 = gltf.scene.children[0].children.find(el => el.name === "mesh_188")
      const cube4 = gltf.scene.children[0].children.find(el => el.name === "mesh_191")
      const cube5 = gltf.scene.children[0].children.find(el => el.name === "mesh_190")
      const cube6 = gltf.scene.children[0].children.find(el => el.name === "mesh_186")
      const cube7 = gltf.scene.children[0].children.find(el => el.name === "mesh_189")
      const cube8 = gltf.scene.children[0].children.find(el => el.name === "mesh_193")
      const cube9 = gltf.scene.children[0].children.find(el => el.name === "mesh_194")
      const cube10 = gltf.scene.children[0].children.find(el => el.name === "mesh_195")
      const cube11 = gltf.scene.children[0].children.find(el => el.name === "mesh_196")
      const cube12 = gltf.scene.children[0].children.find(el => el.name === "mesh_197")
      const cube13 = gltf.scene.children[0].children.find(el => el.name === "mesh_198")
      const cube14 = gltf.scene.children[0].children.find(el => el.name === "mesh_199")
      const cube15 = gltf.scene.children[0].children.find(el => el.name === "mesh_200")
  
    
      console.log(cube1)

      const objectForCollitions = () => {
        return [cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9, cube10, cube11, cube12, cube13, cube14, cube15] //tambien podemos pasarles grupos mediante three.groups
      }

      var clock = new THREE.Clock()
      console.log('clock', clock.getDelta())
      const animate = () => {
      
        raycaster.setFromCamera(pointer, camera)
      
        const collitions = objectForCollitions()
      
        const intersects = raycaster.intersectObjects(collitions)
        // console.log(intersects)
          //mouse on leave
          if (meshCurrentHover) {
            gsap.to(meshCurrentHover.material.color, {
              r: 1,
              g: 1,
              b: 1,
              overwrite: true,
              duration: 0.5,
            })
          }
          
          
          //mouse hover and click
          if (intersects.length) {
            meshCurrentHover = null
            meshCurrentHover = intersects[0].object
            meshCurrentClick = intersects[0].object


            gsap.to(meshCurrentHover.material.color, {
              r: 1,
              g: 0,
              b: 0,
              overwrite: true,
              duration: 0.3,
            })
          } else if(meshCurrentHover) {
            gsap.to(meshCurrentHover.material.color, {
              r: 1,
              g: 1,
              b: 1,
              overwrite: true,
              duration: 0.8,
            })
            meshCurrentHover = null
      
          }
      
          orbitControls.update();
          // controls.update(clock.getDelta())
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate()
      

      
      console.log(scene)
      // while (gltf.scene.children.length) {
      //   console.log(gltf.scene.children[0])
      //   scene.add(gltf.scene.children[0])
      // }
  },
  () => {
    console.log('onloading')
  },
  () => {
    console.log('error')
  }
)





const light = new THREE.AmbientLight(0xffffff, 5)
scene.add(light)

console.log(scene[0])


//cube

//Init and mount the scene
export const initScene = (mountRef) => {
  currentRef = mountRef.current;
  resize();
  currentRef.appendChild(renderer.domElement);
  
};

//Dismount and clena up the buffer from the scene
export const cleanUpScene = () => {
  scene.dispose();
  gui.destroy()
  // FirstPersonControls.dispose()

  currentRef.removeChild(renderer.domElement);
};
