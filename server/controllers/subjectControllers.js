const validateSubject = require('./../validation/subjects');
const Subject = require('./../models/Subject');

const addSubject = (req, res) =>{
    const { errors, isValid } = validateSubject(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newSubject = new Subject({
        title: req.body.title,
        content: req.body.content,
    });
    newSubject
        .save()
        .then(subject => {
            return res.status(200).json({
                message: 'Subject added successfully. Refreshing data...'
            })
        })
        .catch(err => console.log(err));      

}

const getSubject = (req, res) => {
    Subject
        .find()
        .then(subject => {
            return res.json(subject);
        })
        .catch(err => {
            console.log(err)
        })
}

const updateSubject = (req, res) => {
    const { errors, isValid } = validateSubject(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    Subject.findOne({ _id }).then(subject => {
        if (subject) {
            Subject
                .findOneAndUpdate(
                    { _id: _id},
                    { $set: req.body },
                    { new: true }
                )
                .then(profile => { res.status(200).json({
                    message: 'Subject updated successfully. Refreshing data...', success: true 
                }); 
            })
        } else {
            return res.status(400).json({ message: 'Now Subject found to update.' });
        }
    });
}

const deleteSubject = (req, res) => {
    Subject.deleteOne({ _id: req.body._id}).then(subject => {
        if (subject) {
            return res.status(200).json({
                message: 'Subject deleted successfully. Refreshing data...', success: true
            })
        }
    });
}

const input_varient = (req, res) => {
    const varient = req.body.varient;
    let count = 0;
    for( var i = 0 ; i < varient.length; i++){
        if(varient[i].truth == true){
            count++;
            if(count > 1) return res.status(400).json({ message: 'Count of true varient can be only one.' });
        }
    }
    Subject.findOne(req.body._id)
        .then(item => {
            item.varient = varient;
            item.save
                .then(res => {return res.status(200).json({message: "Varients are saved successfully"})})
                .catch(err => console.log(err));
        })
}
module.exports = {
    addSubject,
    getSubject,
    updateSubject,
    deleteSubject
};