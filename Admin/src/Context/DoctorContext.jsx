import { createContext } from "react";
import { useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { useEffect } from "react";
export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [ProfileData, setProfileData] = useState(false)
     const [messagedata, setMessagedata] = useState([])
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/doctor/appointments', { headers: { dToken } });

            if (data.success) {
                //   console.log(data.appointments);

                setAppointments(data.appointments);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            //   console.log(error.message);
            toast.error(error.message);
        }
    }

    const completeAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendurl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } });

            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }


    }

    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendurl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } });

            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }


    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/doctor/dashboard', { headers: { dToken } });

            if (data.success) {
                // console.log(data.dashData);

                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/doctor/profile', { headers: { dToken } });

            if (data.success) {
                //  console.log(data.ProfileData);

                setProfileData(data.ProfileData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getmessagehistory = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/doctor/message-history',
                {headers:{dToken}},
            );
            if (data.success) {
               setMessagedata(data.message);
            }
        } catch (error) {
            console.log(error.response.message.data);
            
            toast.error(error.response.message.data);
        }

    }

    useEffect(() => {
        if (dToken) {
            getProfileData();
            getmessagehistory();
        }
    }, [dToken])


    const value = {
        dToken, setDToken, backendurl
        , getAppointments, appointments
        , setAppointments, completeAppointment
        , cancelAppointment, getDashData, dashData, setDashData,
        getProfileData, setProfileData, ProfileData, getmessagehistory,messagedata
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}


export default DoctorContextProvider;