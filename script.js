document.getElementById('airtimeForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const phone = document.getElementById('phone').value;
    const amount = document.getElementById('amount').value;

    const apiUrl = 'https://api.africastalking.com/version1/airtime/send'; // Africa's Talking API URL
    const apiKey = 'https://cdpn.io/pen/debug/WNVpLXO?authentication_hash=vWkRwpnmDDLM'; // Replace with your actual Africa's Talking API key

    const airtimePayload = {
        recipients: JSON.stringify([{
            phoneNumber: phone,
            amount: `ZAR ${amount}` // Adjust the currency to ZAR (South African Rand)
        }])
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'apiKey': apiKey,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: new URLSearchParams(airtimePayload)
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('result').innerText = `Airtime of ZAR ${amount} sent to ${phone}! 🎉`;
            document.getElementById('result').style.color = 'green';
        } else {
            document.getElementById('result').innerText = `Error: ${data.error || 'Failed to send airtime'}`;
            document.getElementById('result').style.color = 'red';
        }
    } catch (error) {
        console.error('Error sending airtime:', error);
        document.getElementById('result').innerText = 'Airtime request failed.';
        document.getElementById('result').style.color = 'red';
    }
});
