import patientsData from '../../data/patients';
import { Patient, NonSensitivePatientsData } from '../../types';

const patients: Patient[] = patientsData;
const nonSensitivePatient: NonSensitivePatientsData[] = patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation
}));


const getPatients = (): Patient[] => {
    return patients
}
const getNonSensitivePatients = (): NonSensitivePatientsData[] => {
    return nonSensitivePatient
}

export default { getPatients, getNonSensitivePatients }