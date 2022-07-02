import * as THREE from "three";
// import { FirstPersonControls } from "../controls/FirstPersonControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import * as dat from 'dat.gui'

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from "gsap";

import tree3 from '../../images/trees/Arbol-3.png'
import tree4 from '../../images/trees/Arbol-4.png'
import tree5 from '../../images/trees/Arbol-5.png'
import tree6 from '../../images/trees/Arbol-6.png'
import tree7 from '../../images/trees/Arbol-7.png'
import tree8 from '../../images/trees/Arbol-8.png'
import tree9 from '../../images/trees/Arbol-9.png'



import palm1 from '../../images/palms/Palma-1.png'
import palm2 from '../../images/palms/Palma-2.png'
import palm3 from '../../images/palms/Palma-3.png'
import palm4 from '../../images/palms/Palma-4.png'



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
      x:  3,
      y: 0.6,
      z: -4,
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
      x:  0,
      y: 0.6,
      z: -1,
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
      x:  -4,
      y: 0.6,
      z: -4,
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
      x:  8,
      y: 0.6,
      z: 1,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
    },
    zoom: 1
  },

  cube5: {
    target: {
      x:  5,
      y: 0.6,
      z: 3,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
    },
    zoom: 1
  },

  cube6: {
    target: {
      x:  11,
      y: 0.6,
      z: 5,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
    },
    zoom: 1
  },

  cube7: {
    target: {
      x:  20,
      y: 0.6,
      z: 6,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
    },
    zoom: 1
  },

  cube8: {
    target: {
      x:  20,
      y: 0.6,
      z: 17.8,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
    },
    zoom: 1
  },

  cube9: {
    target: {
      x:  23.5,
      y: 0.6,
      z: 16,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
    },
    zoom: 1
  },

  cube10: {
    target: {
      x:  22,
      y: 0.6,
      z: 21,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
    },
    zoom: 1
  },

  cube11: {
    target: {
      x:  11,
      y: 0.6,
      z: 23,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
    },
    zoom: 1
  },

  cube12: {
    target: {
      x:  11,
      y: -1.5,
      z: 32,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
    },
    zoom: 1
  },

  cube13: {
    target: {
      x:  7,
      y: -1.5,
      z: 30.5,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
    },
    zoom: 1
  },

  cube14: {
    target: {
      x:  6,
      y: -1.5,
      z: 34,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
    },
    zoom: 1
  },

  cube15: {
    target: {
      x:  -8,
      y: -1.5,
      z: 31,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
    },
    zoom: 1
  },

  cube16: {
    target: {
      x:  -22,
      y: -1.5,
      z: 22,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
    },
    zoom: 1
  },

  cube17: {
    target: {
      x:  -34.5,
      y: -1.5,
      z: 8,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
    },
    zoom: 1
  },

  cube18: {
    target: {
      x:  -34.5,
      y: -1.5,
      z: 4,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
    },
    zoom: 1
  },

  cube19: {
    target: {
      x:  -38.5,
      y: -1.5,
      z: 3,
    },
    camera: {
      x:  1,
      y: 0,
      z: 1,
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


scene.fog = new THREE.Fog(0x000000, 10, 30)



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
orbitControls.enablePan = true
orbitControls.minPolarAngle = Math.PI / 2.1
orbitControls.maxPolarAngle = Math.PI / 1.5 
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
      case "Object_36":
        gsapAnimations('cube1')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_37":
        gsapAnimations('cube3')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_35":
        gsapAnimations('cube2')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_40":
        gsapAnimations('cube5')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_42":
        gsapAnimations('cube4')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_41":
        gsapAnimations('cube6')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_80":
        gsapAnimations('cube7')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_46":
        gsapAnimations('cube9')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_47":
        gsapAnimations('cube8')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_45":
        gsapAnimations('cube10')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_81":
        gsapAnimations('cube11')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_85":
        gsapAnimations('cube12')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_89":
        gsapAnimations('cube13')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_84":
        gsapAnimations('cube14')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_82":
        gsapAnimations('cube15')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_93":
        gsapAnimations('cube16')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_87":
        gsapAnimations('cube17')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_88":
        gsapAnimations('cube18')

        console.log('click cube 1')
        return meshCurrentClick = null 

      case "Object_86":
        gsapAnimations('cube19')

        console.log('click cube 1')
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

gltfloader.load('./model/sceneCustom.gltf', 
(gltf) => {

      gltf.scene.position.set(34, -5, -28)

      
      scene.add(gltf.scene)
      
      camera.position.set(34, -5, -28);
      camera.lookAt(new THREE.Vector3(200, 200, 200));
      scene.add(camera);


      // console.log(gltf.scene)


      const hdrEquirect = new RGBELoader().load(
        "src/empty_warehouse_01_2k.hdr",
        () => {
          hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
        }
      );

      const material = new THREE.MeshPhysicalMaterial({
        transmission: 1,
        thickness: 0,
        roughness: 0,
        envMap: hdrEquirect,
        //para que se puedan ver los sprites
        depthWrite: false
      });

      gltf.scene.getObjectByName('ICE_BOX').children.map(e => {
        e.geometry.dispose();
        e.material = material
      })
  
      //trees section 1
      const treesCamp = gltf.scene.getObjectByName('EARTH_TREES').children.find(e => e.name === 'Object_215')
      const treesCamp2 = gltf.scene.getObjectByName('EARTH_TREES').children.find(e => e.name === 'Object_216')
      const treesCamp3 = gltf.scene.getObjectByName('EARTH_TREES').children.find(e => e.name === 'Object_214')


    
      //aqui se renderiza los arboles en png

      let treesGeo1 = new THREE.BufferGeometry();
      treesGeo1.copy(treesCamp.geometry)

      let treesGeo2 = new THREE.BufferGeometry();
      treesGeo2.copy(treesCamp2.geometry)

      let treesGeo3 = new THREE.BufferGeometry();
      treesGeo3.copy(treesCamp3.geometry)



      let array = []
      // let numMaxplans = treesGeo1.attributes.position.array.length
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

      
       for (let index = 0; index < treesGeo1.attributes.position.array.length / 2; index++) {
         if (count <= 3) {
           count++
           array.push(treesGeo1.attributes.position.array[index])
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

              let scale = Math.random() * 10
              let planes = new THREE.Sprite( mat );
              planes.position.set(array[0] + 34, array[1] - 2, array[2] - 28)

              if (scale >= 8) {
                planes.scale.x = 7
                planes.scale.y = 9

                planes.position.setY(array[1] - 2.2)
              } else if (scale >= 5 && scale <= 7) {
                planes.scale.x = 7
                planes.scale.y = 9

                planes.position.setY(array[1] - 1)
              }else if(scale <= 4 && scale >= 2.5){
                planes.scale.x = 4
                planes.scale.y = 6

                planes.position.setY(array[1] - 2.2)
              }else if(scale < 2.5){
                planes.scale.x = 3
                planes.scale.y = 4
                planes.position.setY(array[1] - 3)
              } else {
                planes.scale.x = 2
                planes.scale.y = 2

                planes.position.setY(array[1] - 4)

              }
              // planes.lookAt(camera)
              if (plans <= treesGeo1.attributes.position.array.length) {
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


        //trees section 2
        let treesArray3 = []
        let trees3 = 0
        let treescount3 = 0
        let treeType3 = 0
        
       for (let index = 0; index < treesGeo2.attributes.position.array.length; index++) {
         if (treescount3 <= 3) {
           treescount3++
           treesArray3.push(treesGeo2.attributes.position.array[index])
          //  console.log('aquii',array)
        } else if(treescount3 === 4) {
            treescount3++

              //se agrega este random para poblar el forest sin tanto sobre renderizado
              let randomtrees = Math.random() * 10
              if (randomtrees < 0.7) { 
                let mat
                switch (treeType3) {
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
  
                let scale = Math.random() * 10
                
                let planes = new THREE.Sprite( mat );
                planes.position.set(treesArray3[0] + 34, treesArray3[1] - 2, treesArray3[2] - 28)
  
                if (scale >= 8) {
                  planes.scale.x = 10
                  planes.scale.y = 12
  
                  planes.position.setY(treesArray3[1] + 0.5)
                } else if (scale >= 5 && scale <= 7) {
                  planes.scale.x = 7
                  planes.scale.y = 9
  
                  planes.position.setY(treesArray3[1] - 1)
                }else if(scale <= 4 && scale >= 2.5){
                  planes.scale.x = 4
                  planes.scale.y = 6
  
                  planes.position.setY(treesArray3[1] - 2.2)
                }else if(scale < 2.5){
                  planes.scale.x = 3
                  planes.scale.y = 4
                  planes.position.setY(treesArray3[1] - 3)
                } else {
                  planes.scale.x = 2
                  planes.scale.y = 2
  
                  planes.position.setY(treesArray3[1] - 4)
  
                }
                // planes.lookAt(camera)
                if (trees3 <= treesGeo2.attributes.position.array.length) {
                  trees3++
                  if (treeType3 <= 5) {
                    treeType3++
                  } else {
                    treeType3 = 0
                  }
  
                    scene.add( planes );
                 
                } else {
                  console.log('maxima cantidad de planos')
                }
              } else {
                // console.log(randomtrees)
              }
              
          } else if(treescount3 === 5){
            treescount3 = 0
            treesArray3 = []
          }
        
       }

        //trees section 3
        let treesArray = []
        let trees = 0
        let treescount = 0
        let treeType = 0

       for (let index = 0; index < treesGeo3.attributes.position.array.length; index++) {
         if (treescount <= 3) {
           treescount++
           treesArray.push(treesGeo3.attributes.position.array[index])
          //  console.log('aquii',array)
        } else if(treescount === 4) {
            treescount++

              //se agrega este random para poblar el forest sin tanto sobre renderizado
              let randomtrees = Math.random() * 10
              if (randomtrees < 7) { 
                let mat
                switch (treeType) {
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
  
                let scale = Math.random() * 10
                
                let planes = new THREE.Sprite( mat );
                planes.position.set(treesArray[0] + 34, treesArray[1] - 2, treesArray[2] - 28)
  
                if (scale >= 8) {
                  planes.scale.x = 7
                  planes.scale.y = 9
  
                  planes.position.setY(treesArray[1] - 2.2)
                } else if (scale >= 5 && scale <= 7) {
                  planes.scale.x = 7
                  planes.scale.y = 9
  
                  planes.position.setY(treesArray[1] - 1)
                }else if(scale <= 4 && scale >= 2.5){
                  planes.scale.x = 4
                  planes.scale.y = 6
  
                  planes.position.setY(treesArray[1] - 2.2)
                }else if(scale < 2.5){
                  planes.scale.x = 3
                  planes.scale.y = 4
                  planes.position.setY(treesArray[1] - 3)
                } else {
                  planes.scale.x = 2
                  planes.scale.y = 2
                  planes.position.setY(treesArray[1] - 4)
                }
                // planes.lookAt(camera)
                if (trees <= treesGeo3.attributes.position.array.length) {
                  trees++
                  if (treeType <= 5) {
                    treeType++
                  } else {
                    treeType = 0
                  }
  
                    scene.add( planes );
                 
                } else {
                  console.log('maxima cantidad de planos')
                }
              } else {
                // console.log(randomtrees)
              }
              
          } else if(treescount === 5){
            treescount = 0
            treesArray = []
          }
        
       }

      

        //palms section 1

        const palmsCamp = gltf.scene.getObjectByName('EARTH_SHRUB').children.find(e => e.name === 'Object_217')
        const palmsCamp2 = gltf.scene.getObjectByName('EARTH_SHRUB').children.find(e => e.name === 'Object_218')
        const palmsCamp3 = gltf.scene.getObjectByName('EARTH_SHRUB').children.find(e => e.name === 'Object_219')

        let palmsGeo = new THREE.BufferGeometry();
        palmsGeo.copy(palmsCamp.geometry)

        let palmsGeo2 = new THREE.BufferGeometry();
        palmsGeo2.copy(palmsCamp2.geometry)

        let palmsGeo3 = new THREE.BufferGeometry();
        palmsGeo3.copy(palmsCamp3.geometry)


        let imgPalm1 = document.createElement('img');
        imgPalm1.src = palm1
        let palmSprite1 = new THREE.Texture(imgPalm1);
        palmSprite1.needsUpdate = true;

        let imgPalm2 = document.createElement('img');
        imgPalm2.src = palm2
        let palmSprite2 = new THREE.Texture(imgPalm2);
        palmSprite2.needsUpdate = true;

        let imgPalm3 = document.createElement('img');
        imgPalm3.src = palm3
        let palmSprite3 = new THREE.Texture(imgPalm3);
        palmSprite3.needsUpdate = true;

        let imgPalm4 = document.createElement('img');
        imgPalm1.src = palm4
        let palmSprite4 = new THREE.Texture(imgPalm4);
        palmSprite4.needsUpdate = true;

        
        //palms section 1

        let palmsArray = []
        let palms = 0
        let palmsCount = 0
        let palmsType = 0

       for (let index = 0; index < palmsGeo.attributes.position.array.length; index++) {
         if (palmsCount <= 3) {
           palmsCount++
           palmsArray.push(palmsGeo.attributes.position.array[index])
          //  console.log('aquii',array)
          } else if(palmsCount === 4) {
              palmsCount++
              let randomtrees = Math.random() * 10
              if (randomtrees < 5) {
                let mat
                switch (palmsType) {
                  case 0:
                    mat = new THREE.SpriteMaterial( {map: palmSprite1, transparent: true, alphaTest: 0.2} )
                    break;
                    
                  case 1:
                    mat = new THREE.SpriteMaterial( {map: palmSprite2, transparent: true, alphaTest: 0.2} )
                    break;
  
                  case 2:
                    mat = new THREE.SpriteMaterial( {map: palmSprite3, transparent: true, alphaTest: 0.2} )
                    break;
  
                  // case 3:
                  //   mat = new THREE.SpriteMaterial( {map: palmSprite4, transparent: true, alphaTest: 0.2} )
                  //   break;
                    
                    default:
                    mat = new THREE.SpriteMaterial( {map: palmSprite1, transparent: true, alphaTest: 0.2} )
                    break;
                } 
                
                let scale = Math.random() * 10
                let planes2 = new THREE.Sprite( mat );
                if (scale >= 8) {
                  planes2.scale.x = 2
                  planes2.scale.y = 2
  
                  // planes2.position.setY(treesArray[1] + 0.5)
                } else if (scale >= 5 && scale <= 7) {
                  planes2.scale.x = 1.8
                  planes2.scale.y = 1.8
  
                  // planes2.position.setY(treesArray[1] - 1)
                }else if(scale <= 4 && scale >= 2.5){
                  planes2.scale.x = 1.5
                  planes2.scale.y = 1.5
  
                  // planes2.position.setY(treesArray[1] - 2.2)
                }else if(scale < 2.5){
                  planes2.scale.x = 1.3
                  planes2.scale.y = 1.3
                  // planes2.position.setY(treesArray[1] - 3)
                } else {
                  planes2.scale.x = 2.3
                  planes2.scale.y = 2.3
                  // planes2.position.setY(treesArray[1] - 4)
                }
                // planes2.scale.x = 1
                // planes2.scale.y = 1
                // planes2.lookAt(camera)
                planes2.position.set(palmsArray[0] + 34, palmsArray[1] -4, palmsArray[2] - 28)
                if (palms <= palmsGeo.attributes.position.array.length) {
                  palms++
                  if (palmsType <= 5) {
                    palmsType++
                  } else {
                    palmsType = 0
                  }
                  scene.add( planes2 );
                } else {
                  console.log('maxima cantidad de planos')
                }
              }
              
          } else if(palmsCount === 5){
            palmsCount = 0
            palmsArray = []
          }
        
       }

       //palms section 2


       let palmsArray2 = []
       let palms2 = 0
       let palmsCount2 = 0
       let palmsType2 = 0

       for (let index = 0; index < palmsGeo2.attributes.position.array.length; index++) {
         if (palmsCount2 <= 3) {
           palmsCount2++
           palmsArray2.push(palmsGeo2.attributes.position.array[index])
          //  console.log('aquii',array)
          } else if(palmsCount2 === 4) {
              palmsCount2++

              let randomtrees = Math.random() * 10
              if (randomtrees < 0.7) {
                let mat
                switch (palmsType2) {
                  case 0:
                    mat = new THREE.SpriteMaterial( {map: palmSprite1, transparent: true, alphaTest: 0.2} )
                    break;
                    
                  case 1:
                    mat = new THREE.SpriteMaterial( {map: palmSprite2, transparent: true, alphaTest: 0.2} )
                    break;
  
                  case 2:
                    mat = new THREE.SpriteMaterial( {map: palmSprite3, transparent: true, alphaTest: 0.2} )
                    break;
  
                  // case 3:
                  //   mat = new THREE.SpriteMaterial( {map: palmSprite4, transparent: true, alphaTest: 0.2} )
                  //   break;
                    
                    default:
                    mat = new THREE.SpriteMaterial( {map: palmSprite1, transparent: true, alphaTest: 0.2} )
                    break;
                } 

  
                let scale = Math.random() * 10
                let planes2 = new THREE.Sprite( mat );
                if (scale >= 8) {
                  planes2.scale.x = 2
                  planes2.scale.y = 2
  
                  // planes2.position.setY(treesArray[1] + 0.5)
                } else if (scale >= 5 && scale <= 7) {
                  planes2.scale.x = 1.8
                  planes2.scale.y = 1.8
  
                  // planes2.position.setY(treesArray[1] - 1)
                }else if(scale <= 4 && scale >= 2.5){
                  planes2.scale.x = 1.5
                  planes2.scale.y = 1.5
  
                  // planes2.position.setY(treesArray[1] - 2.2)
                }else if(scale < 2.5){
                  planes2.scale.x = 1.3
                  planes2.scale.y = 1.3
                  // planes2.position.setY(treesArray[1] - 3)
                } else {
                  planes2.scale.x = 2.3
                  planes2.scale.y = 2.3
                  // planes2.position.setY(treesArray[1] - 4)
                }
                // planes2.lookAt(camera)
                planes2.position.set(palmsArray2[0] + 34, palmsArray2[1] - 4, palmsArray2[2] - 28)
                if (palms2 <= palmsGeo2.attributes.position.array.length) {
                  palms2++
                  if (palmsType2 <= 5) {
                    palmsType2++
                  } else {
                    palmsType2 = 0
                  }
                  scene.add( planes2 );
                } else {
                  console.log('maxima cantidad de planos')
                }
              }
              
          } else if(palmsCount2 === 5){
            palmsCount2 = 0
            palmsArray2 = []
          }
        
       }

       //palms section 3


       let palmsArray3 = []
       let palms3 = 0
       let palmsCount3 = 0
       let palmsType3 = 0

       for (let index = 0; index < palmsGeo3.attributes.position.array.length; index++) {
         if (palmsCount3 <= 3) {
           palmsCount3++
           palmsArray3.push(palmsGeo3.attributes.position.array[index])
          //  console.log('aquii',array)
          } else if(palmsCount3 === 4) {
              palmsCount3++
              let randomtrees = Math.random() * 10
              if (randomtrees < 5) {
                let mat
                switch (palmsType3) {
                  case 0:
                    mat = new THREE.SpriteMaterial( {map: palmSprite1, transparent: true, alphaTest: 0.2} )
                    break;
                    
                  case 1:
                    mat = new THREE.SpriteMaterial( {map: palmSprite2, transparent: true, alphaTest: 0.2} )
                    break;
  
                  case 2:
                    mat = new THREE.SpriteMaterial( {map: palmSprite3, transparent: true, alphaTest: 0.2} )
                    break;
  
                  // case 3:
                  //   mat = new THREE.SpriteMaterial( {map: palmSprite4, transparent: true, alphaTest: 0.2} )
                  //   break;
                    
                    default:
                    mat = new THREE.SpriteMaterial( {map: palmSprite1, transparent: true, alphaTest: 0.2} )
                    break;
                } 
  
                let planes2 = new THREE.Sprite( mat );
                planes2.scale.x = 1.4
                planes2.scale.y = 1.4
                // planes2.lookAt(camera)
                planes2.position.set(palmsArray3[0] + 34, palmsArray3[1] -4, palmsArray3[2] - 28)
                if (palms3 <= palmsGeo2.attributes.position.array.length) {
                  palms3++
                  if (palmsType3 <= 5) {
                    palmsType3++
                  } else {
                    palmsType3 = 0
                  }
                  scene.add( planes2 );
                } else {
                  console.log('maxima cantidad de planos')
                }
              }
              
          } else if(palmsCount3 === 5){
            palmsCount3 = 0
            palmsArray3 = []
          }
        
       }

       


      //textures settings
      
      const earthTexture = new THREE.TextureLoader().load('./textures/TexturesCom_Grass0153_2_seamless_S.jpg')
      const woodTexture = new THREE.TextureLoader().load('./textures/WOOD_01.png')
      const woodTexture2 = new THREE.TextureLoader().load('./textures/Walnut dark_100_DP.jpg')
      const concreteTexture = new THREE.TextureLoader().load('./textures/Concrete blocks_675_DB.jpg')
      const grassyTexture = new THREE.TextureLoader().load('./textures/Grassy_150_DB.jpg')
      const grassyTexture2 = new THREE.TextureLoader().load('./textures/Grass dark_150_DB.jpg')
      const galvanizedTexture = new THREE.TextureLoader().load('./textures/Walnut dark_100_DP.jpg')
      
      
      woodTexture.wrapS = THREE.RepeatWrapping
      woodTexture.wrapT = THREE.RepeatWrapping

      woodTexture2.wrapS = THREE.RepeatWrapping
      woodTexture2.wrapT = THREE.RepeatWrapping
      
      earthTexture.wrapS = THREE.RepeatWrapping
      earthTexture.wrapT = THREE.RepeatWrapping
      
      concreteTexture.wrapS = THREE.RepeatWrapping
      concreteTexture.wrapT = THREE.RepeatWrapping
      
      grassyTexture.wrapS = THREE.RepeatWrapping
      grassyTexture.wrapT = THREE.RepeatWrapping
      
      grassyTexture2.wrapS = THREE.RepeatWrapping
      grassyTexture2.wrapT = THREE.RepeatWrapping
      
      galvanizedTexture.wrapS = THREE.RepeatWrapping
      galvanizedTexture.wrapT = THREE.RepeatWrapping
      
      woodTexture.repeat.set(20.000, 20.000)
      woodTexture.rotation = 80
      
      woodTexture2.repeat.set(2.000, 2.000)
      woodTexture2.rotation = 90

      concreteTexture.repeat.set(100.000, 100.000)

      grassyTexture.repeat.set(70.000, 70.000)

      grassyTexture2.repeat.set(50.000, 50.000)

      galvanizedTexture.repeat.set(10.000, 10.000)

      earthTexture.repeat.set(50, 50)
      
      const maphearth = new THREE.MeshStandardMaterial({
        map: earthTexture
      })
      
      const mapWoodFloor = new THREE.MeshStandardMaterial({
        map: woodTexture,
        shadowSide: true
      })
      
      const mapWoodFloor2 = new THREE.MeshStandardMaterial({
        map: woodTexture2,
        shadowSide: true
      })
      
      const mapConcreteFloor = new THREE.MeshStandardMaterial({
        map: concreteTexture,
        shadowSide: true
      })
      
      const mapGrassyFloor = new THREE.MeshStandardMaterial({
        map: grassyTexture,
        shadowSide: true
      })
      
      const mapGrassyFloor2 = new THREE.MeshStandardMaterial({
        map: grassyTexture2,
        shadowSide: true
      })
      
      const mapGalvanizedTextureFloor = new THREE.MeshStandardMaterial({
        map: galvanizedTexture,
        shadowSide: true
      })
      
      
      // gltf.scene.getObjectByName('EARTH').children.map(e => e.material = maphearth)
      gltf.scene.getObjectByName('WOOD_PATH_01').children.map(e => e.material = mapWoodFloor)
      gltf.scene.getObjectByName('WOOD_PATH_2').children.map(e => e.material = mapWoodFloor2)
      gltf.scene.getObjectByName('WOOD_PATH_2').children.map(e => e.material = mapWoodFloor2)
      gltf.scene.getObjectByName('PATH_CONCRETE').children.map(e => e.material = mapConcreteFloor)
      gltf.scene.getObjectByName('EARTH_SHRUB').children.map(e => e.material = mapGrassyFloor)
      gltf.scene.getObjectByName('EARTH_TREES').children.map(e => e.material = mapGrassyFloor2)
      gltf.scene.getObjectByName('METAL_01').children.map(e => e.material = mapGalvanizedTextureFloor)
      // woodfloor.material = mapfloor
      
      
       /*
      
      const cube1 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_35')
      cube1.position.setY(0.2)
      cube1.material.color = {
        r: 255,
        g: 255,
        b: 255,
      }
      const cube2 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_36')
      const cube3 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_37')
      const cube4 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_42')
      const cube5 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_40')
      const cube6 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_41')
      const cube7 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_80')
      const cube8 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_46')
      const cube9 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_47')
      const cube10 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_45')
      const cube11 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_81')
      const cube12 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_85')
      const cube13 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_89')
      const cube14 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_84')
      const cube15 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_82')
      const cube16 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_93')
      const cube17 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_87')
      const cube18 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_88')
      const cube19 = gltf.scene.getObjectByName('PATH_POINT').children.find(e => e.name === 'Object_86')

      const objectForCollitions = () => {
        return [cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9, cube10, cube11, cube12, cube13, cube14, cube15, cube16, cube17, cube18, cube19] //tambien podemos pasarles grupos mediante three.groups
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
            meshCurrentHover = null
            meshCurrentClick = null
          } 
          
          
          //mouse hover and click
          if (intersects.length) {
            meshCurrentHover = intersects[0].object
            meshCurrentClick = intersects[0].object
          } else if(meshCurrentHover) {
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

      */
      
  },
  () => {
    console.log('onloading')
  },
  () => {
    console.log('error')
  }
)





const light = new THREE.AmbientLight(0xffffff, 0.5)
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

  currentRef.removeChild(renderer.domElement);
};
