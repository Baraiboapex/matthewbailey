<script setup>
    import {reactive, onMounted} from "vue";
    import { useRoute } from 'vue-router';
    import PageContainer from "../components/UI/Reusable/PageContainer/PageContainer.vue";
    import ParagraphContainer from "../components/UI/Reusable/ParagraphContainer.vue";
    
    const viewRequestForm = reactive({
        requesterEmail:"",
        requesterProject:"",
        requesterMessage:"",
        requesterCompany:"",
        requesterFirstName:"",
        requesterLastName:""
    });

    const sendViewRequest = () => {
        const API_URL = `https://api.textbee.dev/api/v1/gateway/devices/${DEVICE_ID}/send-sms`;
        const REQUEST_FORM = viewRequestForm
        const MESSAGE_TEXT = `
            Message from: ${REQUEST_FORM.requesterFirstName} ${REQUEST_FORM.requesterLastName}

            Email: ${REQUEST_FORM.requesterEmail}

            Requester Company: ${REQUEST_FORM.requesterEmail}

            Message: 

            Hi, Matthew!

            ${REQUEST_FORM.requesterMessage}
        `; 

        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY
            },
            body: JSON.stringify({
                recipients: [RECIPIENT_NUMBER], // An array of recipients
                message: MESSAGE_TEXT
            })
        })
            .then((response) => {
            // Check if the response status is successful (e.g., 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the response body as JSON
            return response.json();
            })
            .then((data) => {
            // Log the successful response data
            console.log("TextBee Response:", data);
            console.log("Message sent successfully!");
            })
            .catch((error) => {
            // Handle any network or API errors
            console.error("Error sending SMS via TextBee:", error);
            });
    };
</script>
<template>
    <PageContainer>
        <ParagraphContainer :styles="{backgroundColor:'rgb(8, 71, 64, 0.2)'}" class="rounded-bottom">

        </ParagraphContainer>
    </PageContainer>
</template>