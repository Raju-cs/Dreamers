

(function () {
    var browserData = localStorage.getItem("Device");
    if (browserData) {
        var device = JSON.parse(browserData);
        if (device.Id) {
            getActivity(device);
        } else {
            setDevice();
        }
    } else {
        setDevice();
    }
    function getActivity(device) {
        Global.CallServer('/SecurityArea/DeviceActivity/Set?deviceId=' + device.Id, function (response) {
            if (!response.IsError) {
                window.ActivityId = response.ActivityId;
            } else {

            }
        }, function (response) {

        }, {}, 'GET');
    };
    function setDevice() {
        var model = {
            AppName: navigator.appName,
            Language: navigator.language,
            Platform: navigator.platform,
            UserAgent: navigator.userAgent
        };
        Global.CallServer('SecurityArea/Device/Set', function (response) {
            if (!response.IsError) {
                var device = { Id: response.Id, HasAccess: response.HasAccess };
                localStorage.setItem("Device", JSON.stringify(device));
                getActivity(device);
            } else {
                
            }
        }, function (response) {

        }, model, 'POST');
    };
})();

