import * as THREE from "three";
var Stats = require("../../static/lib/stats")
require("../../static/lib/OrbitControls")
import { MeshUtil } from './geometryUtil'
import axios from 'axios' 
export class ThreeUtil{
    constructor(dom){
        this.stats = this.initStats();
        this.scene = new THREE.Scene();
        var axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );
       
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
          );
        this.camera.position.z = 200;
        this.camera.position.y = 100;
        this.camera.lookAt(new THREE.Vector3(0, 1, 0));
        this.webGLRenderer = new THREE.WebGLRenderer({antialias: true});
        this.webGLRenderer.setSize(window.innerWidth, window.innerHeight  );
        this.webGLRenderer.setPixelRatio( window.devicePixelRatio );
        this.spotLight = new THREE.SpotLight(0xffffff);
        this.spotLight.position.set(0,1,0);
        // this.lights = [];
        // this.lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        // this.lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        // this.lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        // this.lights[ 0 ].position.set( 0, 200, 0 );
        // this.lights[ 1 ].position.set( 100, 200, 100 );
        // this.lights[ 2 ].position.set( - 100, - 200, - 100 );

        // this.scene.add( this.lights[ 0 ] );
        // this.scene.add( this.lights[ 1 ] );
        // this.scene.add( this.lights[ 2 ] );
        this.scene.add(this.spotLight);
        var spotLightHelper = new THREE.SpotLightHelper( this.spotLight );
        this.scene.add( spotLightHelper );
        this.orbit = new THREE.OrbitControls(this.camera, this.webGLRenderer.domElement);
        console.log(this.orbit)
        dom.appendChild( this.webGLRenderer.domElement );

    }
    animate(){
        this.stats.update()
        this.orbit.update()
        this.rotateY(this.mesh)
        this.rotateY(this.cubeEdge)
        this.rotate(this.ring)
        this.rotate2(this.ring2)
        requestAnimationFrame(this.animate.bind(this));
        this.webGLRenderer.render( this.scene,this.camera );
    }
    add(geometry){
        this.scene.add(geometry)
    }
    rotateY(geometry){
        geometry.rotation.y -= 0.01;
    }
    rotate(geometry){
        geometry.rotation.x += 0.01;
        geometry.rotation.y += 0.01;
        geometry.rotation.z += 0.01;
    }
    rotate2(geometry){
        geometry.rotation.x -= 0.01;
        geometry.rotation.y -= 0.01;
        geometry.rotation.z -= 0.01;
    }
    init(){
        var cube = MeshUtil.newSphere();
        window.cube = cube
        var cubeEdge = MeshUtil.edgeMesh()
        this.ring = MeshUtil.newRing()
        this.ring2 = MeshUtil.newRing()
        this.mesh = cube
        this.cubeEdge = cubeEdge
        cubeEdge.rotation.y = Math.PI*0.5
        // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		// 	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		// 	var cube = new THREE.Mesh( geometry, material );
        this.add(cube)
        this.add(cubeEdge)
        this.add(this.ring)
        this.add(this.ring2)

        axios.get("../static/data/china_simplify.json").then((e)=>{
            console.log(e)
            var features = e.data.features;
            var coordArr = features.map((e)=>{
                if(e.geometry.type ==="Polygon"){
                    return {
                        coord:e.geometry.coordinates,
                        type:"Polygon"
                    }
                }else if(e.geometry.type ==="MultiPolygon"){
                    return {
                        coord:e.geometry.coordinates,
                        type:"MultiPolygon"
                    }
                }
                
            })
            console.log(coordArr)
            return coordArr
        }).then((e)=>{
            e.forEach(element => {
                if(element.type === "Polygon"){
                    if(element.coord.leng>1){
                        //draw hole polygon
                    }else if(element.coord.leng=1){
                        element.coord.forEach((e)=>{

                                var geom = MeshUtil.newShapeGeom(e);
                                var rect = MeshUtil.newShape(geom);
                                var edge = MeshUtil.newEdge(geom);
                                rect.rotation.x = - Math.PI*0.5
                                edge.rotation.x = - Math.PI*0.5
                                this.add(rect)
                                this.add(edge)
    
                        },this)
                    }


                }else if(element.type === "MultiPolygon"){
                    element.coord.forEach((e)=>{
                        if(e.length>1){
                            //draw hole polygon
                        }else if(e.length = 1){
                            var geom = MeshUtil.newShapeGeom(e[0]);
                            var rect = MeshUtil.newShape(geom);
                            var edge = MeshUtil.newEdge(geom);
                            rect.rotation.x = - Math.PI*0.5
                            edge.rotation.x = - Math.PI*0.5
                            this.add(rect)
                            this.add(edge)
                        }

                    },this)
                }
                
                
                
            },this);
        })

        // var rect = MeshUtil.newShape([
        //     [0,0],
        //     [10,0],
        //     [10,10],
        //     [0,10],
        //     [0,0],
        // ]);
        // rect.rotation.x = Math.PI*0.5
        // this.add(rect)
        this.animate()

    }
     initStats() {

        var stats = new Stats();

        stats.setMode(0); // 0: fps, 1: ms

        // Align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        document.getElementById("Stats-output").appendChild(stats.domElement);

        return stats;
    }
}

window.xwq = function(){
    console.log(window.cube)
}