// Vector functions for 3d rendering

function getMaxVertex(vertices) {
	// Returns the max distance from the origin to the furthest extent of the object 
	topmod = 0;
	for (i in vertices) {
		v = vertices[i];
		mod = Math.sqrt(v.x*v.x + v.y*v.y + v.z * v.z);
		if (mod>topmod) topmod = mod;
	}
	
	return topmod;
}

function centerOrigin(vertices) {
	// Find the centroid of the object and shift it to the origin...
	var cx = 0;
	var cy = 0;
	var cz = 0;
	for (var i in vertices) {
		cx+= vertices[i].x;
		cy+= vertices[i].y;
		cz+= vertices[i].z;
	}
	cx = cx / vertices.length;
	cy = cy / vertices.length;
	cz = cz / vertices.length;
	for (var i in vertices) {
		vertices[i].x-= cx;
		vertices[i].y-= cy;
		vertices[i].z-= cz;
	}
	
}

function unitise(v) {
	// returns unit vector
	var mod = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
	return {x: v.x/mod, y: v.y/mod, z: v.z/mod};
}

function incidentLight(surface, light) {
	// Calculates incident light on the surface
	
	// unit vector to the light source
	l = unitise(subtractVector(surfaceCentroid(surface), light));
	
	s = unitNormal(surface);
	dot = l.x * s.x + l.y * s.y + l.z * s.z;
	//dot = dot * -1.0;
	dot = Math.abs(dot);
	//console.log("Dot product: " + dot);
	return dot;
}

function observerDistance(surface) {
	// Calculates the distance between the surface centroid and the observer
	var c = surfaceCentroid(surface);
	var dx = (c.x - observer.x) * (c.x - observer.x);
	var dy = (c.y - observer.y) * (c.y - observer.y);
	var dz = (c.z - observer.z) * (c.z - observer.z);
	
	return Math.sqrt(dx + dy + dz); 
}

function delta_r(t, vertices) {
	for (var i in vertices) {
		v = vertices[i];
		//console.log(i + " was: " + v.x + ", " + v.y + ", " + v.z);
		r = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
		theta = Math.acos(v.z/r);
		phi = Math.atan2(v.y,v.x);
		dr = 0.01 * Math.sin(phi) * Math.cos(omega * t) * Math.cos(4*theta);
		//console.log("Theta: " + theta + " phi: " + phi + " dr:" + dr);
		r = r + dr;
		v.x = r * Math.sin(theta) * Math.cos(phi);
		v.y = r * Math.sin(theta) * Math.sin(phi);
		v.z = r * Math.cos(theta);
		//console.log( i + " -> is: " + v.x + ", " + v.y + ", " + v.z);
		//console.log(" ");
		vertices[i] = {x: v.x, y: v.y, z: v.z};
	}
}

function subtractVector(s1, s2) {
	return {x: s1.x - s2.x, y: s1.y - s2.y, z: s1.z - s2.z};
}

function unitNormal(surface) {
	//returns the unitNormal vector of the surface
	v1 = {x: vertices[surface.v[0]].x, y: vertices[surface.v[0]].y, z: vertices[surface.v[0]].z};
	v2 = {x: vertices[surface.v[1]].x, y: vertices[surface.v[1]].y, z: vertices[surface.v[1]].z};
	v3 = {x: vertices[surface.v[2]].x, y: vertices[surface.v[2]].y, z: vertices[surface.v[2]].z};
	a = subtractVector(v1, v2);
	b = subtractVector(v3, v2);
	x = a.y*b.z - a.z*b.y;
	y = a.z*b.x - a.x*b.z;
	z = a.x*b.y - a.y*b.x;
	
	mod = Math.sqrt(x*x + y*y + z*z);
	
	x = x/mod;
	y = y/mod;
	z = z/mod;
	
	return {x: x, y: y, z: z};
}

function rotate_x(angle, vertices) {
	var theta = angle/180*Math.PI;
	var sintheta = Math.sin(theta);
	var costheta = Math.cos(theta);
	for (var i in vertices) {
		var temp_y = vertices[i].y * costheta - vertices[i].z * sintheta;
		vertices[i].z = vertices[i].y * sintheta + vertices[i].z * costheta;
		vertices[i].y = temp_y;
	}
	
}

function rotate_z(angle, vertices) {
	var theta = angle/180*Math.PI;
	var sintheta = Math.sin(theta);
	var costheta = Math.cos(theta);
	for (var i in vertices) {
		var temp_x = vertices[i].x * costheta - vertices[i].y * sintheta;
		vertices[i].y = vertices[i].x * sintheta + vertices[i].y * costheta;
		vertices[i].x = temp_x;
	}
	
}

function rotate_y(angle, vertices) {
	var theta = angle/180*Math.PI;
	var sintheta = Math.sin(theta);
	var costheta = Math.cos(theta);
	for (var i in vertices) {
		var temp_x = vertices[i].x * costheta - vertices[i].z * sintheta;
		vertices[i].z = vertices[i].x * sintheta + vertices[i].z * costheta;
		vertices[i].x = temp_x;
	}
	
}

