const search = $('#searchbar')
search.val('emancipator')

const player = $('#player')
const searchButton = $('#search-button')

let $songsDiv = $('#songlist')
                    
$('#search-button').on('click', function(evt) {
    let term = search.val()

    $.get('https://itunes.apple.com/search?term=',
        {
            term: term,
            media: 'music',
            limit: 30
        },
        function(data) {
            console.log(data)
            console.log(data.resultCount)
            $songsDiv.empty()
            
            $.each(
                data.results,
                function(result, $songsDiv) {
                    console.log(result.artistName)
                    console.log(result.artistViewUrl)
                    console.log(result.artworkUrl100)
                    console.log(result.collectionName)
                    console.log(result.collectionViewUrl)
                    console.log(result.trackName)
                    console.log(result.previewUrl)
                    $songsDiv.append(`<p>${result.artistName}</p>`)
                    player.attr({src: result.previewUrl})

        
                },
            )
        },
        'json'
    )
})

    // function getSongs(term) {
    //     $.ajax({   
    //         url: 'https://itunes.apple.com/',
    //         data: {
    //             term: term,
    //             media: 'music',
    //         },
    //         crossDomain: true,
    //         dataType: 'jsonp',
    //         method: 'GET',
    //         success: function (data) {
    //             console.log(data)
    //             console.log('success!!!')
    //             // $songsDiv.empty()
    //             // $.each(data.)
    //         },
    //         error: function(error) {
    //             console.log(error)
    //             console.log('error!!!')
    //         }
    //     })
    // }
    // getSongs(term)
