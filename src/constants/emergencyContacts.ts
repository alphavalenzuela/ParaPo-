/**
 * ParaPo! Mobile App - Philippine Emergency Hotlines & Contacts
 */

import { EmergencyContactInfo } from '../types/safety';

export const NATIONAL_EMERGENCY_CONTACTS: EmergencyContactInfo[] = [
  {
    id: 'emg-911',
    name: 'National Emergency Hotline',
    type: 'NATIONAL_911',
    phoneNumber: '911',
    description: 'Police, Fire, Medical, Rescue (24/7 nationwide toll-free hotline)',
    isNationalEmergency: true,
  },
  {
    id: 'emg-pnp',
    name: 'Philippine National Police (PNP)',
    type: 'PNP_POLICE',
    phoneNumber: '117',
    description: 'PNP emergency assistance, patrol dispatch, and blotter hotline',
    isNationalEmergency: true,
  },
  {
    id: 'emg-mmda',
    name: 'MMDA Metrobase Hotline',
    type: 'MMDA',
    phoneNumber: '136',
    description: 'Road accidents, flood reports, traffic assistance, towing queries',
  },
  {
    id: 'emg-redcross',
    name: 'Philippine Red Cross',
    type: 'RED_CROSS',
    phoneNumber: '143',
    description: 'Ambulance service, emergency medical response, blood bank',
  },
  {
    id: 'emg-doh',
    name: 'Department of Health (DOH)',
    type: 'HOSPITAL',
    phoneNumber: '1555',
    description: 'Health emergencies, poison center, hospital referral',
  },
];
