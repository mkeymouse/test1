function initObjects(geoms, meshes){
	var g = null;
	var tex = null;
	var mat = null;

	g = new THREE.Geometry();
	out_initObject0(g);
	geoms.push(g);

	tex = THREE.ImageUtils.loadTexture('0.png');
	mat = new THREE.MeshPhongMaterial({
		map : tex, 
		//color : 0xffffff,
		//specular : 0xaaaaff,
		//shininess : 5,
		//ambient : 0xffffff,
		//side : THREE.DoubleSide, 
		//metal : true,
		bumpMap : tex, 
		bumpScale : 0.05,
		//blending: THREE.NormalBlending
	});
	meshes.push(new THREE.Mesh(g, mat));

	g = new THREE.Geometry();
	out_initObject1(g);
	geoms.push(g);

	tex = THREE.ImageUtils.loadTexture('1.png');
	mat = new THREE.MeshPhongMaterial({
		map : tex, 
		//color : 0xffffff,
		//specular : 0xaaaaff,
		//shininess : 5,
		//ambient : 0xffffff,
		//side : THREE.DoubleSide, 
		//metal : true,
		bumpMap : tex, 
		bumpScale : 0.05,
		//blending: THREE.NormalBlending
	});
	meshes.push(new THREE.Mesh(g, mat));

}
