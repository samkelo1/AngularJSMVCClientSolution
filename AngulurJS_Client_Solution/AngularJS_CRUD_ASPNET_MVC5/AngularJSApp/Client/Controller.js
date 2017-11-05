//client controller 
myapp.controller('client-controller', function ($scope, clientService) {

    //Loads all client records when page loads
    loadClients();

    function loadClients() {
        var ClientRecords = clientService.getAllClients();
        ClientRecords.then(function (d) {
            $scope.Clients = d.data;
        },
        function () {
            alert("Error occured while fetching clients list...");
        });
    }

    //save clients data 
    $scope.save = function () {
        var Client = {
            Surname: $scope.Surname,
            FirstName: $scope.FirstName,
            IdentityType: $scope.IdentityType,
            IdentityNumber: $scope.IdentityNumber,
            DateOfBirth: $scope.DateOfBirth
        };
        var saverecords = clientService.save(Client);
        saverecords.then(function (d) {
            if (d.data.success === true) {
                loadClients();
                alert("Client added successfully");
                $scope.resetSave();
            }
            else { alert("Client not added."); }
        },
        function () {
            alert("Error occurred while adding employee.");
        });
    }

    //reset controls after save operation
    $scope.resetSave = function () {
        $scope.Surname = '';
        $scope.FirstName = '';
        $scope.IdentityType = '';
        $scope.IdentityNumber = '';
        $scope.DateOfBirth = '';
    }

    //get single record by ID
    $scope.getForUpdate = function (Client) {
        $scope.UpdateSurname = Client.Surname;
        $scope.UpdateFirstName = Client.FirstName;
        $scope.UpdateIdentityType = Client.IdentityType;
        $scope.UpdateIdentityNumber = Client.IdentityNumber;
        $scope.UpdateDateOfBirth = Client.DateOfBirth;
    }

    //get data for delete confirmation
    $scope.getForDelete = function (Client) {
        $scope.UpdateId = Client.Id;
        $scope.UpdateFirstName = Client.FirstName;
        $scope.UpdateSurname = Client.Surname;
    }

    //update Client data
    $scope.update = function () {
        var Client = {
            Surname: $scope.UpdateSurname,
            FirstName: $scope.UpdateFirstName,
            IdentityType: $scope.UpdateIdentityType,
            IdentityNumber: $scope.UpdateIdentityNumber,
            DateOfBirth: $scope.UpdateDateOfBirth
        };
        var updaterecords = clientService.update(Client);
        updaterecords.then(function (d) {
            if (d.data.success === true) {
                loadClients();
                alert("Client updated successfully");
                $scope.resetUpdate();
            }
            else {
                alert("Client not updated.");
            }
        },
        function () {
            alert("Error occured while updating client record");
        });
    }

    //reset controls after update
    $scope.resetUpdate = function () {
        $scope.UpdateSurname = '';
        $scope.UpdateFirstName = '';
        $scope.UpdateIdentityType = '';
        $scope.UpdateIdentityNumber = '';
        $scope.UpdateDateOfBirth = '';
    }

    //delete Client record
    $scope.delete = function (UpdateId) {
        var deleterecord = clientsService.delete($scope.UpdateId);
        deleterecord.then(function (d) {
            if (d.data.success === true) {
                loadClients();
                alert("Client deleted succussfully");
            }
            else {
                alert("Client not deleted.");
            }
        });
    }
});
