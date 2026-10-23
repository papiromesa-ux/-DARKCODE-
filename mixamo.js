import * as THREE from 'three';
import { VRMHumanBoneName } from '@pixiv/three-vrm';

export function loadMixamoAnimation(fbx, vrm) {
  const mixer = new THREE.AnimationMixer(vrm.scene);
  const clip = THREE.AnimationClip.findByName(fbx.animations, 'mixamo.com');
  
  if (!clip) {
    console.warn("No se encontró la animación mixamo.com en el archivo FBX");
    return null;
  }

  const tracks = [];
  const restRotationInverse = new THREE.Quaternion();
  const parentRestWorldRotation = new THREE.Quaternion();
  const _quatA = new THREE.Quaternion();
  const _vec3 = new THREE.Vector3();

  const motionHipsHeight = fbx.getObjectByName('mixamorigHips').position.y;
  const vrmHipsY = vrm.humanoid?.getNormalizedBoneNode(VRMHumanBoneName.Hips).getWorldPosition(_vec3).y || 0;
  const vrmRootY = vrm.scene.getWorldPosition(_vec3).y;
  const vrmHipsHeight = Math.abs(vrmHipsY - vrmRootY);
  const hipsPositionScale = vrmHipsHeight / motionHipsHeight;

  clip.tracks.forEach((track) => {
    const trackSplitted = track.name.split('.');
    const mixamoVRMRigMap = {
      mixamorigHips: 'hips',
      mixamorigSpine: 'spine',
      mixamorigSpine1: 'chest',
      mixamorigSpine2: 'upperChest',
      mixamorigNeck: 'neck',
      mixamorigHead: 'head',
      mixamorigLeftShoulder: 'leftShoulder',
      mixamorigLeftArm: 'leftUpperArm',
      mixamorigLeftForeArm: 'leftLowerArm',
      mixamorigLeftHand: 'leftHand',
      mixamorigRightShoulder: 'rightShoulder',
      mixamorigRightArm: 'rightUpperArm',
      mixamorigRightForeArm: 'rightLowerArm',
      mixamorigRightHand: 'rightHand',
      mixamorigLeftUpLeg: 'leftUpperLeg',
      mixamorigLeftLeg: 'leftLowerLeg',
      mixamorigLeftFoot: 'leftFoot',
      mixamorigLeftToeBase: 'leftToes',
      mixamorigRightUpLeg: 'rightUpperLeg',
      mixamorigRightLeg: 'rightLowerLeg',
      mixamorigRightFoot: 'rightFoot',
      mixamorigRightToeBase: 'rightToes',
    };
    
    const mixamoRigName = trackSplitted[0];
    const vrmBoneName = mixamoVRMRigMap[mixamoRigName];
    const vrmNodeName = vrm.humanoid?.getNormalizedBoneNode(vrmBoneName)?.name;
    
    if (vrmNodeName != null) {
      const propertyName = trackSplitted[1];
      const trackName = `${vrmNodeName}.${propertyName}`;
      const newTrack = track.clone();
      newTrack.name = trackName;
      if (vrmBoneName === 'hips' && propertyName === 'position') {
        newTrack.values = newTrack.values.map((v, i) => (i % 3 === 1 ? v * hipsPositionScale : v));
      }
      tracks.push(newTrack);
    }
  });

  return new THREE.AnimationClip('vrmAnimation', clip.duration, tracks);
}
