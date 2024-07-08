import axios from "axios";

const url =
  "https://greatrun.ethiotelecom.et/great/v1/customers/get-all-data";
const ticket_url = "https://greatrun.ethiotelecom.et/great/v1/customers/get-by-ref?ref="
const updateSize_url = "https://greatrun.ethiotelecom.et/great/v1/customers/"
const collection_url = "https://greatrun.ethiotelecom.et/great/v1/customers/collection/"
const pass_url = "https://greatrun.ethiotelecom.et/great/v1/user/"
export const fetchData = async () => {
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
export const fetchTicket = async (reference) => {
  try {
    const response = await axios.get(ticket_url + reference);
    return response;
  } catch (e) {
    console.log(e);
    throw new e;
  }
};
// https://developer.ethiotelecom.et/great/subscriptions/get-tshirt?reference=REFERENCE#

export const updateSize = async (data, id) =>{
  try{
    const response = await axios.patch(updateSize_url + id, data);
    return response;
  }
  catch(e){
    console.log(e)
    throw new e;
  }
}
export const updateCollectionStatus = async (data, id) =>{
  try{
    const response = await axios.patch(collection_url + id, data);
    return response;
  }
  catch(e){
    console.log(e)
    throw new e;
  }
}
export const changePass = async (data, id) =>{
  try{
    const response = await axios.patch(pass_url + id, data);
    return response;
  }
  catch(e){
    console.log(e)
    throw new e;
  }
}