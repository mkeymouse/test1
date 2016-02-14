if (!Detector.webgl) { Detector.addGetWebGLMessage(); }

//シーン
var scene = new THREE.Scene();

//ライトの設定
var dist = 10;
var light = new THREE.DirectionalLight(0xffffff, 0.2); light.position.set(dist, dist, dist);
var ambient = new THREE.AmbientLight(0xffffff, 0.2);
var backLight = new THREE.DirectionalLight('#0000aa', 0.2); backLight.position.set(-dist, -dist, -dist);
scene.add(light);
scene.add(ambient);
scene.add(backLight);

//レンダラ―
var renderer = new THREE.WebGLRenderer({antialias : true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x999999, 1);
document.body.appendChild(renderer.domElement);

//カメラ
var camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 1.5, 50);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

//カメラコントロール
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.center = new THREE.Vector3(0, 0, 0);

//描画処理
var rotAngle = 0;
var geoms = [];
var meshes = [];
initObjects(geoms, meshes);
createScene(scene, meshes);
render();

//行列による点の移動
function getMatrixPoint(point, matrix) {
	var vec = [ point.x, point.y, point.z ];
	mat4.multiplyVec3(matrix, vec);
	point.x = vec[0];
	point.y = vec[1];
	point.z = vec[2];
	return point;
}

//アニメーション用
var prevTime = 0;
var poseIdx = 0;
function changePose() {
	var date = new Date();
	var currTime = date.getTime();
	if (currTime > prevTime + 500) {
	    if (poseIdx % 2 == 0) {
	        scene.remove(meshes[2]);
	        scene.remove(meshes[3]);
	    } else {
	        scene.add(meshes[2]);
	        scene.add(meshes[3]);
	    }
	    poseIdx++;
	    prevTime = currTime;
	}
}

//描画対象登録
function createScene(scene, meshes) {
	for (var i = 0; i < meshes.length; ++i) {
	    scene.add(meshes[i]);
	    //meshes[i].rotation.x = Math.PI / 2;
	}
}

//自転
function rotateMeshes(angle, meshes) {
	for (var i = 0; i < meshes.length; ++i) {
	    meshes[i].rotation.y = angle;
	}
}

//レンダリング関数
function render() {
	requestAnimationFrame(render);
	//自動回転
	rotateMeshes(rotAngle += 0.01, meshes);
	changePose();
	controls.update();
	renderer.render(scene, camera);
};



