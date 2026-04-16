import { storage } from "./storage";
import type { MemoryStorage } from "./storage";

export function seedDatabase() {
  if (storage.hospitalCount() > 0) return;

  console.log("Seeding database...");

  // === HOSPITALS ===
  // Chennai (3)
  storage.createHospital({
    name: "Apollo Hospitals Chennai",
    city: "Chennai",
    address: "21, Greams Lane, Off Greams Road, Chennai 600006",
    specializations: JSON.stringify(["Cardiac Sciences", "Orthopedics", "Oncology", "Neurology", "Organ Transplant"]),
    rating: 4.8,
    accreditations: JSON.stringify(["JCI", "NABH", "NABL"]),
    description: "Apollo Hospitals Chennai is one of India's most renowned multi-specialty hospitals with over 60 departments and centers of excellence. Known for pioneering heart surgeries and advanced cancer care.",
    imageUrl: null,
    bedCount: 700,
    established: 1983,
  });
  storage.createHospital({
    name: "Fortis Malar Hospital",
    city: "Chennai",
    address: "52, 1st Main Road, Gandhi Nagar, Adyar, Chennai 600020",
    specializations: JSON.stringify(["Cardiac Sciences", "Orthopedics", "Gastroenterology", "Urology"]),
    rating: 4.5,
    accreditations: JSON.stringify(["NABH", "NABL"]),
    description: "Fortis Malar Hospital is a premier cardiac care facility known for its expertise in minimally invasive heart surgeries and comprehensive cardiac rehabilitation programs.",
    imageUrl: null,
    bedCount: 180,
    established: 1992,
  });
  storage.createHospital({
    name: "MIOT International",
    city: "Chennai",
    address: "4/112, Mount Poonamallee Road, Manapakkam, Chennai 600089",
    specializations: JSON.stringify(["Orthopedics", "Joint Replacement", "Spine Surgery", "Sports Medicine"]),
    rating: 4.6,
    accreditations: JSON.stringify(["JCI", "NABH"]),
    description: "MIOT International is Asia's largest joint replacement center, performing over 5,000 joint replacements annually with world-class outcomes and internationally trained surgeons.",
    imageUrl: null,
    bedCount: 600,
    established: 1999,
  });

  // Kochi (3)
  storage.createHospital({
    name: "Amrita Institute of Medical Sciences",
    city: "Kochi",
    address: "Amrita Lane, Ponekkara, Edappally, Kochi 682041",
    specializations: JSON.stringify(["Cardiac Sciences", "Oncology", "Neurosciences", "Organ Transplant", "Gastroenterology"]),
    rating: 4.7,
    accreditations: JSON.stringify(["NABH", "NABL", "JCI"]),
    description: "AIMS Kochi is a 1,200-bed tertiary care teaching hospital recognized for its excellence in complex surgeries, robotic procedures, and affordable healthcare delivery.",
    imageUrl: null,
    bedCount: 1200,
    established: 1998,
  });
  storage.createHospital({
    name: "Lakeshore Hospital",
    city: "Kochi",
    address: "NH-47 Bypass, Maradu, Nettoor, Kochi 682040",
    specializations: JSON.stringify(["Fertility", "Gynecology", "Orthopedics", "Ophthalmology", "Cosmetic Surgery"]),
    rating: 4.4,
    accreditations: JSON.stringify(["NABH"]),
    description: "Lakeshore Hospital combines world-class medical care with the tranquility of Kerala's backwaters. Known for its fertility center and cosmetic surgery programs with excellent post-operative care.",
    imageUrl: null,
    bedCount: 300,
    established: 2004,
  });
  storage.createHospital({
    name: "Aster Medcity",
    city: "Kochi",
    address: "Kuttisahib Road, Near Kochi Metro, South Chittoor, Kochi 682027",
    specializations: JSON.stringify(["Cardiac Sciences", "Oncology", "Neurosciences", "Renal Sciences", "Dental"]),
    rating: 4.6,
    accreditations: JSON.stringify(["JCI", "NABH"]),
    description: "Aster Medcity is a quaternary care hospital spread across 40 acres, equipped with the latest medical technology including da Vinci robotic surgery systems and CyberKnife.",
    imageUrl: null,
    bedCount: 670,
    established: 2014,
  });

  // Bangalore (3)
  storage.createHospital({
    name: "Narayana Health City",
    city: "Bangalore",
    address: "258/A, Bommasandra Industrial Area, Hosur Road, Bangalore 560099",
    specializations: JSON.stringify(["Cardiac Sciences", "Oncology", "Orthopedics", "Organ Transplant", "Fertility"]),
    rating: 4.7,
    accreditations: JSON.stringify(["NABH", "JCI"]),
    description: "Founded by renowned cardiac surgeon Dr. Devi Shetty, Narayana Health City is a 30-acre integrated healthcare campus known for performing the highest volume of heart surgeries in the world at affordable costs.",
    imageUrl: null,
    bedCount: 3000,
    established: 2001,
  });
  storage.createHospital({
    name: "Manipal Hospital Old Airport Road",
    city: "Bangalore",
    address: "98, HAL Old Airport Road, Bangalore 560017",
    specializations: JSON.stringify(["Oncology", "Organ Transplant", "Neurosciences", "Gastroenterology", "Ophthalmology"]),
    rating: 4.6,
    accreditations: JSON.stringify(["NABH", "NABL"]),
    description: "Manipal Hospital is a flagship facility of the Manipal Health Enterprises group, offering comprehensive cancer care, bone marrow transplants, and advanced liver transplant programs.",
    imageUrl: null,
    bedCount: 600,
    established: 1991,
  });
  storage.createHospital({
    name: "Sakra World Hospital",
    city: "Bangalore",
    address: "SY No. 52/2 & 52/3, Devarabeesanahalli, Bangalore 560103",
    specializations: JSON.stringify(["Orthopedics", "Spine Surgery", "Sports Medicine", "Dental", "Cosmetic Surgery"]),
    rating: 4.5,
    accreditations: JSON.stringify(["JCI", "NABH"]),
    description: "Sakra World Hospital is a Japanese-Indian joint venture bringing Japanese precision and efficiency to Indian healthcare. Known for orthopedic excellence and minimally invasive procedures.",
    imageUrl: null,
    bedCount: 350,
    established: 2014,
  });

  // Hyderabad (3)
  storage.createHospital({
    name: "Yashoda Hospitals Secunderabad",
    city: "Hyderabad",
    address: "Behind Hari Hara Kala Bhawan, SP Road, Secunderabad 500003",
    specializations: JSON.stringify(["Cardiac Sciences", "Oncology", "Orthopedics", "Neurosciences", "Gastroenterology"]),
    rating: 4.5,
    accreditations: JSON.stringify(["NABH", "NABL"]),
    description: "Yashoda Hospitals is Hyderabad's leading multi-specialty hospital group with a strong track record in cardiac surgeries, cancer treatment, and emergency care with 24/7 trauma services.",
    imageUrl: null,
    bedCount: 500,
    established: 1989,
  });
  storage.createHospital({
    name: "AIG Hospitals",
    city: "Hyderabad",
    address: "Mindspace Road, Gachibowli, Hyderabad 500032",
    specializations: JSON.stringify(["Gastroenterology", "Hepatology", "Oncology", "Orthopedics", "Fertility"]),
    rating: 4.6,
    accreditations: JSON.stringify(["NABH", "JCI"]),
    description: "AIG Hospitals is Asia's largest gastroenterology hospital, pioneering advanced endoscopic procedures. The hospital features state-of-the-art operation theaters and a dedicated liver transplant program.",
    imageUrl: null,
    bedCount: 450,
    established: 2011,
  });
  storage.createHospital({
    name: "KIMS Hospitals",
    city: "Hyderabad",
    address: "1-8-31/1, Minister Road, Secunderabad 500003",
    specializations: JSON.stringify(["Cardiac Sciences", "Orthopedics", "Neurosciences", "Ophthalmology", "Dental", "Cosmetic Surgery"]),
    rating: 4.4,
    accreditations: JSON.stringify(["NABH"]),
    description: "Krishna Institute of Medical Sciences (KIMS) is a premier healthcare destination known for affordable cardiac care, advanced eye surgery center, and comprehensive dental treatment programs.",
    imageUrl: null,
    bedCount: 1000,
    established: 2000,
  });

  // === TREATMENTS ===
  storage.createTreatment({ name: "Coronary Artery Bypass Grafting (CABG)", category: "Cardiac", description: "Open-heart surgery to improve blood flow to the heart by creating a bypass around blocked coronary arteries.", avgCostIndia: 5500, avgCostUS: 123000, avgCostUK: 28000, avgCostCanada: 35000, duration: "5-7 days hospital, 6-8 weeks recovery", hospitalIds: JSON.stringify([1, 2, 4, 7, 10]) });
  storage.createTreatment({ name: "Heart Valve Replacement", category: "Cardiac", description: "Surgical replacement of damaged heart valves with mechanical or biological prosthetic valves.", avgCostIndia: 7000, avgCostUS: 170000, avgCostUK: 35000, avgCostCanada: 42000, duration: "7-10 days hospital, 8-12 weeks recovery", hospitalIds: JSON.stringify([1, 4, 7, 10]) });
  storage.createTreatment({ name: "Angioplasty with Stent", category: "Cardiac", description: "Minimally invasive procedure to open blocked arteries and place stents to improve blood flow.", avgCostIndia: 3500, avgCostUS: 57000, avgCostUK: 16000, avgCostCanada: 20000, duration: "1-2 days hospital, 1-2 weeks recovery", hospitalIds: JSON.stringify([1, 2, 4, 6, 7, 10]) });
  storage.createTreatment({ name: "Total Knee Replacement", category: "Orthopedic", description: "Surgical replacement of the knee joint with an artificial prosthesis to relieve pain and restore mobility.", avgCostIndia: 4500, avgCostUS: 50000, avgCostUK: 15000, avgCostCanada: 18000, duration: "4-5 days hospital, 6-8 weeks recovery", hospitalIds: JSON.stringify([3, 5, 7, 9, 12]) });
  storage.createTreatment({ name: "Total Hip Replacement", category: "Orthopedic", description: "Replacement of the hip joint with a prosthetic implant to treat severe arthritis or hip fractures.", avgCostIndia: 5000, avgCostUS: 52000, avgCostUK: 16000, avgCostCanada: 19000, duration: "4-6 days hospital, 8-10 weeks recovery", hospitalIds: JSON.stringify([3, 7, 9, 12]) });
  storage.createTreatment({ name: "Spinal Fusion Surgery", category: "Orthopedic", description: "Surgical procedure to fuse two or more vertebrae to stabilize the spine and reduce pain.", avgCostIndia: 6000, avgCostUS: 110000, avgCostUK: 25000, avgCostCanada: 30000, duration: "5-7 days hospital, 3-6 months recovery", hospitalIds: JSON.stringify([3, 9]) });
  storage.createTreatment({ name: "Chemotherapy (per cycle)", category: "Oncology", description: "Drug treatment using anti-cancer medications to destroy cancer cells. Cost per cycle varies by drug regimen.", avgCostIndia: 800, avgCostUS: 12000, avgCostUK: 4000, avgCostCanada: 5000, duration: "1-3 days per cycle, 4-6 cycles typical", hospitalIds: JSON.stringify([1, 4, 6, 7, 8, 10, 11]) });
  storage.createTreatment({ name: "Robotic Cancer Surgery", category: "Oncology", description: "Minimally invasive cancer removal using robotic surgical systems for greater precision and faster recovery.", avgCostIndia: 5500, avgCostUS: 85000, avgCostUK: 22000, avgCostCanada: 28000, duration: "3-5 days hospital, 3-4 weeks recovery", hospitalIds: JSON.stringify([1, 6, 7, 8]) });
  storage.createTreatment({ name: "IVF Treatment (single cycle)", category: "Fertility", description: "In vitro fertilization including ovarian stimulation, egg retrieval, fertilization, and embryo transfer.", avgCostIndia: 3000, avgCostUS: 23000, avgCostUK: 8000, avgCostCanada: 10000, duration: "2-3 weeks active treatment", hospitalIds: JSON.stringify([5, 7, 11]) });
  storage.createTreatment({ name: "IUI Treatment", category: "Fertility", description: "Intrauterine insemination — a less invasive fertility procedure where sperm is placed directly in the uterus.", avgCostIndia: 500, avgCostUS: 4000, avgCostUK: 1500, avgCostCanada: 2000, duration: "1-2 days procedure", hospitalIds: JSON.stringify([5, 7, 11]) });
  storage.createTreatment({ name: "Dental Implants (per tooth)", category: "Dental", description: "Titanium implant surgically placed in the jawbone to replace missing teeth with natural-looking prosthetics.", avgCostIndia: 600, avgCostUS: 5000, avgCostUK: 2500, avgCostCanada: 3500, duration: "2-3 visits over 3-6 months", hospitalIds: JSON.stringify([6, 9, 12]) });
  storage.createTreatment({ name: "Full Mouth Dental Rehabilitation", category: "Dental", description: "Complete reconstruction of the entire mouth including crowns, bridges, implants, and cosmetic dentistry.", avgCostIndia: 3500, avgCostUS: 40000, avgCostUK: 18000, avgCostCanada: 22000, duration: "1-2 weeks, multiple sessions", hospitalIds: JSON.stringify([6, 9, 12]) });
  storage.createTreatment({ name: "LASIK Eye Surgery", category: "Ophthalmology", description: "Laser-assisted vision correction surgery to treat nearsightedness, farsightedness, and astigmatism.", avgCostIndia: 1000, avgCostUS: 5500, avgCostUK: 3000, avgCostCanada: 3500, duration: "Outpatient, 1-2 days recovery", hospitalIds: JSON.stringify([5, 8, 12]) });
  storage.createTreatment({ name: "Cataract Surgery", category: "Ophthalmology", description: "Removal of the clouded natural lens and replacement with an artificial intraocular lens.", avgCostIndia: 800, avgCostUS: 6000, avgCostUK: 3500, avgCostCanada: 4000, duration: "Outpatient, 1-2 weeks full recovery", hospitalIds: JSON.stringify([5, 8, 12]) });
  storage.createTreatment({ name: "Rhinoplasty", category: "Cosmetic", description: "Surgical reshaping of the nose for cosmetic or functional improvement.", avgCostIndia: 2000, avgCostUS: 12000, avgCostUK: 6000, avgCostCanada: 8000, duration: "1-2 days hospital, 2-3 weeks recovery", hospitalIds: JSON.stringify([5, 9, 12]) });
  storage.createTreatment({ name: "Liposuction", category: "Cosmetic", description: "Surgical removal of excess fat deposits from specific areas of the body for improved contour.", avgCostIndia: 1500, avgCostUS: 8000, avgCostUK: 5000, avgCostCanada: 6500, duration: "1 day hospital, 2-4 weeks recovery", hospitalIds: JSON.stringify([5, 9, 12]) });
  storage.createTreatment({ name: "Hair Transplant (FUE)", category: "Cosmetic", description: "Follicular Unit Extraction hair transplant for natural-looking hair restoration.", avgCostIndia: 1500, avgCostUS: 15000, avgCostUK: 8000, avgCostCanada: 10000, duration: "1 day procedure, 1-2 weeks initial recovery", hospitalIds: JSON.stringify([5, 9, 12]) });

  // Seed sample inquiries for admin dashboard
  const statuses = ["New", "Contacted", "Qualified", "Converted", "Lost"];
  const sampleInquiries = [
    { fullName: "Ahmed Al-Rashid", email: "ahmed@example.com", phone: "+971501234567", country: "UAE", treatmentInterest: "Cardiac", message: "Need consultation for heart valve surgery", preferredCity: "Chennai" },
    { fullName: "Fatima Al-Sayed", email: "fatima@example.com", phone: "+96812345678", country: "Oman", treatmentInterest: "Orthopedic", message: "Looking for knee replacement options", preferredCity: "Bangalore" },
    { fullName: "Mohammed Hassan", email: "mohammed@example.com", phone: "+96521234567", country: "Kuwait", treatmentInterest: "Oncology", message: "Seeking second opinion for cancer treatment", preferredCity: "Kochi" },
    { fullName: "Sarah Johnson", email: "sarah@example.com", phone: "+971509876543", country: "UAE", treatmentInterest: "Fertility", message: "Interested in IVF treatment", preferredCity: "Bangalore" },
    { fullName: "Oluwaseun Adeyemi", email: "olu@example.com", phone: "+2348012345678", country: "Nigeria", treatmentInterest: "Dental", message: "Full mouth rehabilitation needed", preferredCity: "Hyderabad" },
    { fullName: "Khalid Al-Mutairi", email: "khalid@example.com", phone: "+966512345678", country: "Saudi Arabia", treatmentInterest: "Cosmetic", message: "Hair transplant consultation", preferredCity: "Bangalore" },
    { fullName: "Priya Nair", email: "priya@example.com", phone: "+97433445566", country: "Qatar", treatmentInterest: "Ophthalmology", message: "LASIK surgery enquiry", preferredCity: "Kochi" },
    { fullName: "David Mwangi", email: "david@example.com", phone: "+254712345678", country: "Kenya", treatmentInterest: "Cardiac", message: "Bypass surgery cost estimate", preferredCity: "Chennai" },
  ];

  sampleInquiries.forEach((inq, i) => {
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const status = statuses[i % statuses.length];
    (storage as MemoryStorage).insertInquiryDirect({
      ...inq,
      status,
      createdAt: date.toISOString(),
    });
  });

  console.log("Database seeded successfully!");
}
