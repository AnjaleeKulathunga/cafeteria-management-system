const Salary = require("../models/SalaryModel");
const {response} = require("express")


const getAllSalaries = async(req,res,next) =>{
    let Salaries;

    try{
        Salaries = await Salary.find();
    }catch(err){
        console.log(err);
    }

    if(!Salaries){
        return res.status(404).json({message:"Salary not found"})
    }

    //Display all salaries
    return res.status(200).json({Salaries});
};

const getByIDSalary = async(req,res,next) =>{
    const empidd= req.params.empidd;

    let salary;

    try{
        salary = await Salary.findOne({ empid: empidd });
    }catch(err){
        console.log(err);
    }

    if(!salary){
        return res.status(404).json({message:"Salary not found"})
    }

    //Display all salaries
    return res.status(200).json({salary});
};

const addSalaries = async(req,res,next) =>{

    const{empdep,empid,empbasicsal,empallowance,empdeduction,emppaydate} = req.body;
    const totalSalary = parseInt(empbasicsal) + parseInt(empallowance) - parseInt(empdeduction);

    let salary;
    try{
        salary = new Salary({empdep,empid,empbasicsal,empallowance,empdeduction,empnetsalary:totalSalary,emppaydate});
        await salary.save();
    }catch(err){
        console.log(err);
    }

    if(!salary){
        return res.status(404).json({message:"Unable to add salaries"});
    }
    return res.status(200).json({salary});

     
};

const updateSalary = async(req,res,next) =>{

    const empid= req.params.empid;
    const{empdep,empbasicsal,empallowance,empdeduction,emppaydate} = req.body;

    const totalSalary = parseInt(empbasicsal) + parseInt(empallowance) - parseInt(empdeduction);

    let salary;

    try{
        salary = await Salary.findOneAndUpdate({empid:empid},
            {empdep:empdep, empbasicsal:empbasicsal,empallowance:empallowance,empdeduction:empdeduction,empnetsalary:totalSalary,emppaydate:emppaydate});
        
    }catch(err){
        console.log(err);
    }

    if(!salary){
        return res.status(404).json({message:"Unable to update salary"})
    }

    return res.status(200).json({salary});

};

const deleteSalaries = async(req,res,next) =>{
    const empid = req.params.empid;

    let salary;

    try{
        salary = await Salary.findOneAndDelete({empid:empid});
    }catch(err){
        console.log(err);
    }
    if(!salary){
        return res.status(404).json({message:"Unable to delete salaries"});
    }
    return res.status(200).json({salary});
}


exports.getAllSalaries=getAllSalaries;
exports.getByIDSalary=getByIDSalary;
exports.addSalaries=addSalaries;
exports.deleteSalaries=deleteSalaries;
exports.updateSalary=updateSalary;