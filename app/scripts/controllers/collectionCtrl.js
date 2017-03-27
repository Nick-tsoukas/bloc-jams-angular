(function() {
    function CollectionCtrl(Fixtures) {
        this.albums = Fixtures.getCollection(12);
//        this.albums = [];
//        for (var i=0; i<12; i++){
//            this.albums.push(angular.copy(albumPicasso));
//        }
    }
    
    angular 
        .module('blocJams')
        .controller('CollectionCtrl', CollectionCtrl);
})();