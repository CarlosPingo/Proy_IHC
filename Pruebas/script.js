var apiKey = 'AIzaSyCWruG4grXV4D65KxVIY_j5h29miCvdG7Y';
var channels = [
  { id: 'UCUhq99pWPJVRUzlKIGQCKlw', containerId: 'channel1' },
  { id: 'UCBKWTG-WMTDP-GhWMvkYMMQ ', containerId: 'channel2' },
  { id: 'UCoC0VwiI5wzLjjXe_gqLBpQ', containerId: 'channel3' },
  { id: 'UCwvYvIjhvpkFwIrSbwIxt_g', containerId: 'channel4' }
];

var videos = {};

function getLatestVideo(channelId, containerId) {
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet',
      channelId: channelId,
      maxResults: 1,
      order: 'date',
      key: apiKey
    },
    function(data) {
      if (data.items.length > 0) {
        var videoId = data.items[0].id.videoId;
        var title = data.items[0].snippet.title;
        var thumbnail = data.items[0].snippet.thumbnails.default.url;

        // Verificar si el video es nuevo
        if (!videos[channelId] || videos[channelId].videoId !== videoId) {
          videos[channelId] = { videoId: videoId, title: title, thumbnail: thumbnail };
          updateVideo(containerId, videoId, title, thumbnail);
        }
      }
    }
  );
}

function updateVideo(containerId, videoId, title, thumbnail) {
  var container = $('#' + containerId);
  container.empty();
  container.append('<div><a href="https://www.youtube.com/watch?v=' + videoId + '"><img src="' + thumbnail + '"><h3>' + title + '</h3></a></div>');
}

function checkForNewVideos() {
  $.each(channels, function(index, channel) {
    getLatestVideo(channel.id, channel.containerId);
  });
}

// Función que se ejecuta periódicamente
setInterval(checkForNewVideos, 60000); // Cada minuto

// Obtener los últimos videos al cargar la página
checkForNewVideos();
