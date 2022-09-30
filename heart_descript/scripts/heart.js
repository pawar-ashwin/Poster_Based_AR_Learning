const Animation = require('Animation');
const Scene = require('Scene');
const TouchGestures = require('TouchGestures');

const sceneRoot = Scene.root;

Promise.all([
    sceneRoot.findFirst('placer'),
    sceneRoot.findFirst('placer')
])
.then(function(objects) {
    const base = objects[0];
    const placer = objects[1];

    const baseDriverParameters = {
        durationMilliseconds: 400,
        loopCount: Infinity,
        mirror: true
    };

    const baseDriver = Animation.timeDriver(baseDriverParameters);
    baseDriver.start();

    const baseSampler = Animation.samplers.easeInQuint(0.9,1);

    const baseAnimation = Animation.animate(baseDriver,baseSampler);

    const baseTransform = base.transform;

      baseTransform.scaleX = baseAnimation;
      baseTransform.scaleY = baseAnimation;
      baseTransform.scaleZ = baseAnimation;


    const placerTransform = placer.transform;

    TouchGestures.onRotate().subscribeWithSnapshot( {
        'lastRotationZ' : placerTransform.rotationZ,
    }, function (gesture, snapshot) {
        const correctRotation = gesture.rotation.mul(-1);
        placerTransform.rotationZ = correctRotation.add(snapshot.lastRotationZ);
    });    


});