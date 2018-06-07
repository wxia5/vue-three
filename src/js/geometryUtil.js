import * as THREE from "three";
import { ThreeUtil } from ".";
export class MeshUtil{
    static newBoxMesh(option){
        var geometry = new THREE.BoxGeometry(option.width,option.height,option.depth);
        var material = new THREE.MeshPhongMaterial( {
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            // flatShading: true,
            // wireframe   : true
        });
        
        var cube = new THREE.Mesh( geometry, material );
        return cube
    }
    static edgeMesh(){
        var geometry = new THREE.SphereGeometry( 64, 48, 48 );
        var edges = new THREE.EdgesGeometry( geometry );
        return new THREE.LineSegments( edges, new THREE.LineBasicMaterial( {
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        } ) );
    }
    static newBoxMeshMultiMaterial(option){
        var geometry = new THREE.BoxGeometry(option.width,option.height,option.depth);
        var meshMaterial = new THREE.MeshNormalMaterial();
        meshMaterial.side = THREE.DoubleSide;
        var wireFrameMat = new THREE.MeshPhongMaterial( {
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
        });
        return new THREE.Mesh( geometry, wireFrameMat);
    }
    static newSphere(){
        var geometry = new THREE.SphereGeometry( 64, 48, 48 );
        var material = new THREE.MeshPhongMaterial( {
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
        })
        return  new THREE.Mesh( geometry, material );
    }
    static newRing(){
        var geometry = new THREE.RingGeometry( 68, 68.2, 128 );
        var material = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide,
        });
        return new THREE.Mesh( geometry, material );
    }
    static newShapeGeom(array){
        var group = new THREE.Object3D();
        var pointARR = array.coord[0].map((e)=>{
            return new THREE.Vector2(e[0],e[1])
        });
        var shape = new THREE.Shape(pointARR)
        return new THREE.ExtrudeGeometry( shape , { 
            depth: 1,
            bevelEnabled: false,
            // bevelSize: 1,
            // bevelThickness: 1 
        });
    }
    static newHoleShape(array){
        var group = new THREE.Object3D();

        var outline = array.coord[0][0].map((e)=>{
            return new THREE.Vector2(e[0],e[1])
        });


        var shape = new THREE.Shape(outline)
        debugger
        for (let index = 1; index < array.coord.length; index++) {
            var holeArr = array.coord[index][0];
            var hole = new THREE.Path(holeArr);
            debugger
            shape.holes.push(hole)
            
        }
        return shape
       
    }
    static newShape(geometry){

        return new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );

    }
    static newEdge(geometry){
        var edges = new THREE.EdgesGeometry( geometry );
        return new THREE.LineSegments( edges, new THREE.LineBasicMaterial( {
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        } ) );

    }

}