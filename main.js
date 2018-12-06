const search = $('#searchbar')
search.val('emancipator')

const searchButton = $('#search-button')

let $songsDiv = $('#songlist')
                    
$('#search-button').on('click', function(evt) {

    let term = search.val()

    $.get('https://itunes-api-proxy.glitch.me/',
        {
            term: term,
            media: 'music'
        },
        function(data) {
            console.log(data)
        },
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
