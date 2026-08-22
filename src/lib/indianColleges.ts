export const INDIAN_STATES_AND_UTS: string[] = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi (NCR)",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

export const MAJOR_INDIAN_COLLEGES: { name: string; state: string; city: string }[] = [
  // Delhi / NCR
  { name: "Indian Institute of Technology Delhi (IIT Delhi)", state: "Delhi (NCR)", city: "New Delhi" },
  { name: "Delhi Technological University (DTU)", state: "Delhi (NCR)", city: "New Delhi" },
  { name: "Netaji Subhas University of Technology (NSUT)", state: "Delhi (NCR)", city: "New Delhi" },
  { name: "Indraprastha Institute of Information Technology (IIIT Delhi)", state: "Delhi (NCR)", city: "New Delhi" },
  { name: "University of Delhi (DU)", state: "Delhi (NCR)", city: "New Delhi" },
  { name: "Jawaharlal Nehru University (JNU)", state: "Delhi (NCR)", city: "New Delhi" },
  { name: "Jamia Millia Islamia (JMI)", state: "Delhi (NCR)", city: "New Delhi" },
  { name: "Amity University Noida", state: "Uttar Pradesh", city: "Noida" },

  // Maharashtra
  { name: "Indian Institute of Technology Bombay (IIT Bombay)", state: "Maharashtra", city: "Mumbai" },
  { name: "College of Engineering Pune (COEP)", state: "Maharashtra", city: "Pune" },
  { name: "Veermata Jijabai Technological Institute (VJTI)", state: "Maharashtra", city: "Mumbai" },
  { name: "Savitribai Phule Pune University (SPPU / Pune University)", state: "Maharashtra", city: "Pune" },
  { name: "University of Mumbai (MU)", state: "Maharashtra", city: "Mumbai" },
  { name: "Visvesvaraya National Institute of Technology (VNIT Nagpur)", state: "Maharashtra", city: "Nagpur" },
  { name: "BITS Pilani - K.K. Birla Goa Campus", state: "Goa", city: "Goa" },

  // Karnataka
  { name: "Indian Institute of Science (IISc Bangalore)", state: "Karnataka", city: "Bengaluru" },
  { name: "National Institute of Technology Karnataka (NIT Surathkal)", state: "Karnataka", city: "Mangaluru" },
  { name: "Visvesvaraya Technological University (VTU Belagavi)", state: "Karnataka", city: "Belagavi" },
  { name: "RV College of Engineering (RVCE)", state: "Karnataka", city: "Bengaluru" },
  { name: "BMS College of Engineering (BMSCE)", state: "Karnataka", city: "Bengaluru" },
  { name: "MS Ramaiah Institute of Technology (MSRIT)", state: "Karnataka", city: "Bengaluru" },
  { name: "PES University", state: "Karnataka", city: "Bengaluru" },
  { name: "Manipal Institute of Technology (MAHE Manipal)", state: "Karnataka", city: "Manipal" },

  // Tamil Nadu
  { name: "Indian Institute of Technology Madras (IIT Madras)", state: "Tamil Nadu", city: "Chennai" },
  { name: "National Institute of Technology Tiruchirappalli (NIT Trichy)", state: "Tamil Nadu", city: "Tiruchirappalli" },
  { name: "Vellore Institute of Technology (VIT Vellore)", state: "Tamil Nadu", city: "Vellore" },
  { name: "SRM Institute of Science and Technology (SRM KTR)", state: "Tamil Nadu", city: "Chennai" },
  { name: "Anna University (CEG Campus)", state: "Tamil Nadu", city: "Chennai" },
  { name: "PSG College of Technology", state: "Tamil Nadu", city: "Coimbatore" },
  { name: "Amrita Vishwa Vidyapeetham", state: "Tamil Nadu", city: "Coimbatore" },

  // Uttar Pradesh
  { name: "Indian Institute of Technology Kanpur (IIT Kanpur)", state: "Uttar Pradesh", city: "Kanpur" },
  { name: "Indian Institute of Technology BHU (IIT BHU Varanasi)", state: "Uttar Pradesh", city: "Varanasi" },
  { name: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)", state: "Uttar Pradesh", city: "Lucknow" },
  { name: "Motilal Nehru National Institute of Technology (MNNIT Allahabad)", state: "Uttar Pradesh", city: "Prayagraj" },
  { name: "Harcourt Butler Technical University (HBTU Kanpur)", state: "Uttar Pradesh", city: "Kanpur" },
  { name: "Madan Mohan Malaviya University of Technology (MMMUT Gorakhpur)", state: "Uttar Pradesh", city: "Gorakhpur" },
  { name: "Jaypee Institute of Information Technology (JIIT Noida)", state: "Uttar Pradesh", city: "Noida" },

  // West Bengal
  { name: "Indian Institute of Technology Kharagpur (IIT Kharagpur)", state: "West Bengal", city: "Kharagpur" },
  { name: "Maulana Abul Kalam Azad University of Technology (MAKAUT / WBUT)", state: "West Bengal", city: "Kolkata" },
  { name: "Jadavpur University", state: "West Bengal", city: "Kolkata" },
  { name: "Indian Institute of Engineering Science and Technology (IIEST Shibpur)", state: "West Bengal", city: "Howrah" },
  { name: "Heritage Institute of Technology", state: "West Bengal", city: "Kolkata" },
  { name: "IEM Kolkata", state: "West Bengal", city: "Kolkata" },

  // Gujarat
  { name: "Indian Institute of Technology Gandhinagar (IIT Gandhinagar)", state: "Gujarat", city: "Gandhinagar" },
  { name: "Gujarat Technological University (GTU)", state: "Gujarat", city: "Ahmedabad" },
  { name: "Sardar Vallabhbhai National Institute of Technology (SVNIT Surat)", state: "Gujarat", city: "Surat" },
  { name: "Nirma University", state: "Gujarat", city: "Ahmedabad" },
  { name: "Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT)", state: "Gujarat", city: "Gandhinagar" },
  { name: "Parul University", state: "Gujarat", city: "Vadodara" },

  // Rajasthan
  { name: "Indian Institute of Technology Jodhpur (IIT Jodhpur)", state: "Rajasthan", city: "Jodhpur" },
  { name: "BITS Pilani (Main Campus)", state: "Rajasthan", city: "Pilani" },
  { name: "Malaviya National Institute of Technology (MNIT Jaipur)", state: "Rajasthan", city: "Jaipur" },
  { name: "Rajasthan Technical University (RTU Kota)", state: "Rajasthan", city: "Kota" },
  { name: "Manipal University Jaipur", state: "Rajasthan", city: "Jaipur" },

  // Punjab / Chandigarh / Haryana
  { name: "Indian Institute of Technology Ropar (IIT Ropar)", state: "Punjab", city: "Rupnagar" },
  { name: "Punjab Engineering College (PEC)", state: "Chandigarh", city: "Chandigarh" },
  { name: "Panjab University (PU)", state: "Chandigarh", city: "Chandigarh" },
  { name: "Thapar Institute of Engineering and Technology (TIET)", state: "Punjab", city: "Patiala" },
  { name: "Lovely Professional University (LPU)", state: "Punjab", city: "Phagwara" },
  { name: "Chandigarh University (CU)", state: "Punjab", city: "Mohali" },
  { name: "National Institute of Technology Kurukshetra (NIT Kurukshetra)", state: "Haryana", city: "Kurukshetra" },

  // Telangana & Andhra Pradesh
  { name: "Indian Institute of Technology Hyderabad (IIT Hyderabad)", state: "Telangana", city: "Hyderabad" },
  { name: "International Institute of Information Technology Hyderabad (IIIT Hyderabad)", state: "Telangana", city: "Hyderabad" },
  { name: "National Institute of Technology Warangal (NIT Warangal)", state: "Telangana", city: "Warangal" },
  { name: "Jawaharlal Nehru Technological University Hyderabad (JNTUH)", state: "Telangana", city: "Hyderabad" },
  { name: "JNTU Kakinada", state: "Andhra Pradesh", city: "Kakinada" },
  { name: "KL University", state: "Andhra Pradesh", city: "Guntur" },
  { name: "Vignan's Foundation for Science, Technology and Research", state: "Andhra Pradesh", city: "Guntur" },

  // Madhya Pradesh / Bihar / Jharkhand / Odisha / Chhattisgarh
  { name: "Indian Institute of Technology Indore (IIT Indore)", state: "Madhya Pradesh", city: "Indore" },
  { name: "Maulana Azad National Institute of Technology (MANIT Bhopal)", state: "Madhya Pradesh", city: "Bhopal" },
  { name: "Indian Institute of Technology Patna (IIT Patna)", state: "Bihar", city: "Patna" },
  { name: "National Institute of Technology Patna (NIT Patna)", state: "Bihar", city: "Patna" },
  { name: "Indian Institute of Technology (ISM) Dhanbad", state: "Jharkhand", city: "Dhanbad" },
  { name: "National Institute of Technology Rourkela (NIT Rourkela)", state: "Odisha", city: "Rourkela" },
  { name: "KIIT University", state: "Odisha", city: "Bhubaneswar" },
  { name: "National Institute of Technology Raipur (NIT Raipur)", state: "Chhattisgarh", city: "Raipur" },

  // Kerala & Assam / NE
  { name: "National Institute of Technology Calicut (NIT Calicut)", state: "Kerala", city: "Kozhikode" },
  { name: "APJ Abdul Kalam Technological University (KTU Kerala)", state: "Kerala", city: "Thiruvananthapuram" },
  { name: "Indian Institute of Technology Guwahati (IIT Guwahati)", state: "Assam", city: "Guwahati" },
  { name: "National Institute of Technology Silchar (NIT Silchar)", state: "Assam", city: "Silchar" }
];

export function searchColleges(query: string, filterState?: string): string[] {
  const cleanQuery = query.trim().toLowerCase();
  let list = MAJOR_INDIAN_COLLEGES;
  
  if (filterState && filterState !== "All States") {
    list = list.filter(c => c.state === filterState);
  }

  if (!cleanQuery) {
    return list.slice(0, 10).map(c => c.name);
  }

  return list
    .filter(c => c.name.toLowerCase().includes(cleanQuery) || c.city.toLowerCase().includes(cleanQuery))
    .map(c => c.name)
    .slice(0, 15);
}
