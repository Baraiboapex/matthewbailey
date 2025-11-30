<script setup>
    import {reactive, onMounted, computed, ref} from "vue";
    import { useRoute } from 'vue-router';
    import PageContainer from "../components/UI/Reusable/PageContainer/PageContainer.vue";
    import ParagraphContainer from "../components/UI/Reusable/ParagraphContainer.vue";
    import SiteForm from "../components/UI/Reusable/SiteForm.vue";

    import {
        validateTextInput,
        validateAllTextFields,
        renderTextFieldValidation,
        textRulesNames,
        DEFAULT_TEXT_VALIDATION_OBJECT_VALUE
    } from "../helpers/inputValidation/inputValidator";
    
    import LoadingSign from "../components/UI/Reusable/LoadingSign.vue";
    import ToastMessage from "../components/UI/Reusable/ToastMessage.vue";

    const route = useRoute(); 
    const showLoadingSign = ref(false);
    const submissionWasSuccessful = ref(false);
    
    const pageToast = ref(null);

    const viewRequestForm = reactive({
        requesterEmail:"",
        requesterProject:"",
        requesterMessage:"",
        requesterCompany:"",
        requesterFirstName:"",
        requesterLastName:""
    });

    const formIsNotSubmitting = computed(()=>showLoadingSign.value === false);
    const toastMessage = computed(()=>submissionWasSuccessful.value ? "Your request was submitted!" : "Could not submit request");
    const toastType = computed(()=>submissionWasSuccessful.value ? "success" : "danger");

    const textValidationObject = reactive({
        requesterEmail:DEFAULT_TEXT_VALIDATION_OBJECT_VALUE,
        requesterProject:DEFAULT_TEXT_VALIDATION_OBJECT_VALUE,
        requesterMessage:DEFAULT_TEXT_VALIDATION_OBJECT_VALUE,
        requesterCompany:DEFAULT_TEXT_VALIDATION_OBJECT_VALUE,
        requesterFirstName:DEFAULT_TEXT_VALIDATION_OBJECT_VALUE,
        requesterLastName:DEFAULT_TEXT_VALIDATION_OBJECT_VALUE
    });

    const textFieldValidationList = [
        ()=>({
            fieldName:"requesterFirstName",
            validator:()=>validateTextInput({
                rules:[
                    textRulesNames.REQUIRED_RULE
                ],
                textValue:viewRequestForm.requesterFirstName
            }),
            invalidText:"Please input your first name"
        }),
        ()=>({
            fieldName:"requesterLastName",
            validator:()=>validateTextInput({
                rules:[
                    textRulesNames.REQUIRED_RULE
                ],
                textValue:viewRequestForm.requesterLastName
            }),
            invalidText:"Please input your last name"
        }),
        ()=>({
            fieldName:"requesterEmail",
            validator:()=>validateTextInput({
                rules:[
                    textRulesNames.REQUIRED_RULE,
                    textRulesNames.VALID_EMAIL_RULE
                ],
                textValue:viewRequestForm.requesterEmail,
            }),
            invalidText:"Please input a valid email"
        }),
        ()=>({
            fieldName:"requesterCompany",
            validator:()=>validateTextInput({
                rules:[
                    textRulesNames.REQUIRED_RULE
                ],
                textValue:viewRequestForm.requesterCompany,
            }),
            invalidText:"Please input your company name"
        }),
        ()=>({
            fieldName:"requesterProject",
            validator:()=>validateTextInput({
                rules:[
                    textRulesNames.REQUIRED_RULE
                ],
                textValue:viewRequestForm.requesterProject,
            }),
            invalidText:"Please input your requester project"
        }),
        ()=>({
            fieldName:"requesterMessage",
            validator:()=>validateTextInput({
                rules:[
                    textRulesNames.REQUIRED_RULE
                ],
                textValue:viewRequestForm.requesterMessage,
            }),
            invalidText:"Please input your message"
        })
    ];

    onMounted(()=>{
        if(route.query.projectName){
            viewRequestForm.requesterProject = route.query.projectName.replace("+"," ").replaceAll("\"","");
        }
    });

    const sendViewRequest = async () => {
        return new Promise((resolve, reject)=>{
            try{
            console.log("TEST");
        const RECIPIENT_NUMBER = "+19043090551";
        const API_KEY = "47591a94-70b0-4df9-b618-6548af827011";
        const DEVICE_ID = "68d948c5ceb77880de88f276";
        const API_URL = `https://api.textbee.dev/api/v1/gateway/devices/${DEVICE_ID}/send-sms`;
        const REQUEST_FORM = viewRequestForm
        const MESSAGE_TEXT = `
            Message from: ${REQUEST_FORM.requesterFirstName} ${REQUEST_FORM.requesterLastName}
            Email: ${REQUEST_FORM.requesterEmail}
            Requester Company: ${REQUEST_FORM.requesterEmail}
            Requested Project To View: ${REQUEST_FORM.requesterProject}

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
                            recipients: [RECIPIENT_NUMBER],
                            message: MESSAGE_TEXT
                        })
                    })
                        .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                        })
                        .then((data) => {
                        resolve("Message sent successfully!");
                        })
                        .catch((error) => {
                        console.error("Error sending SMS via TextBee:", error);
                        });
                    }catch(err){
                        reject("Could not submit form : "+ err);
                    }
        });
    };

    const makeViewRequest = async () =>{
         try{
            const textInputIsValid = validateAllTextFields(textFieldValidationList);

            renderTextFieldValidation({
                validFieldsList:textInputIsValid.validFieldsList,
                invalidFieldsList:textInputIsValid.invalidFieldsList,
                valueToValidateFromValidatorObject:textValidationObject
            });
            
            if(textInputIsValid.inputsAreValid){
                
                showLoadingSign.value = true;

                await sendViewRequest();

                showLoadingSign.value = false;
                submissionWasSuccessful.value = true;
                pageToast.value.showToast();
            }
        }catch(err){
            showLoadingSign.value = false;
            submissionWasSuccessful.value = false;
            pageToast.value.showToast();

            console.log("Could not login :"+err);
        }
    }
</script>
<template>
    <PageContainer>
        <ParagraphContainer :styles="{backgroundColor:'rgb(8, 71, 64, 0.2)'}" class="rounded-bottom p-2">
            <div class="row">
                <div class="col-12">
                    <section class="d-flex flex-column align-items-start justify-content-center mb-4">
                        <h3 class="mb-4">Send a project view request</h3>
                        <p>Thanks for showing interest in one of my projects!</p>
                        <p>Please fill out the form below in order to send a project view request.</p>
                        <p>I will get back to you via email with a link to view the requested project as soon as I can!</p>
                    </section>
                </div>
                <div class="col-12">
                    <div class="d-flex flex-column w-100">
                        <ToastMessage
                            ref="pageToast"
                            :toastText="toastMessage"
                            :toast-type="toastType"
                        />
                    </div>
                </div>
                <div v-if="formIsNotSubmitting" class="col-12 d-flex flex-column">
                    <SiteForm
                        :formData="viewRequestForm"
                        submitButtonText="Submit View Request"
                        @onFormSubmit="makeViewRequest"
                    >
                        <template #formBody>
                            <div class="form-group mt-4">
                                <label for="exampleInputEmail1">Your First Name</label>
                                <input type="text" name="requesterFirstName" :class="textValidationObject.requesterFirstName.classValue + ' w-100 m-1 form-control'" v-model="viewRequestForm.requesterFirstName" aria-describedby="enter first name" placeholder="Enter first name"/>
                                <span v-if="!textValidationObject.requesterFirstName.isValid" class="validator">
                                    {{ textValidationObject.requesterFirstName.invalidText }}
                                </span>
                            </div>
                            <div class="form-group mt-4">
                                <label for="exampleInputEmail1">Your Last Name</label>
                                <input type="text" name="requesterLastName" v-model="viewRequestForm.requesterLastName" :class="textValidationObject.requesterLastName.classValue + ' w-100 m-1 form-control'" aria-describedby="enter last name" placeholder="Enter last name"/>
                                <span v-if="!textValidationObject.requesterLastName.isValid" class="validator">
                                    {{ textValidationObject.requesterLastName.invalidText }}
                                </span>
                            </div>
                            <div class="form-group mt-4">
                                <label for="exampleInputEmail1">Your Email Address</label>
                                <input type="email" name="requesterEmail" v-model="viewRequestForm.requesterEmail" :class="textValidationObject.requesterEmail.classValue + ' w-100 m-1 form-control'" aria-describedby="enter email" placeholder="Enter email"/>
                                <span v-if="!textValidationObject.requesterEmail.isValid" class="validator">
                                    {{ textValidationObject.requesterEmail.invalidText }}
                                </span>
                            </div>
                            <div class="form-group mt-4">
                                <label for="exampleInputEmail1">Your Company</label>
                                <input type="text" name="requesterCompany" v-model="viewRequestForm.requesterCompany" :class="textValidationObject.requesterCompany.classValue + ' w-100 m-1 form-control'" aria-describedby="enter company" placeholder="Enter company"/>
                                <span v-if="!textValidationObject.requesterCompany.isValid" class="validator">
                                    {{ textValidationObject.requesterCompany.invalidText }}
                                </span>
                            </div>
                            <div class="form-group mt-4">
                                <label for="exampleInputEmail1">Requester Project</label>
                                <input type="text" name="requesterProject" v-model="viewRequestForm.requesterProject" :class="textValidationObject.requesterProject.classValue + ' w-100 m-1 form-control'" aria-describedby="enter project" placeholder="Enter project"/>
                                <span v-if="!textValidationObject.requesterProject.isValid" class="validator">
                                    {{ textValidationObject.requesterProject.invalidText }}
                                </span>
                            </div>
                            <div class="form-group mt-4">
                                <label for="exampleInputEmail1">Message</label>
                                <textarea name="requesterMessage" v-model="viewRequestForm.requesterMessage" :class="textValidationObject.requesterMessage.classValue + ' w-100 m-1 form-control'" aria-describedby="enter message" placeholder="Enter message"></textarea>
                                <span v-if="!textValidationObject.requesterMessage.isValid" class="validator">
                                    {{ textValidationObject.requesterMessage.invalidText }}
                                </span>
                            </div>
                        </template>
                    </SiteForm>
                </div>
                <div v-else class="col-12 d-flex flex-column justify-content-center align-items-center">
                    <LoadingSign
                        :showLoadingSign="showLoadingSign"
                        loadingMessageText="Sending your request..."
                    />
                </div>
            </div>
        </ParagraphContainer>
    </PageContainer>
</template>