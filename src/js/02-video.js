import _ from 'lodash';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onPlay = function (data) {
  player
    .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;
        default:
          break;
      }
    });
};

player.on('play', onPlay);

player.on(
  'timeupdate',
  _.throttle(function () {
    player
      .getCurrentTime()
      .then(function (seconds) {
        localStorage.setItem('videoplayer-current-time', seconds);
        console.log(`seconds ${seconds}`);
        // seconds = the current playback position
      })
      .catch(function (error) {
        // an error occurred
      });
  }, 1000),
);
