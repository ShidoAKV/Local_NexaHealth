import express from "express";
import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorDashboard, doctorList, doctorProfile, Editnote, generateForm, getmessagehistory, loginDoctor, updateDoctorProfile } from "../Controllers/doctorController.js";
import authDoctor from "../Middlewares/authDoctor.js";

const doctorRouter=express.Router();

doctorRouter.get('/list',doctorList);
doctorRouter.post('/login',loginDoctor);
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor);
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete);
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel);
doctorRouter.get('/dashboard',authDoctor,doctorDashboard);
doctorRouter.get('/profile',authDoctor,doctorProfile);
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile);
doctorRouter.post('/generate-form',generateForm);
doctorRouter.get('/message-history',authDoctor,getmessagehistory);
doctorRouter.post('/edit',authDoctor,Editnote);








export default doctorRouter;