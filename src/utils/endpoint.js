import axios from 'axios'
import {notify, objectToHTTPQuery} from "./helpers";
import {getUserToken, logOutUser, rememberRoute} from "./auth";

let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'token': localStorage.getItem('token'),
};
// let protectedHeader = {
//     headers: {
//         'content-type': 'text/json',
//         'apiKey': apiKey,
//         'collectionKey': collectionKey
//     }
// }
let fileHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    'token': localStorage.getItem('token'),
};
const Endpoint = {
    init: () => {
      // accountId = process.env.REACT_APP_ACCOUNT_ID;
      let token = getUserToken();
      if (token)
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.defaults.baseURL = "https://backends.kulpayng.com/api";
        //.defaults.baseURL = "http://10.211.55.4/api";

      // Intercept 401 HTTP Error code in API
      axios.interceptors.response.use(
        (response) => response,
        (error) => {
          if (!error.response) {
        // No responsekjhzzewq \
            // notify("Seems like you're offline, check internet connection")
          } else if (
            error.response &&
            error.response.status === 401 &&
            error.response.config.url !== "/signin"
          ) {
            rememberRoute();
            logOutUser();
          }
          return Promise.reject(error.response);
        }
      );
    },
    

    // ---Auth--- //
    // login: (data) => {
    //         return axios.post(`/Account/Login`,
    //         {
    //             headers : {
    //                 'content-type': 'text/json',
    //                 'encryptedpayload': data
    //             }
    //         }
    //     )
    // },
    login: (data) => {
        return axios.post('/Account/Login',null, {
            headers: {
                'Content-Type': 'application/json',
                'encryptedpayload': data
            }
        });
    },
    schoolSignUp: (data) => {
        return axios.post(`/Account/SchoolSignUp`, data, headers)
    },
    verifyAccount: (data) => {
        return axios.post(`/Account/AccountVerificationType`, data, headers)
    },
    accountActivationByPhone: (data) => {
        return axios.post(`/Account/AccountVerificationByPhoneNumber`, data, headers)
    },
    accountActivationByEmail: (data) => {
        return axios.post(`/Account/AccountVerificationByEmail`, data, headers)
    },
    createCollection: (data) => {
        return axios.post(`/Collection/CreateCollection`, data, headers)
    },
    
    addVendor: (data) => {
        return axios.post(`/Vendor/Post`, data, headers)
    },

    addTellerUser: (data) => {
        return axios.post(`/Account/AddTellerUser`, data, headers)
    },
    
    addDepartment: (data) => {
        return axios.post(`/Department/Post`, data, headers)
    },
    addTellerBank: (data) => {
        return axios.post(`/TellerBank/Post`, data, headers)
    },
   
    addFaculty: (data) => {
        return axios.post(`/Faculty/Post`, data, headers)
    },
    
    toggleUserStatus: (data, status) => {
        return axios.post(`/Account/ToggleUserStatus?UserId=${data}&status=${status}`, data, headers)
    },
    
    getAllVendorByInstitution: (data) => {
        return axios.get(`/Vendor/GetAllVendorBy?InstitutionId=${data}`, headers)
    },
    getInstitutionCollections: (data) => {
        return axios.get(`/Collection/GetByInstitutionId?institutionId=${data}`, headers)
    },
    getInstitutionCollectionsFeeSplit: (data) => {
        return axios.get(`/CollectionFeeSplit/GetCollectionFeeSplitByCollectionId?CollectionId=${data}`, headers)
    },

    postCollectionFeeSplit: (data) => {
        return axios.post(`/CollectionFeeSplit/CreateCollectionFeeSplit`, data, headers)
    },

    postCollectionPlatform: (data) => {
        return axios.post(`/CollectionPlatform/Post`, data, headers)
    },
    
    getAllUsers: (data) => {
        return axios.get(`/Account/ManageUsers${data}`, headers)
    },
    getVerificationRequests: () => {
        return axios.get(`/Account/GetVerificationRequests`, headers)
    },
    
  
    
    getTellerBanks: () => {
        return axios.get(`/TellerBank`, headers)
    },
    getPaymentGateways: () => {
        return axios.get(`/PaymentGateway`, headers)
    },
    
    getPersonDetails: (data) => {
        return axios.get(`/Person/${data}`, headers)
    },
    getInstitutionType: () => {
        return axios.get(`/InstitutionType/`, headers)
    },
    getDepartments: () => {
        return axios.get(`/Department/`, headers)
    },
    getFaculties: () => {
        return axios.get(`/Faculty/`, headers)
    },
    
    personVerification: (data) => {
        return axios.post(`/Account/PersonVerification`, data, fileHeaders)
    },
    InstitutionVerification: (data) => {
        return axios.post(`/Account/InstitutionVerification`, data, fileHeaders)
    },

    addPaymentGateway: (data) => {
        return axios.post(`/PaymentGateway/Post`, data, fileHeaders)
    },
    
    // ---Roles--- //
    getAllRoles: () => {
        return axios.get(`/Role/GetRoles`, headers)
    },

    getAllfaculties: () => {
        return axios.get(`/Faculty`, headers)
    },
    getAllDepartments: () => {
        return axios.get(`/Department`, headers)
    },
    
    postInstitutionFaculty: (data) => {
        return axios.post(`/Faculty/PostInstitutionFaculty`,data, headers)
    },
    
    postInstitutionDepartments: (data) => {
        return axios.post(`/Department/PostInstitutionDepartment`,data, headers)
    },
    
    
    // User
    getUserProfile: (data) => {
        return axios.get(`/User/UserProfile?userId=${data}`, headers)
    },

    getInstitutionFaculty: (institutionId, status) => {
        return axios.get(`/Faculty/GetInstitutionFaculty?InstitutionId=${institutionId}&status=${status}`, headers)
    },

    applyCollection: (data) => {
        return axios.post(`/CollectionDetail/CreateApplyCollection`, data, headers)
    },

    getActiveSession: () => {
        return axios.get(`/Session`, headers)
    },

    getActiveLevels: () => {
        return axios.get(`/Collection/GetAllActiveLevelAlt`, headers)
    },

    getInstitutionProgramme: (institutionId, status) => {
        return axios.get(`/Programme/GetInstitutionProgramme?InstitutionId=${institutionId}&status=${true}`, headers)
    },

    getInstitutionLevel: (institutionTypeId) => {
        return axios.get(`/Level/GetLevelByInstitutionId?Id=${institutionTypeId}`, headers)
    },

    getAllDepartmentByInstitution: (institutionId) => {
        return axios.get(`/Department/GetDepartmentByInstitution?InstitutionId=${institutionId}`, headers)
    },
    getAllDepartmentByCollection: (data) => {
        return axios.get(`/Department/GetDepartmentByCollection?collectionId=${data}`, headers)
    },
    
    
    getAllLevelByInstitution: (institutionId) => {
        return axios.get(`/Level/GetLevelByInstitution?InstitutionId=${institutionId}`, headers)
    },
    
    
    //Reporting
    getCollectionBy: (collectionId, institutionId, programmeId, departmentId, gatewaId, dateFrom, dateTo) => {
        return axios.get(`/Reporting/CollectionReportBy?collectionId=${collectionId}&institutionId=${institutionId}&programmeId=${programmeId}&departmentId=${departmentId}&paymentGatewayId=${gatewaId}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
    },

    getAllCollectionByPrimaryVendor: (institutionId, collectionId, dateFrom, dateTo) => {
        if(collectionId == "" || collectionId == "all"){
            return axios.get(`/Reporting/GetPaymentByCollectionByPrimaryVendor?institutionId=${institutionId}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
        }
        else{
            return axios.get(`/Reporting/GetPaymentByCollectionByPrimaryVendor?institutionId=${institutionId}&collectionId=${collectionId}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
        }
        
    },
    getAllCollectionByProgramme: (institutionId, collectionId, sessionId, programmeId, isPaid, dateFrom, dateTo) => {
        if(collectionId == "" || collectionId == "all"){
            return axios.get(`/Reporting/GetPaymentByCollectionProgramme?institutionId=${institutionId}&programmeId=${programmeId}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
        }
        else{
            return axios.get(`/Reporting/GetPaymentByCollectionProgramme?institutionId=${institutionId}&collectionId=${collectionId}&sessionId=${sessionId}&programmeId=${programmeId}&isInvoicdPaid=${isPaid}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
        }
    },
    getAllCollectionOutflowByProgramme: (vendorId, sessionId, programmeId, dateFrom, dateTo) => {
       
        return axios.get(`/Reporting/GetVendorsOutflowDetailsByProgramme?vendorId=${vendorId}&sessionId=${sessionId}&programmeId=${programmeId}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
       
    },

    
   
    getAllCollectionByDepartment: (institutionId, collectionId, sessionId, departmentId, isPaid, dateFrom, dateTo) => {
        if(collectionId == "" || collectionId == "all"){
            return axios.get(`/Reporting/GetPaymentByCollectionDepartment?institutionId=${institutionId}&departmentId=${departmentId}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
        }
        else{
            return axios.get(`/Reporting/GetPaymentByCollectionDepartment?institutionId=${institutionId}&collectionId=${collectionId}&sessionId=${sessionId}&departmentId=${departmentId}&isInvoicdPaid=${isPaid}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
        }
    },
    getAllCollectionBySession: (institutionId, collectionId, sessionId, isPaid, dateFrom, dateTo) => {
        if(collectionId == "" || collectionId == "all"){
            return axios.get(`/Reporting/GetPaymentByCollectionSession?institutionId=${institutionId}&sessionId=${sessionId}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
        }
        else{
            return axios.get(`/Reporting/GetPaymentByCollectionSession?institutionId=${institutionId}&collectionId=${collectionId}&sessionId=${sessionId}&isInvoicdPaid=${isPaid}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
        }
    },
    getCollectionByInflowBank: (institutionId, bankId, sessionId, dateFrom, dateTo) => {
            return axios.get(`/Reporting/GetPaymentByCollectionByPrimaryVendorBanks?institutionId=${institutionId}&bankId=${bankId}&sessionId=${sessionId}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
    },

    getVendorsOutflowDetailsBySession: (vendorId, sessionId, dateFrom, dateTo) => {
        return axios.get(`/Reporting/GetVendorsOutflowDetailsBySession?vendorId=${vendorId}&sessionId=${sessionId}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
    },
    getCollectionByDateRange: (institutionId, dateFrom, dateTo) => {
        return axios.get(`/Reporting/CollectionReportByDateRange?institutionId=${institutionId}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
    },
    getInflowSum: (institutionId, collectionId) => {
        if(collectionId == ""){
            return axios.get(`/Reporting/TotalCollectionSumByInstitution?institutionId=${institutionId}`, headers)
        }
        else{
            return axios.get(`/Reporting/TotalCollectionSumByInstitution?institutionId=${institutionId}&collectionId=${collectionId}`, headers)
        }
    },

    
    getOutflowSum: (institutionId, collectionId) => {
        if(collectionId == ""){
            return axios.get(`/Reporting/ResolveTotalCollectionOutflowSum?institutionId=${institutionId}`, headers)
        }
        else{
            return axios.get(`/Reporting/ResolveTotalCollectionOutflowSum?institutionId=${institutionId}&collectionId=${collectionId}`, headers)
        }
    },



    
    getMonthlyCollectionBy: (institutionId) => {
        return axios.get(`/Reporting/MonthlyCollectionReport?institutionId=${institutionId}`, headers)
    },

    getDailyCollectionBy: (institutionId) => {
        return axios.get(`/Reporting/DailyCollectionReport?institutionId=${institutionId}`, headers)
    },
    
    
    getAllState: () => {
       return axios.get(`/State/GetAllState`, headers)
    },
    getStateInstitutionList: (stateId, institutionTypeId) => {
        return axios.get(`/InstitutionType/GetInstituitionBy?StateId=${stateId}&InstituitionType=${institutionTypeId}`, headers)
    },

    postInstitutionProgrammes: (data) => {
        return axios.post(`/Programme/AddInstitutionProgramme`,data, headers)
    },

    // getInstitutionProgramme: (data) => {
    //     return axios.get(`/Programme/GetInstitutionProgramme?InstitutionId=${data}&status=${true}`,data, headers)
    // },

    
    getAllProgrammes: () => {
        return axios.get(`/Programme`, headers)
     },
     getBank: () => {
        return axios.get(`/Bank`, headers)
     },
    
   
     kulpayHandshake: (data, apiKey, collectionKey) => {
        // let payloadHeader = {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     // 'token': localStorage.getItem('token'),
        //     'apiKey': apiKey,
        //     'collectionKey': collectionKey
        // };
        // axios.defaults.headers.append('apiKey', apiKey)
        // axios.defaults.headers.append('collectionKey', collectionKey)
        return axios.post(`/Kulpaypayment/Gateway`, data, {
            headers: {
              'content-type': 'text/json',
              'apiKey': apiKey,
              'collectionKey': collectionKey
            }
          })
        
     },

     //Payment
     initializeTransaction: (data) => {
        return axios.post(`/PaymentGateway/InitializeTransaction`,data, headers)
    },
    pullPaymentSkinByPortalIdentifier: (data) => {
        return axios.get(`/Kulpaypayment/ResolveClientPortalIdentifierDetails?clientIdentifier=${data}`, headers)
    },

    
    callPaymentDetailsByRef: (data) => {
        return axios.get(`/Kulpaypayment/LoadPaymentDetails?Reference=${data}`, headers)
    },

    confirmAndUpdatePayment: (data) => {
        return axios.post(`/Kulpaypayment/ValidatePaymentBySwitchReference?gatewayReference=${data}`, headers)
    },
    accountNumberVerification: (accountNumber, bankCode) => {
        return axios.get(`/PaymentGateway/AccountNumberVaiidation?accountNumber=${accountNumber}&bankCode=${bankCode}`, headers)
     },
     resolveOnboarding: (personId, status) => {
        return axios.post(`/Account/ResolveOnboardingStatus?personId=${personId}&status=${status}`, headers)
    },
    
    getInflowBanks: (institutionId) => {
        return axios.get(`/Bank/GetInflowBanks?institutionId=${institutionId}`, headers)
    },
    
     
    getOutflowBanks: (institutionId) => {
        return axios.get(`/Bank/OutflowBankList?institutionId=${institutionId}`, headers)
    },

    getAllCollectionOutflowByDepartment: (vendorId, sessionId, departmentId, dateFrom, dateTo) => {
        return axios.get(`/Reporting/GetPaymentByOutflowDepartment?vendorId=${vendorId}&sessionId=${sessionId}&departmentId=${departmentId}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)

    },
    getBankOutflowBySession: (institutionId, bankId, sessionId, dateFrom, dateTo) => {
        return axios.get(`/Reporting/GetBankOutflowBySecondaryBeneficiaries?institutionId=${institutionId}&bankId=${bankId}&sessionId=${sessionId}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)

    },

    getBankOutflowByDepartment: (institutionId, bankId, sessionId, departmentId, dateFrom, dateTo) => {
        return axios.get(`/Reporting/GetBankOutflowDetailsByDepartment?institutionId=${institutionId}&bankId=${bankId}&sessionId=${sessionId}&departmentId=${departmentId}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
    },
   
    getBankOutflowByProgramme: (institutionId, bankId, sessionId, programmeId, dateFrom, dateTo) => {
        return axios.get(`/Reporting/GetBankOutflowDetailsByProgramme?institutionId=${institutionId}&bankId=${bankId}&sessionId=${sessionId}&programmeId=${programmeId}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
    },

    getCollectionChartBySession: (institutionId, sessionId, dateFrom, dateTo) => {
        return axios.get(`/Collection/CollectionChartBySession?institutionId=${institutionId}&sessionId=${sessionId}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
    },
    getCollectionChartByDepartment: (institutionId, sessionId, dateFrom, dateTo) => {
        return axios.get(`/Collection/CollectionChartByDepartment?institutionId=${institutionId}&sessionId=${sessionId}&DateFrom=${dateFrom}&DateTo=${dateTo}`, headers)
    },
    getMonthlyCollectionChart: (institutionId) => {
        return axios.get(`/Collection/GetMonthlyCollectionChart?institutionId=${institutionId}`, headers)
    },
    getMonthlyInfloAmount: (institutionId) => {
        return axios.get(`/Collection/GetMonthlyInfloAmount?institutionId=${institutionId}`, headers)
    },
    getMonthlyOutflowAmount: (institutionId) => {
        return axios.get(`/Collection/GetMonthlyOutflowAmount?institutionId=${institutionId}`, headers)
    },
    merchantVerificationAction: (data) => {
        return axios.post('/Account/MerchantVerificationAction', null, {
            headers: {
                'Content-Type': 'application/json',
                'encryptedpayload': data
            }
        });
    },

    getKulpayBankAccount: () => {
        return axios.get(`/Bank/GetKulBankAccounts`, headers)
    },
    
};





export default Endpoint