import * as THREE from "three";
// import { FirstPersonControls } from "../controls/FirstPersonControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as dat from 'dat.gui'

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from "gsap";

import tree3 from '../../trees/Arbol-3.png'
import tree4 from '../../trees/Arbol-4.png'
import tree5 from '../../trees/Arbol-5.png'
import tree6 from '../../trees/Arbol-6.png'
import tree7 from '../../trees/Arbol-7.png'
import tree8 from '../../trees/Arbol-8.png'
import tree9 from '../../trees/Arbol-9.png'


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
      case "Object_54_1":
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

gltfloader.load('./model/scene2.gltf', 
(gltf) => {

      gltf.scene.position.set(34, -5, -28)


      scene.add(gltf.scene)

      

      camera.position.set(34, -5, -28);
      camera.lookAt(new THREE.Vector3(200, 200, 200));
      scene.add(camera);
      // console.log(gltf.scene)

      /*
      const campo = gltf.scene.children[0].children.find(el => el.name === "mesh_1")
      let vertices1 = campo.geometry.attributes.position.array
      // let vertices2 = campo.geometry.attributes.position
      // let vertices2 = campo.geometry.attributes.uv
      console.log('campo', campo.geometry.attributes)

    
      //aqui se renderiza los arboles en png

      let geometry2 = new THREE.BufferGeometry();
      geometry2.copy(campo.geometry)

      let array = []
      let numMaxplans = 2000
      let plans = 0
      let count = 0
      let threeType = 0

      let imgtree1 = document.createElement('img');
      imgtree1.src = tree3
      let sprite1 = new THREE.Texture(imgtree1);
      sprite1.needsUpdate = true;

      let imgtree2 = document.createElement('img');
      imgtree2.src = tree4
      let sprite2 = new THREE.Texture(imgtree2);
      sprite2.needsUpdate = true;

      let imgtree3 = document.createElement('img');
      imgtree3.src = tree5
      let sprite3 = new THREE.Texture(imgtree3);
      sprite3.needsUpdate = true;

      let imgtree4 = document.createElement('img');
      imgtree4.src = tree6
      let sprite4 = new THREE.Texture(imgtree4);
      sprite4.needsUpdate = true;

      let imgtree5 = document.createElement('img');
      imgtree5.src = tree7
      let sprite5 = new THREE.Texture(imgtree5);
      sprite5.needsUpdate = true;

      let imgtree6 = document.createElement('img');
      imgtree6.src = tree8
      let sprite6 = new THREE.Texture(imgtree6);
      sprite6.needsUpdate = true;

      

       for (let index = 0; index < geometry2.attributes.position.array.length; index++) {
         if (count <= 3) {
           count++
           array.push(geometry2.attributes.position.array[index])
          //  console.log('aquii',array)
          } else if(count === 4) {
              count++
              let mat
              switch (threeType) {
                case 0:
                  mat = new THREE.SpriteMaterial( {map: sprite1, transparent: true, alphaTest: 0.2} )
                  break;
                  
                  case 1:
                  mat = new THREE.SpriteMaterial( {map: sprite2, transparent: true, alphaTest: 0.2} )
                  break;
                  
                  case 2:
                  mat = new THREE.SpriteMaterial( {map: sprite3, transparent: true, alphaTest: 0.2} )
                  break;
                  
                  case 3:
                  mat = new THREE.SpriteMaterial( {map: sprite4, transparent: true, alphaTest: 0.2} )
                  break;
                  
                  case 4:
                  mat = new THREE.SpriteMaterial( {map: sprite5, transparent: true, alphaTest: 0.2} )
                  break;
                  
                  case 5:
                    mat = new THREE.SpriteMaterial( {map: sprite6, transparent: true, alphaTest: 0.2} )
                  break;
                  
                  default:
                  mat = new THREE.SpriteMaterial( {map: sprite1, transparent: true, alphaTest: 0.2} )
                  break;
              } 

              let planes = new THREE.Sprite( mat );
              planes.scale.x = 4
              planes.scale.y = 6
              // planes.lookAt(camera)
              planes.position.set(array[0] + 10, 0, array[1] + 55)
              if (plans <= numMaxplans) {
                plans++
                if (threeType <= 5) {
                  threeType++
                } else {
                  threeType = 0
                }
                scene.add( planes );
              } else {
                console.log('maxima cantidad de planos')
              }
              
          } else if(count === 5){
            count = 0
            array = []
          }
        
       }


      camera.position.set(200, 200, 100);
      camera.lookAt(new THREE.Vector3(20, 70, 200));
      scene.add(camera);



      // camera.position.set(10000, 200, 1700);

      */
      

      const cube1 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_54_1')
      // const cube2 = gltf.scene.children[0].children.find(el => el.name === "mesh_187")
      // const cube3 = gltf.scene.children[0].children.find(el => el.name === "mesh_188")
      // const cube4 = gltf.scene.children[0].children.find(el => el.name === "mesh_191")
      // const cube5 = gltf.scene.children[0].children.find(el => el.name === "mesh_190")
      // const cube6 = gltf.scene.children[0].children.find(el => el.name === "mesh_186")
      // const cube7 = gltf.scene.children[0].children.find(el => el.name === "mesh_189")
      // const cube8 = gltf.scene.children[0].children.find(el => el.name === "mesh_193")
      // const cube9 = gltf.scene.children[0].children.find(el => el.name === "mesh_194")
      // const cube10 = gltf.scene.children[0].children.find(el => el.name === "mesh_195")
      // const cube11 = gltf.scene.children[0].children.find(el => el.name === "mesh_196")
      // const cube12 = gltf.scene.children[0].children.find(el => el.name === "mesh_197")
      // const cube13 = gltf.scene.children[0].children.find(el => el.name === "mesh_198")
      // const cube14 = gltf.scene.children[0].children.find(el => el.name === "mesh_199")
      // const cube15 = gltf.scene.children[0].children.find(el => el.name === "mesh_200")
  
    
      console.log(cube1)

      const objectForCollitions = () => {
        return [cube1] //tambien podemos pasarles grupos mediante three.groups
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





const light = new THREE.AmbientLight(0xffffff, 1)
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
