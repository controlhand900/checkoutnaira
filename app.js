function payWithPaystack() {

    var handler = PaystackPop.setup({ 
        key: 'pk_test_acd17bf0084962ea6cdfb0ffc786d0480de69ccb', //put your public key here
        email: 'lawmann009@gmail.com', //put your customer's email here
        amount: 5000, //amount the customer is supposed to pay
        metadata: {
            custom_fields: [
                {
                    display_name: "Mobile Number",
                    variable_name: "mobile_number",
                    value: "+2348012345678" //customer's mobile number
                }
            ]
        },
        callback: function (response) {
            //after the transaction have been completed
            //make post call  to the server with to verify payment 
            //using transaction reference as post data
            $.post("verify.php", {reference:response.reference}, function(status){
                if(status == "success")
                    //successful transaction
                    alert('Transaction was successful');
                else
                    //transaction failed
                    alert(response);
            });
        },
        onClose: function () {
            //when the user close the payment modal
            alert('Transaction cancelled');
        }
    });
    handler.openIframe(); //open the paystack's payment modal
}
