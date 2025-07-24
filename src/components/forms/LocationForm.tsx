import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

// Pincode range mapping for Indian states (based on India Post data)
const pincodeStateMapping: { [key: string]: string[] } = {
  'Andhra Pradesh': ['515', '516', '517', '518', '521', '522', '523', '524', '525', '526', '530', '531', '532', '533', '534', '535'],
  'Arunachal Pradesh': ['790', '791', '792'],
  'Assam': ['781', '782', '783', '784', '785', '786', '787', '788'],
  'Bihar': ['800', '801', '802', '803', '804', '805', '811', '812', '813', '814', '815', '816', '821', '822', '823', '824', '825', '831', '841', '842', '843', '844', '845', '846', '847', '848', '849', '851', '852', '853', '854', '855', '856'],
  'Chhattisgarh': ['490', '491', '492', '493', '494', '495', '496', '497'],
  'Goa': ['403'],
  'Gujarat': ['360', '361', '362', '363', '364', '365', '370', '380', '381', '382', '383', '384', '385', '387', '388', '389', '390', '391', '392', '393', '394', '395', '396'],
  'Haryana': ['121', '122', '123', '124', '125', '126', '127', '128', '129', '131', '132', '133', '134', '135', '136'],
  'Himachal Pradesh': ['171', '172', '173', '174', '175', '176', '177'],
  'Jharkhand': ['814', '815', '825', '826', '828', '829', '831', '832', '833', '834', '835'],
  'Karnataka': ['560', '561', '562', '563', '564', '565', '566', '570', '571', '572', '573', '574', '575', '576', '577', '580', '581', '582', '583', '584', '585', '586', '587', '590', '591'],
  'Kerala': ['670', '671', '672', '673', '674', '675', '676', '678', '679', '680', '681', '682', '683', '684', '685', '686', '687', '688', '689', '690', '691', '692', '695'],
  'Madhya Pradesh': ['450', '451', '452', '453', '454', '455', '456', '457', '458', '459', '460', '461', '462', '463', '464', '465', '466', '467', '468', '469', '470', '471', '472', '473', '474', '480', '481', '482', '483', '484', '485', '486', '487', '488'],
  'Maharashtra': ['400', '401', '402', '403', '404', '410', '411', '412', '413', '414', '415', '416', '421', '422', '423', '424', '425', '431', '440', '441', '442', '443', '444', '445', '446', '447', '448', '449'],
  'Manipur': ['795'],
  'Meghalaya': ['793', '794'],
  'Mizoram': ['796'],
  'Nagaland': ['797', '798'],
  'Odisha': ['750', '751', '752', '753', '754', '755', '756', '757', '758', '759', '760', '761', '762', '763', '764', '765', '766', '767', '768', '769'],
  'Punjab': ['140', '141', '142', '143', '144', '145', '146', '147', '148', '149', '151', '152', '153', '154', '155', '156', '160', '161'],
  'Rajasthan': ['301', '302', '303', '304', '305', '306', '307', '311', '312', '313', '314', '321', '322', '323', '324', '325', '326', '327', '331', '332', '333', '334', '335', '341', '342', '343', '344', '345'],
  'Sikkim': ['737'],
  'Tamil Nadu': ['600', '601', '602', '603', '604', '605', '606', '607', '608', '609', '610', '611', '612', '613', '614', '620', '621', '622', '623', '624', '625', '626', '627', '628', '629', '630', '631', '632', '633', '634', '635', '636', '637', '638', '639', '641', '642', '643'],
  'Telangana': ['500', '501', '502', '503', '504', '505', '506', '507', '508', '509'],
  'Tripura': ['799'],
  'Uttar Pradesh': ['201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '214', '215', '220', '221', '222', '223', '224', '225', '226', '227', '228', '229', '230', '231', '232', '233', '234', '240', '241', '242', '243', '244', '245', '246', '247', '248', '249', '250', '251', '252', '253', '254', '260', '261', '262', '263', '264', '270', '271', '272', '273', '274', '275', '276', '277', '280', '281', '282', '283', '284', '285'],
  'Uttarakhand': ['246', '247', '248', '249', '263', '264'],
  'West Bengal': ['700', '701', '702', '711', '712', '713', '721', '722', '723', '731', '732', '733', '734', '735', '736', '741', '742', '743', '744', '751', '752', '755'],
  'Delhi': ['110', '111'],
  'Chandigarh': ['160'],
  'Puducherry': ['605', '609']
};

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal', 'Delhi', 'Chandigarh', 'Puducherry'
];

