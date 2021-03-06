'use strict';

angular.module('copay.backup').controller('BackupController',
  function($scope, $rootScope, $location, $window, $timeout) {
    $scope.title = 'Backup';

    var filename = $rootScope.wallet.id + '.json.aes';

    // TODO: get the real encrypted wallet.
    var _getEncryptedWallet = function() {
      var wallet = $rootScope.wallet.toEncryptedObj();
      return wallet;
    };

    var _getWalletBlob = function() {
      var wallet = _getEncryptedWallet();
      var blob = new Blob([wallet], {type: 'text/plain;charset=utf-8'});

      return blob;
    };

    $scope.download = function() {
      var blob = _getWalletBlob();
      saveAs(blob, filename);
    };

    $scope.dropbox = function() { 
      var blob = _getWalletBlob();
      var url = $window.URL.createObjectURL(blob);

      // TODO: send the blob to Dropbox, (if we can...)
    };

    $scope.email = function() {
      var email = prompt('Please enter your email addres.');
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!email.match(mailformat)) {
        alert('Enter a valid email address');
      } else {
        if (email && email !== '') {
          var body = _getEncryptedWallet();
          var subject = 'Copay Backup'; 
          var href = 'mailto:' + email + '?'
           + 'subject=' + subject + '&'
           + 'body=' + body;

          var newWin = $window.open(href, '_blank', 'scrollbars=yes,resizable=yes,width=10,height=10');

          if (newWin) {
            $timeout(function() {
              newWin.close();
            }, 1000);
          }
        }
      }
    };
  
  });
