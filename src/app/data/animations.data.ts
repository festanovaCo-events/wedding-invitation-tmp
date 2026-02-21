/**
 * Animaciones Lottie inline en el bundle para eliminar peticiones de red.
 * Cada import se incluye en el chunk del componente que lo use.
 */
import heart from 'assets/animations/heart.json';
import music from 'assets/animations/music.json';
import arrowContinue from 'assets/animations/arrow_continue.json';
import heartPulse from 'assets/animations/heart_pulse.json';
import rings from 'assets/animations/rings.json';
import party from 'assets/animations/party.json';
import gift from 'assets/animations/gift.json';
import instagram from 'assets/animations/instagram.json';
import camera from 'assets/animations/camera.json';
import dress from 'assets/animations/dress.json';
import tips from 'assets/animations/tips.json';
import sounds from 'assets/animations/sounds.json';

export const ANIMATIONS_DATA = {
  heart,
  music,
  arrowContinue,
  heartPulse,
  rings,
  party,
  gift,
  instagram,
  camera,
  dress,
  tips,
  sounds,
} as const;
