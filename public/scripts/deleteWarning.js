(function() {

    function Start() 
    {
        console.log("App Staerted...");
        let deleteButtons = document.getElementsByName('deleteSurvay');
        console.log("btn found");

        for(button of deleteButtons) {
            button.addEventListener('click', (event) => {
                if(!confirm("Are you sure?")) {
                    event.preventDefault();
                    window.location.assign('/survay');
                }
            });
        }
        
    
    }

    window.addEventListener("load", Start);

})();