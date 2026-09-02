import arrowContinue from 'assets/generated/active/animations/arrow_continue.json';
import camera from 'assets/generated/active/animations/camera.json';
import dress from 'assets/generated/active/animations/dress.json';
import gift from 'assets/generated/active/animations/gift.json';
import heart from 'assets/generated/active/animations/heart.json';
import heartPulse from 'assets/generated/active/animations/heart_pulse.json';
import instagram from 'assets/generated/active/animations/instagram.json';
import music from 'assets/generated/active/animations/music.json';
import party from 'assets/generated/active/animations/party.json';
import rings from 'assets/generated/active/animations/rings.json';
import sounds from 'assets/generated/active/animations/sounds.json';
import tips from 'assets/generated/active/animations/tips.json';
import { ThemeAnimations, ThemeAssets } from './theme.types';

export const BASE_THEME_ANIMATIONS: ThemeAnimations = {
  arrowContinue,
  camera,
  dress,
  gift,
  heart,
  heartPulse,
  instagram,
  music,
  party,
  rings,
  sounds,
  tips,
};

export const BASE_THEME_ASSETS: ThemeAssets = {
  bannerVideo: '',
  bannerImage: 'assets/images/banner-home/portada-boda.webp',
  instagramBackground: 'assets/images/banner-instagram/banner.jpeg',
  music: 'assets/music/EdSheeran-Perfect(Lyrics).mp3',
  decorations: {
    bannerHomeWaves: 'assets/generated/active/images/banner-home/img_ondas01.svg',
    bannerInstagramTopWaves: 'assets/generated/active/images/banner-instagram/img_ondas05.svg',
    bannerInstagramBottomWaves: 'assets/generated/active/images/banner-instagram/img_ondas06.svg',
    eventCardBeltLeft: 'assets/generated/active/images/event-scheduler/img_cinta01.svg',
    eventCardBeltRight: 'assets/generated/active/images/event-scheduler/img_cinta02.svg',
    countdownCircle: 'assets/generated/active/images/event-scheduler/img_circuloContador01.svg',
    eventScheduleWaves: 'assets/generated/active/images/event-scheduler/img_ondas02.svg',
    eventScheduleLines: 'assets/generated/active/images/event-scheduler/img_lineas01.svg',
    instructionsWavesTop: 'assets/generated/active/images/instructions/img_ondas03.svg',
    instructionsWavesBottom: 'assets/generated/active/images/instructions/img_ondas04.svg',
  },
  instructionIcons: {
    dressCode: 'assets/generated/active/images/instructions/vestuario.svg',
    tips: 'assets/generated/active/images/instructions/tips.svg',
  },
};
