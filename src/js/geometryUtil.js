import * as THREE from "three";
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

}