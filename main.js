const search = $('#searchbar')
search.val('emancipator')

const player = $('#player')
const $searchButton = $('#search-button')
let term = search.val()
     
function retrieve(term) {
    $.get('https://itunes.apple.com/search?term=',
        {
            term: search.val(),
            media: 'music',
            limit: 30
        },
        function(data) {
            // console.log(data.results)
            $('#songlist').empty()
            
            $.each(data.results, function(i, result) {
                if (i > 10) {return false}
                let albumArt = result.artworkUrl100.replace('100x100','550x550')
                let cardHtml = `
                    <div class="itemsContainer">
                        <div><img class="album-art thumbnail" src="${albumArt}">
                            <div class="play"><img src="play.png" />
                            </div>
                        </div>
                    </div>
                    <h5>${result.trackName}</h5>
                    <p><a href="${result.collectionViewUrl}" >${result.collectionName} - </a><a href="${result.artistViewUrl}">${result.artistName}</a></p>
                    <audio class="players" controls src="${result.previewUrl}">
                        Your browser does not support the <code>audio</code> element.
                    </audio>
                ` 
                $('#songlist').append($(`<div class="column song" data="${result.previewUrl}" />`).html(cardHtml))
                $('#player').attr({src: result.previewUrl})
            })
        },
        'json'
    )
}

$('#search-button').on('click', function(evt) {
    retrieve()
})

$('#search-button').on('blur keydown', function() {
    if ( !event.keyCode || event.keyCode == 13 ) {
      retrieve();
    }
});
  
retrieve();