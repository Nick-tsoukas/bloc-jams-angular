(function () {
	function SongPlayer($rootScope, Fixtures) {
		var SongPlayer = {};

		var currentAlbum = Fixtures.getAlbum();

		/**
		 * @desc Buzz object audio file
		 * @type {Object}
		 */
		var currentBuzzObject = null;
        
         

		/**
		 * @function
		 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
		 * @param {Object} song
		 */
		var setSong = function (song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentBuzzObject.bind('timeupdate', function () {
				$rootScope.$apply(function () {
					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
			});

			SongPlayer.currentSong = song;
		};

		/**
		 * @function playSong
		 * @desc Plays current song and sets the property of the song Object to true
		 * @param {Object} song
		 */
		var playSong = function (song) {
			currentBuzzObject.play();
			song.playing = true;
		}

		var stopSong = function (song) {
			currentBuzzObject.stop();
			song.playing = null;
		}

		var getSongIndex = function (song) {
			return currentAlbum.songs.indexOf(song);
		};

		
		SongPlayer.currentSong = null;
		SongPlayer.currentTime = null;
        SongPlayer.volume = null;


		/**
		 * @function SongPlayer.play
		 * @desc public function plays new song when called with conditional statements
		 * @param {Object} song
		 */
		
        SongPlayer.play = function (song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}
		};

		/**
		 * @function SongPlayer.pause
		 * @desc Function. Pauses the currently playing song
		 * sets the song's 'playing' attribute to false.
		 * @param {Object} song
		 */
		SongPlayer.pause = function (song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};
        
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume)
            }
        };

		SongPlayer.previous = function () {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;

			if (currentSongIndex < 0) {
				stopSong(SongPlayer.currentSong);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		SongPlayer.next = function () {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;

			if (currentSongIndex === currentAlbum.songs.length) {
				stopSong(SongPlayer.currentSong);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		SongPlayer.setCurrentTime = function (time) {
			if (currentBuzzObject) {
				currentBuzzObject.setTime(time);
			}
		};

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();