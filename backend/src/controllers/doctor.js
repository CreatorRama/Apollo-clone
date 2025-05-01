import Doctor from '../models/doctorModel.js'


const listAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({})
            .sort({ featured: -1, doctorOfTheHour: -1, 'fees.amount': 1 });
        
        res.status(200).json({
            success: true,
            data: {
                doctors
            }
        });
    } catch (error) {
        console.error('Error fetching all doctors:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch doctors',
            error: error.message
        });
    }
};

const listDoctors = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            specialty,
            experience,
            fees,
            language,
            facility,
            consultMode,
            search
        } = req.query;

       
        const skip = (parseInt(page) - 1) * parseInt(limit);

       
        const filter = {};

        
        if (specialty) {
            filter.specialty = specialty;
        }

        if (experience) {
            filter['experience.category'] = experience;
        }

        if (fees) {
            filter['fees.category'] = fees;
        }

        if (language) {
            const languagesArray = language.split(',');
            filter.languages = { $in: languagesArray };
          }
        if (facility) {
            filter.facility = facility;
        }

        
        if (consultMode) {
            if (consultMode === 'online') {
                filter['availability.online.available'] = true;
            } else if (consultMode === 'hospital') {
                filter['availability.hospital.available'] = true;
            }
        }

        
        if (search) {
            filter.$text = { $search: search };
        }

        console.log('Filter:', filter);
        console.log('Skip:', skip);
        console.log('Limit:', parseInt(limit));
        
        const doctors = await Doctor.find(filter)
          .sort({ featured: -1, doctorOfTheHour: -1, 'fees.amount': 1 })
          .skip(skip)
          .limit(parseInt(limit));
        
          
          const total = await Doctor.countDocuments(filter);
          console.log("done seeta ram")
          
          console.log('Found doctors:', doctors.length,total);
        res.status(200).json({
            success: true,
            data: {
                doctors,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    pages: Math.ceil(total / parseInt(limit))
                }
            }
        });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        console.log("not done seeta ram")

        res.status(500).json({
            success: false,
            message: 'Failed to fetch doctors',
            error: error.message
        });
    }
};


const addDoctor = async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        console.log("done seeta ram")
        res.status(201).json({
            success: true,
            message: 'Doctor added successfully',
            data: doctor
        });
    } catch (error) {
        console.error('Error adding doctor:', error);
        console.log("not done seeta ram")

        res.status(400).json({
            success: false,
            message: 'Failed to add doctor',
            error: error.message
        });
    }
};



export default {
    addDoctor,
    listDoctors,
    listAllDoctors
}