const cityMapping: { [key: string]: string[] } = {
  'Andhra Pradesh': ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'],
  'Arunachal Pradesh': ['Anjaw', 'Changlang', 'Dibang Valley', 'East Kameng', 'East Siang', 'Kamle', 'Kra Daadi', 'Kurung Kumey', 'Lepa Rada', 'Lohit', 'Longding', 'Lower Dibang Valley', 'Lower Siang', 'Lower Subansiri', 'Namsai', 'Pakke Kessang', 'Papum Pare', 'Shi Yomi', 'Tawang', 'Tirap', 'Upper Siang', 'Upper Subansiri', 'West Kameng', 'West Siang'],
  'Assam': ['Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Dima Hasao', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'],
  'Bihar': ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran'],
  'Chhattisgarh': ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Kanker', 'Kondagaon', 'Korba', 'Koriya', 'Mahasamund', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja'],
  'Goa': ['North Goa', 'South Goa'],
  'Gujarat': ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udepur', 'Dahod', 'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'],
  'Haryana': ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],
  'Himachal Pradesh': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'],
  'Jharkhand': ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahebganj', 'Seraikela Kharsawan', 'Simdega', 'West Singhbhum'],
  'Karnataka': ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikballapur', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'],
  'Kerala': ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'],
  'Madhya Pradesh': ['Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Niwari', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'],
  'Maharashtra': ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'],
  'Manipur': ['Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul'],
  'Meghalaya': ['East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'],
  'Mizoram': ['Aizawl', 'Champhai', 'Hnahthial', 'Kolasib', 'Khawzawl', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Saitual', 'Serchhip'],
  'Nagaland': ['Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Noklak', 'Peren', 'Phek', 'Tuensang', 'Wokha', 'Zunheboto'],
  'Odisha': ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Sonepur', 'Sundargarh'],
  'Punjab': ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Malerkotla', 'Mansa', 'Moga', 'Muktsar', 'Nawanshahr', 'Pathankot', 'Patiala', 'Rupnagar', 'Sangrur', 'Tarn Taran'],
  'Rajasthan': ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur'],
  'Sikkim': ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'],
  'Tamil Nadu': ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'],
  'Telangana': ['Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhoopalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Komaram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal Rural', 'Warangal Urban', 'Yadadri Bhuvanagiri'],
  'Tripura': ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura'],
  'Uttar Pradesh': ['Agra', 'Aligarh', 'Prayagraj', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Ayodhya', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kushinagar', 'Lakhimpur Kheri', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shrawasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'],
  'Uttarakhand': ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'],
  'West Bengal': ['Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur'],
  'Delhi': ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
  'Chandigarh': ['Chandigarh'],
  'Puducherry': ['Karaikal', 'Mahe', 'Puducherry', 'Yanam']
};

// Pincode to city mapping for major cities (sample data for demonstration)
const pincodeCityMapping: { [key: string]: string } = {
  // Mumbai
  '400001': 'Mumbai City', '400002': 'Mumbai City', '400003': 'Mumbai City', '400004': 'Mumbai City',
  '400005': 'Mumbai City', '400006': 'Mumbai City', '400007': 'Mumbai City', '400008': 'Mumbai City',
  '400009': 'Mumbai City', '400010': 'Mumbai City', '400011': 'Mumbai City', '400012': 'Mumbai City',
  '400013': 'Mumbai City', '400014': 'Mumbai City', '400015': 'Mumbai City', '400016': 'Mumbai City',
  '400017': 'Mumbai City', '400018': 'Mumbai City', '400019': 'Mumbai City', '400020': 'Mumbai City',
  '400021': 'Mumbai City', '400022': 'Mumbai City', '400023': 'Mumbai City', '400024': 'Mumbai City',
  '400025': 'Mumbai City', '400026': 'Mumbai City', '400027': 'Mumbai City', '400028': 'Mumbai City',
  '400029': 'Mumbai City', '400030': 'Mumbai City', '400031': 'Mumbai City', '400032': 'Mumbai City',
  '400033': 'Mumbai City', '400034': 'Mumbai City', '400035': 'Mumbai City', '400036': 'Mumbai City',
  '400037': 'Mumbai City', '400038': 'Mumbai City', '400039': 'Mumbai City', '400040': 'Mumbai City',
  '400050': 'Mumbai Suburban', '400051': 'Mumbai Suburban', '400052': 'Mumbai Suburban', '400053': 'Mumbai Suburban',
  '400054': 'Mumbai Suburban', '400055': 'Mumbai Suburban', '400056': 'Mumbai Suburban', '400057': 'Mumbai Suburban',
  '400058': 'Mumbai Suburban', '400059': 'Mumbai Suburban', '400060': 'Mumbai Suburban', '400061': 'Mumbai Suburban',
  '400062': 'Mumbai Suburban', '400063': 'Mumbai Suburban', '400064': 'Mumbai Suburban', '400065': 'Mumbai Suburban',
  '400066': 'Mumbai Suburban', '400067': 'Mumbai Suburban', '400068': 'Mumbai Suburban', '400069': 'Mumbai Suburban',
  '400070': 'Mumbai Suburban', '400071': 'Mumbai Suburban', '400072': 'Mumbai Suburban', '400074': 'Mumbai Suburban',
  '400075': 'Mumbai Suburban', '400076': 'Mumbai Suburban', '400077': 'Mumbai Suburban', '400078': 'Mumbai Suburban',
  '400079': 'Mumbai Suburban', '400080': 'Mumbai Suburban', '400081': 'Mumbai Suburban', '400082': 'Mumbai Suburban',
  '400083': 'Mumbai Suburban', '400084': 'Mumbai Suburban', '400085': 'Mumbai Suburban', '400086': 'Mumbai Suburban',
  '400087': 'Mumbai Suburban', '400088': 'Mumbai Suburban', '400089': 'Mumbai Suburban', '400090': 'Mumbai Suburban',
  '400091': 'Mumbai Suburban', '400092': 'Mumbai Suburban', '400093': 'Mumbai Suburban', '400094': 'Mumbai Suburban',
  '400095': 'Mumbai Suburban', '400096': 'Mumbai Suburban', '400097': 'Mumbai Suburban', '400098': 'Mumbai Suburban',
  '400099': 'Mumbai Suburban', '400101': 'Thane', '400102': 'Thane', '400103': 'Thane', '400104': 'Thane',
  '400105': 'Thane', '400601': 'Thane', '400602': 'Thane', '400603': 'Thane', '400604': 'Thane',
  '400605': 'Thane', '400606': 'Thane', '400607': 'Thane', '400608': 'Thane', '400609': 'Thane',
  '400610': 'Thane', '400611': 'Thane', '400612': 'Thane', '400613': 'Thane', '400614': 'Thane',
  
  // Delhi
  '110001': 'Central Delhi', '110002': 'Central Delhi', '110003': 'Central Delhi', '110004': 'Central Delhi',
  '110005': 'Central Delhi', '110006': 'Central Delhi', '110007': 'Central Delhi', '110008': 'Central Delhi',
  '110009': 'Central Delhi', '110010': 'Central Delhi', '110011': 'Central Delhi', '110012': 'Central Delhi',
  '110013': 'Central Delhi', '110014': 'Central Delhi', '110015': 'North Delhi', '110016': 'North Delhi',
  '110017': 'North Delhi', '110018': 'North Delhi', '110019': 'North Delhi', '110020': 'North Delhi',
  '110021': 'New Delhi', '110022': 'New Delhi', '110023': 'New Delhi', '110024': 'South West Delhi',
  '110025': 'South Delhi', '110026': 'South Delhi', '110027': 'South Delhi', '110028': 'South Delhi',
  '110029': 'South Delhi', '110030': 'South Delhi', '110031': 'North West Delhi', '110032': 'North West Delhi',
  '110033': 'North West Delhi', '110034': 'North West Delhi', '110035': 'North West Delhi', '110036': 'North West Delhi',
  '110037': 'North West Delhi', '110038': 'North West Delhi', '110039': 'North West Delhi', '110040': 'North West Delhi',
  '110041': 'North West Delhi', '110042': 'North West Delhi', '110043': 'North West Delhi', '110044': 'South Delhi',
  '110045': 'South Delhi', '110046': 'South Delhi', '110047': 'South Delhi', '110048': 'South Delhi',
  '110049': 'South Delhi', '110050': 'South Delhi', '110051': 'South Delhi', '110052': 'South Delhi',
  '110053': 'South Delhi', '110054': 'South Delhi', '110055': 'South Delhi', '110056': 'South Delhi',
  '110057': 'South Delhi', '110058': 'South Delhi', '110059': 'South Delhi', '110060': 'South Delhi',
  '110061': 'South Delhi', '110062': 'South Delhi', '110063': 'South Delhi', '110064': 'South Delhi',
  '110065': 'South Delhi', '110066': 'South Delhi', '110067': 'South Delhi', '110068': 'South Delhi',
  '110070': 'South Delhi', '110071': 'South Delhi', '110072': 'South Delhi', '110073': 'South Delhi',
  '110074': 'South Delhi', '110075': 'South Delhi', '110076': 'South Delhi', '110077': 'South Delhi',
  '110078': 'South Delhi', '110080': 'South Delhi', '110081': 'South Delhi', '110082': 'South Delhi',
  '110083': 'South Delhi', '110084': 'South Delhi', '110085': 'South Delhi', '110086': 'South Delhi',
  '110087': 'South Delhi', '110088': 'South Delhi', '110089': 'South Delhi', '110091': 'East Delhi',
  '110092': 'East Delhi', '110093': 'East Delhi', '110094': 'East Delhi', '110095': 'East Delhi',
  '110096': 'East Delhi',
  
  // Bangalore
  '560001': 'Bengaluru Urban', '560002': 'Bengaluru Urban', '560003': 'Bengaluru Urban', '560004': 'Bengaluru Urban',
  '560005': 'Bengaluru Urban', '560006': 'Bengaluru Urban', '560007': 'Bengaluru Urban', '560008': 'Bengaluru Urban',
  '560009': 'Bengaluru Urban', '560010': 'Bengaluru Urban', '560011': 'Bengaluru Urban', '560012': 'Bengaluru Urban',
  '560013': 'Bengaluru Urban', '560014': 'Bengaluru Urban', '560015': 'Bengaluru Urban', '560016': 'Bengaluru Urban',
  '560017': 'Bengaluru Urban', '560018': 'Bengaluru Urban', '560019': 'Bengaluru Urban', '560020': 'Bengaluru Urban',
  '560021': 'Bengaluru Urban', '560022': 'Bengaluru Urban', '560023': 'Bengaluru Urban', '560024': 'Bengaluru Urban',
  '560025': 'Bengaluru Urban', '560026': 'Bengaluru Urban', '560027': 'Bengaluru Urban', '560028': 'Bengaluru Urban',
  '560029': 'Bengaluru Urban', '560030': 'Bengaluru Urban', '560031': 'Bengaluru Urban', '560032': 'Bengaluru Urban',
  '560033': 'Bengaluru Urban', '560034': 'Bengaluru Urban', '560035': 'Bengaluru Urban', '560036': 'Bengaluru Urban',
  '560037': 'Bengaluru Urban', '560038': 'Bengaluru Urban', '560039': 'Bengaluru Urban', '560040': 'Bengaluru Urban',
  '560041': 'Bengaluru Urban', '560042': 'Bengaluru Urban', '560043': 'Bengaluru Urban', '560044': 'Bengaluru Urban',
  '560045': 'Bengaluru Urban', '560046': 'Bengaluru Urban', '560047': 'Bengaluru Urban', '560048': 'Bengaluru Urban',
  '560049': 'Bengaluru Urban', '560050': 'Bengaluru Urban', '560051': 'Bengaluru Urban', '560052': 'Bengaluru Urban',
  '560053': 'Bengaluru Urban', '560054': 'Bengaluru Urban', '560055': 'Bengaluru Urban', '560056': 'Bengaluru Urban',
  '560057': 'Bengaluru Urban', '560058': 'Bengaluru Urban', '560059': 'Bengaluru Urban', '560060': 'Bengaluru Urban',
  '560061': 'Bengaluru Urban', '560062': 'Bengaluru Urban', '560063': 'Bengaluru Urban', '560064': 'Bengaluru Urban',
  '560065': 'Bengaluru Urban', '560066': 'Bengaluru Urban', '560067': 'Bengaluru Urban', '560068': 'Bengaluru Urban',
  '560069': 'Bengaluru Urban', '560070': 'Bengaluru Urban', '560071': 'Bengaluru Urban', '560072': 'Bengaluru Urban',
  '560073': 'Bengaluru Urban', '560074': 'Bengaluru Urban', '560075': 'Bengaluru Urban', '560076': 'Bengaluru Urban',
  '560077': 'Bengaluru Urban', '560078': 'Bengaluru Urban', '560079': 'Bengaluru Urban', '560080': 'Bengaluru Urban',
  '560081': 'Bengaluru Urban', '560082': 'Bengaluru Urban', '560083': 'Bengaluru Urban', '560084': 'Bengaluru Urban',
  '560085': 'Bengaluru Urban', '560086': 'Bengaluru Urban', '560087': 'Bengaluru Urban', '560088': 'Bengaluru Urban',
  '560089': 'Bengaluru Urban', '560090': 'Bengaluru Urban', '560091': 'Bengaluru Urban', '560092': 'Bengaluru Urban',
  '560093': 'Bengaluru Urban', '560094': 'Bengaluru Urban', '560095': 'Bengaluru Urban', '560096': 'Bengaluru Urban',
  '560097': 'Bengaluru Urban', '560098': 'Bengaluru Urban', '560099': 'Bengaluru Urban', '560100': 'Bengaluru Urban',
  
  // Chennai
  '600001': 'Chennai', '600002': 'Chennai', '600003': 'Chennai', '600004': 'Chennai',
  '600005': 'Chennai', '600006': 'Chennai', '600007': 'Chennai', '600008': 'Chennai',
  '600009': 'Chennai', '600010': 'Chennai', '600011': 'Chennai', '600012': 'Chennai',
  '600013': 'Chennai', '600014': 'Chennai', '600015': 'Chennai', '600016': 'Chennai',
  '600017': 'Chennai', '600018': 'Chennai', '600019': 'Chennai', '600020': 'Chennai',
  '600021': 'Chennai', '600022': 'Chennai', '600023': 'Chennai', '600024': 'Chennai',
  '600025': 'Chennai', '600026': 'Chennai', '600027': 'Chennai', '600028': 'Chennai',
  '600029': 'Chennai', '600030': 'Chennai', '600031': 'Chennai', '600032': 'Chennai',
  '600033': 'Chennai', '600034': 'Chennai', '600035': 'Chennai', '600036': 'Chennai',
  '600037': 'Chennai', '600038': 'Chennai', '600039': 'Chennai', '600040': 'Chennai',
  '600041': 'Chennai', '600042': 'Chennai', '600043': 'Chennai', '600044': 'Chennai',
  '600045': 'Chennai', '600046': 'Chennai', '600047': 'Chennai', '600048': 'Chennai',
  '600049': 'Chennai', '600050': 'Chennai', '600051': 'Chennai', '600052': 'Chennai',
  '600053': 'Chennai', '600054': 'Chennai', '600055': 'Chennai', '600056': 'Chennai',
  '600057': 'Chennai', '600058': 'Chennai', '600059': 'Chennai', '600060': 'Chennai',
  '600061': 'Chennai', '600062': 'Chennai', '600063': 'Chennai', '600064': 'Chennai',
  '600065': 'Chennai', '600066': 'Chennai', '600067': 'Chennai', '600068': 'Chennai',
  '600069': 'Chennai', '600070': 'Chennai', '600071': 'Chennai', '600072': 'Chennai',
  '600073': 'Chennai', '600074': 'Chennai', '600075': 'Chennai', '600076': 'Chennai',
  '600077': 'Chennai', '600078': 'Chennai', '600079': 'Chennai', '600080': 'Chennai',
  '600081': 'Chennai', '600082': 'Chennai', '600083': 'Chennai', '600084': 'Chennai',
  '600085': 'Chennai', '600086': 'Chennai', '600087': 'Chennai', '600088': 'Chennai',
  '600089': 'Chennai', '600090': 'Chennai', '600091': 'Chennai', '600092': 'Chennai',
  '600093': 'Chennai', '600094': 'Chennai', '600095': 'Chennai', '600096': 'Chennai',
  '600097': 'Chennai', '600098': 'Chennai', '600099': 'Chennai', '600100': 'Chennai',
  
  // Hyderabad
  '500001': 'Hyderabad', '500002': 'Hyderabad', '500003': 'Hyderabad', '500004': 'Hyderabad',
  '500005': 'Hyderabad', '500006': 'Hyderabad', '500007': 'Hyderabad', '500008': 'Hyderabad',
  '500009': 'Hyderabad', '500010': 'Hyderabad', '500011': 'Hyderabad', '500012': 'Hyderabad',
  '500013': 'Hyderabad', '500014': 'Hyderabad', '500015': 'Hyderabad', '500016': 'Hyderabad',
  '500017': 'Hyderabad', '500018': 'Hyderabad', '500019': 'Hyderabad', '500020': 'Hyderabad',
  '500021': 'Hyderabad', '500022': 'Hyderabad', '500023': 'Hyderabad', '500024': 'Hyderabad',
  '500025': 'Hyderabad', '500026': 'Hyderabad', '500027': 'Hyderabad', '500028': 'Hyderabad',
  '500029': 'Hyderabad', '500030': 'Hyderabad', '500031': 'Hyderabad', '500032': 'Hyderabad',
  '500033': 'Hyderabad', '500034': 'Hyderabad', '500035': 'Hyderabad', '500036': 'Hyderabad',
  '500037': 'Hyderabad', '500038': 'Hyderabad', '500039': 'Hyderabad', '500040': 'Hyderabad',
  '500041': 'Hyderabad', '500042': 'Hyderabad', '500043': 'Hyderabad', '500044': 'Hyderabad',
  '500045': 'Hyderabad', '500046': 'Hyderabad', '500047': 'Hyderabad', '500048': 'Hyderabad',
  '500049': 'Hyderabad', '500050': 'Hyderabad', '500051': 'Hyderabad', '500052': 'Hyderabad',
  '500053': 'Hyderabad', '500054': 'Hyderabad', '500055': 'Hyderabad', '500056': 'Hyderabad',
  '500057': 'Hyderabad', '500058': 'Hyderabad', '500059': 'Hyderabad', '500060': 'Hyderabad',
  '500061': 'Hyderabad', '500062': 'Hyderabad', '500063': 'Hyderabad', '500064': 'Hyderabad',
  '500065': 'Hyderabad', '500066': 'Hyderabad', '500067': 'Hyderabad', '500068': 'Hyderabad',
  '500069': 'Hyderabad', '500070': 'Hyderabad', '500071': 'Hyderabad', '500072': 'Hyderabad',
  '500073': 'Hyderabad', '500074': 'Hyderabad', '500075': 'Hyderabad', '500076': 'Hyderabad',
  '500077': 'Hyderabad', '500078': 'Hyderabad', '500079': 'Hyderabad', '500080': 'Hyderabad',
  '500081': 'Hyderabad', '500082': 'Hyderabad', '500083': 'Hyderabad', '500084': 'Hyderabad',
  '500085': 'Hyderabad', '500086': 'Hyderabad', '500087': 'Hyderabad', '500088': 'Hyderabad',
  '500089': 'Hyderabad', '500090': 'Hyderabad', '500091': 'Hyderabad', '500092': 'Hyderabad',
  '500093': 'Hyderabad', '500094': 'Hyderabad', '500095': 'Hyderabad', '500096': 'Hyderabad',
  '500097': 'Hyderabad', '500098': 'Hyderabad', '500099': 'Hyderabad', '500100': 'Hyderabad',
  
  // Pune
  '411001': 'Pune', '411002': 'Pune', '411003': 'Pune', '411004': 'Pune',
  '411005': 'Pune', '411006': 'Pune', '411007': 'Pune', '411008': 'Pune',
  '411009': 'Pune', '411010': 'Pune', '411011': 'Pune', '411012': 'Pune',
  '411013': 'Pune', '411014': 'Pune', '411015': 'Pune', '411016': 'Pune',
  '411017': 'Pune', '411018': 'Pune', '411019': 'Pune', '411020': 'Pune',
  '411021': 'Pune', '411022': 'Pune', '411023': 'Pune', '411024': 'Pune',
  '411025': 'Pune', '411026': 'Pune', '411027': 'Pune', '411028': 'Pune',
  '411029': 'Pune', '411030': 'Pune', '411031': 'Pune', '411032': 'Pune',
  '411033': 'Pune', '411034': 'Pune', '411035': 'Pune', '411036': 'Pune',
  '411037': 'Pune', '411038': 'Pune', '411039': 'Pune', '411040': 'Pune',
  '411041': 'Pune', '411042': 'Pune', '411043': 'Pune', '411044': 'Pune',
  '411045': 'Pune', '411046': 'Pune', '411047': 'Pune', '411048': 'Pune',
  '411049': 'Pune', '411050': 'Pune', '411051': 'Pune', '411052': 'Pune',
  '411057': 'Pune', '411058': 'Pune', '411060': 'Pune', '411061': 'Pune',
  
  // Kolkata
  '700001': 'Kolkata', '700002': 'Kolkata', '700003': 'Kolkata', '700004': 'Kolkata',
  '700005': 'Kolkata', '700006': 'Kolkata', '700007': 'Kolkata', '700008': 'Kolkata',
  '700009': 'Kolkata', '700010': 'Kolkata', '700011': 'Kolkata', '700012': 'Kolkata',
  '700013': 'Kolkata', '700014': 'Kolkata', '700015': 'Kolkata', '700016': 'Kolkata',
  '700017': 'Kolkata', '700018': 'Kolkata', '700019': 'Kolkata', '700020': 'Kolkata',
  '700021': 'Kolkata', '700022': 'Kolkata', '700023': 'Kolkata', '700024': 'Kolkata',
  '700025': 'Kolkata', '700026': 'Kolkata', '700027': 'Kolkata', '700028': 'Kolkata',
  '700029': 'Kolkata', '700030': 'Kolkata', '700031': 'Kolkata', '700032': 'Kolkata',
  '700033': 'Kolkata', '700034': 'Kolkata', '700035': 'Kolkata', '700036': 'Kolkata',
  '700037': 'Kolkata', '700038': 'Kolkata', '700039': 'Kolkata', '700040': 'Kolkata',
  '700041': 'Kolkata', '700042': 'Kolkata', '700043': 'Kolkata', '700044': 'Kolkata',
  '700045': 'Kolkata', '700046': 'Kolkata', '700047': 'Kolkata', '700048': 'Kolkata',
  '700049': 'Kolkata', '700050': 'Kolkata', '700051': 'Kolkata', '700052': 'Kolkata',
  '700053': 'Kolkata', '700054': 'Kolkata', '700055': 'Kolkata', '700056': 'Kolkata',
  '700057': 'Kolkata', '700058': 'Kolkata', '700059': 'Kolkata', '700060': 'Kolkata',
  '700061': 'Kolkata', '700062': 'Kolkata', '700063': 'Kolkata', '700064': 'Kolkata',
  '700065': 'Kolkata', '700066': 'Kolkata', '700067': 'Kolkata', '700068': 'Kolkata',
  '700069': 'Kolkata', '700070': 'Kolkata', '700071': 'Kolkata', '700072': 'Kolkata',
  '700073': 'Kolkata', '700074': 'Kolkata', '700075': 'Kolkata', '700076': 'Kolkata',
  '700077': 'Kolkata', '700078': 'Kolkata', '700079': 'Kolkata', '700080': 'Kolkata',
  '700081': 'Kolkata', '700082': 'Kolkata', '700083': 'Kolkata', '700084': 'Kolkata',
  '700085': 'Kolkata', '700086': 'Kolkata', '700087': 'Kolkata', '700088': 'Kolkata',
  '700089': 'Kolkata', '700090': 'Kolkata', '700091': 'Kolkata', '700092': 'Kolkata',
  '700093': 'Kolkata', '700094': 'Kolkata', '700095': 'Kolkata', '700096': 'Kolkata',
  '700097': 'Kolkata', '700098': 'Kolkata', '700099': 'Kolkata', '700100': 'Kolkata',
  
  // Add more major cities as needed...
  // Ahmedabad
  '380001': 'Ahmedabad', '380002': 'Ahmedabad', '380003': 'Ahmedabad', '380004': 'Ahmedabad',
  '380005': 'Ahmedabad', '380006': 'Ahmedabad', '380007': 'Ahmedabad', '380008': 'Ahmedabad',
  '380009': 'Ahmedabad', '380010': 'Ahmedabad', '380011': 'Ahmedabad', '380012': 'Ahmedabad',
  '380013': 'Ahmedabad', '380014': 'Ahmedabad', '380015': 'Ahmedabad', '380016': 'Ahmedabad',
  '380017': 'Ahmedabad', '380018': 'Ahmedabad', '380019': 'Ahmedabad', '380020': 'Ahmedabad',
  '380021': 'Ahmedabad', '380022': 'Ahmedabad', '380023': 'Ahmedabad', '380024': 'Ahmedabad',
  '380025': 'Ahmedabad', '380026': 'Ahmedabad', '380027': 'Ahmedabad', '380028': 'Ahmedabad',
  '380029': 'Ahmedabad', '380030': 'Ahmedabad', '380031': 'Ahmedabad', '380032': 'Ahmedabad',
  '380033': 'Ahmedabad', '380034': 'Ahmedabad', '380035': 'Ahmedabad', '380036': 'Ahmedabad',
  '380037': 'Ahmedabad', '380038': 'Ahmedabad', '380039': 'Ahmedabad', '380040': 'Ahmedabad',
  '380041': 'Ahmedabad', '380042': 'Ahmedabad', '380043': 'Ahmedabad', '380044': 'Ahmedabad',
  '380045': 'Ahmedabad', '380046': 'Ahmedabad', '380047': 'Ahmedabad', '380048': 'Ahmedabad',
  '380049': 'Ahmedabad', '380050': 'Ahmedabad', '380051': 'Ahmedabad', '380052': 'Ahmedabad',
  '380053': 'Ahmedabad', '380054': 'Ahmedabad', '380055': 'Ahmedabad', '380056': 'Ahmedabad',
  '380057': 'Ahmedabad', '380058': 'Ahmedabad', '380059': 'Ahmedabad', '380060': 'Ahmedabad',
  '380061': 'Ahmedabad', '380062': 'Ahmedabad', '380063': 'Ahmedabad'
};

interface LocationFormProps {
  data: {
    state: string;
    city: string;
    pincode: string;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
}

export const LocationForm: React.FC<LocationFormProps> = ({ data, onUpdate, onNext }) => {
  const handleStateChange = (state: string) => {
    onUpdate({ ...data, state, city: '', pincode: '' });
  };

  const validatePincode = (pincode: string, state: string): boolean => {
    if (pincode.length !== 6 || !state) return false;
    const pincodePrefix = pincode.substring(0, 3);
    return pincodeStateMapping[state]?.includes(pincodePrefix) || false;
  };

  const handlePincodeChange = (pincode: string) => {
    // Auto-select state and city based on pincode
    if (pincode.length === 6) {
      const pincodePrefix = pincode.substring(0, 3);
      
      // Auto-select state if not already selected
      let selectedState = data.state;
      if (!selectedState) {
        selectedState = Object.keys(pincodeStateMapping).find(state => 
          pincodeStateMapping[state].includes(pincodePrefix)
        ) || '';
      }
      
      // Auto-select city based on exact pincode mapping
      const autoSelectedCity = pincodeCityMapping[pincode] || '';
      
      // If we found both state and city, update them
      if (selectedState && autoSelectedCity) {
        onUpdate({ ...data, state: selectedState, city: autoSelectedCity, pincode });
        return;
      }
      
      // If we only found state, update it and clear city
      if (selectedState && selectedState !== data.state) {
        onUpdate({ ...data, state: selectedState, city: '', pincode });
        return;
      }
    } else if (pincode.length >= 3 && !data.state) {
      // Auto-select state based on prefix if not already selected
      const pincodePrefix = pincode.substring(0, 3);
      const matchingState = Object.keys(pincodeStateMapping).find(state => 
        pincodeStateMapping[state].includes(pincodePrefix)
      );
      if (matchingState) {
        onUpdate({ ...data, state: matchingState, city: '', pincode });
        return;
      }
    }
    
    onUpdate({ ...data, pincode });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext();
    }
  };

  const isValidPincode = data.pincode.length === 6 && validatePincode(data.pincode, data.state);
  const isValid = data.state && data.city && isValidPincode;

  const getPincodeError = (): string | null => {
    if (data.pincode.length === 6 && data.state && !isValidPincode) {
      return `PIN code ${data.pincode} does not belong to ${data.state}`;
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-card to-muted/30">
        <CardContent className="space-y-4 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Select value={data.state} onValueChange={handleStateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Select 
                value={data.city} 
                onValueChange={(city) => onUpdate({ ...data, city })}
                disabled={!data.state}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your city" />
                </SelectTrigger>
                <SelectContent>
                  {data.state && cityMapping[data.state]?.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  )) || (
                    <SelectItem value="other">Other</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pincode">PIN Code *</Label>
            <Input
              id="pincode"
              type="text"
              placeholder="Enter 6-digit PIN code"
              value={data.pincode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                handlePincodeChange(value);
              }}
              maxLength={6}
              className={`max-w-xs ${getPincodeError() ? 'border-destructive' : ''}`}
            />
            {getPincodeError() && (
              <p className="text-sm text-destructive">{getPincodeError()}</p>
            )}
            {data.pincode.length === 6 && isValidPincode && (
              <p className="text-sm text-green-600">✓ PIN code verified for {data.state}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={!isValid}
          className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-300"
        >
          Continue to Vehicle Details
        </Button>
      </div>
    </form>
  );
};