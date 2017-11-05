//Service to get data from client mvc controller 
myapp.service('clientService', function ($http) {


    //read client
    this.getAllClients = function () {
        return $http.get('/Client/GetClient');
    }

    //add new client
    this.save = function (Client) {
        var request = $http({
            method: 'post',
            url: '/Client/Insert',
            data: Client
        });
        return request;
    }

    //update Client records
    this.update = function (Client) {
        var updaterequest = $http({
            method: 'post',
            url: '/Client/Update',
            data: Client
        });
        return updaterequest;
    }

    //delete record
    this.delete = function (UpdateId) {
        return $http.post('/Client/Delete/' + UpdateId);
    }
});
