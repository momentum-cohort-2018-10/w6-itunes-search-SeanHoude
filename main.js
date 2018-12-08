const search = $('#searchbar')
search.val('emancipator')

const player = $('#player')
const $searchButton = $('#search-button')
let term = search.val()
     
function retrieve() {
    $.get('https://itunes.apple.com/search?term=',
        {
            term: search.val(),
            media: 'music',
            limit: 30
        },
        function(data) {
            console.log(data.results)
            $('#songlist').empty()
            
            $.each(data.results, function(i, result) {
                if (i > 29) {return false}
                let albumArt = result.artworkUrl100.replace('100x100','550x550')
                let cardHtml = `
                    <div class="itemsContainer">
                        <div><img data-url="${result.previewUrl}" data-track="${result.trackName} - ${result.artistName}" class="album-art thumbnail" src="${albumArt}">
                            <div class="play"><img data-url="${result.previewUrl}" data-track="${result.trackName} - ${result.artistName}" class="album-art" src="play.png" />
                            </div>
                        </div>
                    </div>
                    <h5>${result.trackName}</h5>
                    <p><a href="${result.collectionViewUrl}" >${result.collectionName} - </a><a href="${result.artistViewUrl}">${result.artistName}</a></p>
                ` 
                $('#songlist').append($(`<div class="column song" data="${result.previewUrl}" />`).html(cardHtml))
                let $title = `<p>${result.trackName} - ${result.artistName}</p>`
                $('#player').attr({src: result.previewUrl})
                $('#player-container').empty().append($title)
            })
        },
        'json'
    )
}

$('#search-button').on('click', function() {
    retrieve()
})

$(document).on('blur keyup', function(evt) {
    console.log(evt)
    if ( !evt.keyCode || evt.keyCode == 13 ) {
      retrieve()
    }
})

$('#songlist').on('click', function(evt) {
    if (evt.target.classList.contains('album-art')) {
    let player = `
        <audio id="player" autoplay controls src="${evt.target.dataset['url']}">
        Your browser does not support the <code>audio</code> element.
        </audio>
        <p>${evt.target.dataset['track']}</p>
    `
    console.log(evt.target.dataset['url'])
    $('#player-container').empty().append(player)
}})

retrieve();